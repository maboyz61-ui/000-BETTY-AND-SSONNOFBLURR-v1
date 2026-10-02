// Web Audio API engine for Betty and Sunnofblur
// Provides procedural ambient soundscapes, stem mixing, and interactive synthesizer notes

class SoundLabEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedbackGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private activeVoices: Map<string, { osc: OscillatorNode; gain: GainNode }> = new Map();
  private isLoopRunning = false;
  private loopTimer: number | null = null;
  private currentStep = 0;
  
  // Mix state
  private stemGains: { [key: string]: GainNode } = {};
  private filterFreq = 1800;
  private filterQ = 3.5;
  private delayAmount = 0.35;
  private masterVol = 0.75;
  
  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
      
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(this.filterFreq, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(this.filterQ, this.ctx.currentTime);
      
      this.delayNode = this.ctx.createDelay(2.0);
      this.delayNode.delayTime.setValueAtTime(0.38, this.ctx.currentTime);
      
      this.delayFeedbackGain = this.ctx.createGain();
      this.delayFeedbackGain.gain.setValueAtTime(0.42, this.ctx.currentTime);
      
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 128;
      this.analyserNode.smoothingTimeConstant = 0.85;

      // Routing: Synth -> Filter -> Analyser -> Master -> Destination
      //          Filter -> Delay -> DelayFeedback -> Delay -> Filter
      this.delayNode.connect(this.delayFeedbackGain);
      this.delayFeedbackGain.connect(this.delayNode);
      this.delayNode.connect(this.filterNode);
      
      this.filterNode.connect(this.analyserNode);
      this.analyserNode.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("AudioContext initialization note:", e);
    }
  }

  public ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  public setMasterVolume(val: number) {
    this.masterVol = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.masterVol, this.ctx.currentTime, 0.05);
    }
  }

  public setFilterFreq(freq: number) {
    this.filterFreq = freq;
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
    }
  }

  public setResonance(q: number) {
    this.filterQ = q;
    if (this.filterNode && this.ctx) {
      this.filterNode.Q.setTargetAtTime(q, this.ctx.currentTime, 0.05);
    }
  }

  public setBlurDelay(diffusion: number) {
    this.delayAmount = diffusion;
    if (this.delayFeedbackGain && this.ctx) {
      const fb = Math.min(0.85, diffusion * 0.75);
      this.delayFeedbackGain.gain.setTargetAtTime(fb, this.ctx.currentTime, 0.05);
    }
  }

  // Play an interactive synth note (from keyboard or sound pad)
  public playNote(freq: number, wave: OscillatorType = 'sawtooth', duration = 0.8, stemCategory: 'synth' | 'drums' | 'bass' | 'vocals' | 'texture' = 'synth') {
    this.ensureContext();
    if (!this.ctx || !this.filterNode) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = wave;
      osc.frequency.setValueAtTime(freq, now);

      // Pitch envelope for drums / kick
      if (stemCategory === 'drums' && freq < 120) {
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.25);
      }

      // Attack - Decay envelope
      gain.gain.setValueAtTime(0.001, now);
      const peakVol = stemCategory === 'bass' ? 0.35 : stemCategory === 'drums' ? 0.45 : 0.22;
      gain.gain.exponentialRampToValueAtTime(peakVol, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.filterNode);
      if (this.delayNode && this.delayAmount > 0.05 && stemCategory !== 'bass') {
        gain.connect(this.delayNode);
      }

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Audio fallback
    }
  }

  // Start continuous generative arpeggiator / track simulation
  public startTrackLoop(bpm: number, notes: number[], onBeat?: (step: number) => void) {
    this.ensureContext();
    this.stopTrackLoop();

    this.isLoopRunning = true;
    const intervalMs = (60 / bpm / 2) * 1000; // 8th note steps

    this.loopTimer = window.setInterval(() => {
      if (!this.isLoopRunning) return;
      
      const currentNote = notes[this.currentStep % notes.length];
      
      // Drum kick on 0, 4, 8, 12
      if (this.currentStep % 4 === 0) {
        this.playNote(90, 'sine', 0.25, 'drums');
      }
      // Hi-hat noise tap on off-beats
      if (this.currentStep % 2 === 1) {
        this.playNote(1400, 'triangle', 0.04, 'drums');
      }
      // Bass line on downbeats
      if (this.currentStep % 4 === 0 || this.currentStep % 8 === 6) {
        this.playNote(currentNote / 4, 'sawtooth', 0.4, 'bass');
      }
      // Melodic arpeggio
      this.playNote(currentNote, 'sine', 0.35, 'synth');
      
      // Atmospheric drone chord every 8 steps
      if (this.currentStep % 8 === 0) {
        this.playNote(currentNote * 1.5, 'triangle', 1.4, 'texture');
      }

      if (onBeat) {
        onBeat(this.currentStep % 16);
      }

      this.currentStep++;
    }, intervalMs);
  }

  public stopTrackLoop() {
    this.isLoopRunning = false;
    if (this.loopTimer !== null) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    this.currentStep = 0;
  }

  public isRunning(): boolean {
    return this.isLoopRunning;
  }
}

export const soundEngine = new SoundLabEngine();
