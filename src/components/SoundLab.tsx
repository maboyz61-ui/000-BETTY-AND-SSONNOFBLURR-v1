import React, { useState, useEffect } from 'react';
import { Sliders, Activity, Disc, Sparkles, RefreshCw, Play, Square, Download, Waves, Layers } from 'lucide-react';
import { soundEngine } from '../audioEngine';
import { SYNTH_PRESETS } from '../data/mockData';
import { SynthPreset } from '../types';

export const SoundLab: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<SynthPreset>(SYNTH_PRESETS[0]);
  const [filterCutoff, setFilterCutoff] = useState<number>(SYNTH_PRESETS[0].filterCutoff);
  const [resonance, setResonance] = useState<number>(SYNTH_PRESETS[0].resonance);
  const [blurDiffusion, setBlurDiffusion] = useState<number>(SYNTH_PRESETS[0].blurDiffusion);
  const [waveType, setWaveType] = useState<OscillatorType>(SYNTH_PRESETS[0].waveType);
  const [bpm, setBpm] = useState<number>(SYNTH_PRESETS[0].bpm);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isSeqPlaying, setIsSeqPlaying] = useState<boolean>(false);
  const [lastPlayedKey, setLastPlayedKey] = useState<string | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'saved'>('idle');
  const [savedTakes, setSavedTakes] = useState<{ id: string; name: string; timestamp: string; size: string }[]>([
    { id: 'take-1', name: 'Take 01 — Sub-Frequency Blur Drift.wav', timestamp: '14:22', size: '24.8 MB' },
    { id: 'take-2', name: 'Take 02 — High Resonance Acid Formant.wav', timestamp: '15:40', size: '32.1 MB' }
  ]);

  // Musical keys mapped to frequencies (C4 to C5 scale)
  const keys = [
    { note: 'C4', key: 'A', freq: 261.63, isBlack: false },
    { note: 'C#4', key: 'W', freq: 277.18, isBlack: true },
    { note: 'D4', key: 'S', freq: 293.66, isBlack: false },
    { note: 'D#4', key: 'E', freq: 311.13, isBlack: true },
    { note: 'E4', key: 'D', freq: 329.63, isBlack: false },
    { note: 'F4', key: 'F', freq: 349.23, isBlack: false },
    { note: 'F#4', key: 'T', freq: 369.99, isBlack: true },
    { note: 'G4', key: 'G', freq: 392.00, isBlack: false },
    { note: 'G#4', key: 'Y', freq: 415.30, isBlack: true },
    { note: 'A4', key: 'H', freq: 440.00, isBlack: false },
    { note: 'A#4', key: 'U', freq: 466.16, isBlack: true },
    { note: 'B4', key: 'J', freq: 493.88, isBlack: false },
    { note: 'C5', key: 'K', freq: 523.25, isBlack: false },
  ];

  // Drum / Texture launch pads
  const drumPads = [
    { id: 'pad-1', label: '808 SUB', sub: '45Hz Boom', freq: 65, wave: 'sine' as OscillatorType, category: 'drums' as const, color: 'border-purple-500/40 bg-purple-950/40' },
    { id: 'pad-2', label: 'TAPE KICK', sub: '90Hz Punch', freq: 110, wave: 'sine' as OscillatorType, category: 'drums' as const, color: 'border-fuchsia-500/40 bg-fuchsia-950/40' },
    { id: 'pad-3', label: 'ANALOG CHORD', sub: 'Minor 9th', freq: 349.23, wave: 'sawtooth' as OscillatorType, category: 'synth' as const, color: 'border-indigo-500/40 bg-indigo-950/40' },
    { id: 'pad-4', label: 'BLUR TEXTURE', sub: 'Reel Hiss', freq: 1200, wave: 'triangle' as OscillatorType, category: 'texture' as const, color: 'border-sky-500/40 bg-sky-950/40' },
  ];

  // Update sound engine on slider tweaks
  useEffect(() => {
    soundEngine.setFilterFreq(filterCutoff);
  }, [filterCutoff]);

  useEffect(() => {
    soundEngine.setResonance(resonance);
  }, [resonance]);

  useEffect(() => {
    soundEngine.setBlurDelay(blurDiffusion);
  }, [blurDiffusion]);

  const handleApplyPreset = (preset: SynthPreset) => {
    setSelectedPreset(preset);
    setFilterCutoff(preset.filterCutoff);
    setResonance(preset.resonance);
    setBlurDiffusion(preset.blurDiffusion);
    setWaveType(preset.waveType);
    setBpm(preset.bpm);
    soundEngine.setFilterFreq(preset.filterCutoff);
    soundEngine.setResonance(preset.resonance);
    soundEngine.setBlurDelay(preset.blurDiffusion);
  };

  const handlePlayKey = (freq: number, noteLabel: string) => {
    soundEngine.ensureContext();
    soundEngine.playNote(freq, waveType, 0.8, 'synth');
    setLastPlayedKey(noteLabel);
    setTimeout(() => {
      setLastPlayedKey((curr) => (curr === noteLabel ? null : curr));
    }, 300);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const pressed = e.key.toUpperCase();
      const match = keys.find((k) => k.key === pressed);
      if (match) {
        handlePlayKey(match.freq, match.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [waveType]);

  const toggleSequencer = () => {
    if (isSeqPlaying) {
      soundEngine.stopTrackLoop();
      setIsSeqPlaying(false);
      setActiveStep(-1);
    } else {
      setIsSeqPlaying(true);
      const notes = [293.66, 349.23, 440.0, 523.25, 440.0, 349.23, 392.0, 329.63];
      soundEngine.startTrackLoop(bpm, notes, (step) => {
        setActiveStep(step);
      });
    }
  };

  // Stop sequencer when unmounting
  useEffect(() => {
    return () => {
      if (isSeqPlaying) {
        soundEngine.stopTrackLoop();
      }
    };
  }, [isSeqPlaying]);

  const handleRecordTake = () => {
    if (recordingStatus === 'idle') {
      setRecordingStatus('recording');
      setTimeout(() => {
        const newTake = {
          id: `take-${Date.now()}`,
          name: `Take 0${savedTakes.length + 1} — ${selectedPreset.name} (${bpm}BPM).wav`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          size: `${(20 + Math.random() * 15).toFixed(1)} MB`
        };
        setSavedTakes(prev => [newTake, ...prev]);
        setRecordingStatus('saved');
        setTimeout(() => setRecordingStatus('idle'), 3000);
      }, 4000);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Sound Lab Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
            <Sliders className="h-4 w-4" />
            <span>HARDWARE DSP SYNTHESIZER • TAPE DECAY LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            THE BLUR SOUND LAB
          </h2>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            Real-time Web Audio DSP synthesizer. Modulate sub-bass frequencies, low-pass resonance, and magnetic blur reflections using your keyboard or touchpads.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-1">PRESETS:</span>
          {SYNTH_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium font-mono transition-all ${
                selectedPreset.id === preset.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5 hover:border-purple-500/30'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rack: DSP Controls + Sequencer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Synth Module & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Knobs & Sliders Rack */}
          <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-purple-400" />
                <span className="font-display font-bold text-sm tracking-wider text-neutral-100">
                  DUAL-OSCILLATOR & FILTER PARAMETERS
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neutral-400">WAVEFORM:</span>
                {(['sawtooth', 'square', 'sine', 'triangle'] as OscillatorType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`rounded px-2 py-0.5 uppercase text-[10px] font-bold ${
                      waveType === type
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {type.slice(0, 4)}
                  </button>
                ))}
              </div>
            </div>

            {/* Knobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Filter Cutoff */}
              <div className="rounded-xl bg-black/40 p-4 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400">CUTOFF FREQ</span>
                  <span className="text-purple-300 font-bold">{Math.round(filterCutoff)} Hz</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="7000"
                  step="10"
                  value={filterCutoff}
                  onChange={(e) => setFilterCutoff(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-neutral-500">Lowpass pole filter frequency sweep</p>
              </div>

              {/* Resonance / Q */}
              <div className="rounded-xl bg-black/40 p-4 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400">RESONANCE (Q)</span>
                  <span className="text-fuchsia-300 font-bold">{resonance.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="16"
                  step="0.1"
                  value={resonance}
                  onChange={(e) => setResonance(parseFloat(e.target.value))}
                  className="w-full accent-fuchsia-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-neutral-500">Peak boost at the cutoff threshold</p>
              </div>

              {/* Blur Diffusion (Reverb/Delay feedback) */}
              <div className="rounded-xl bg-black/40 p-4 border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400">BLUR DIFFUSION</span>
                  <span className="text-sky-300 font-bold">{Math.round(blurDiffusion * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.95"
                  step="0.01"
                  value={blurDiffusion}
                  onChange={(e) => setBlurDiffusion(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-neutral-500">Magnetic tape echo feedback decay</p>
              </div>
            </div>
          </div>

          {/* Interactive Keyboard */}
          <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-sm text-neutral-200">
                  HARMONIC MODULAR KEYBED
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  Click keys or press letters <span className="text-purple-300 font-bold">[A, W, S, E, D, F, T, G, Y, H, U, J, K]</span>
                </p>
              </div>
              {lastPlayedKey && (
                <div className="rounded-md bg-purple-600/30 px-3 py-1 font-mono text-xs text-purple-300 border border-purple-500/30 animate-pulse">
                  PLAYING: {lastPlayedKey}
                </div>
              )}
            </div>

            {/* Keys Rendering */}
            <div className="relative flex justify-center py-2 overflow-x-auto select-none">
              <div className="relative flex h-48 rounded-xl bg-neutral-950 p-2 shadow-inner border border-neutral-800">
                {keys.map((k) => {
                  const isCurrent = lastPlayedKey === k.note;
                  if (k.isBlack) {
                    return (
                      <button
                        key={k.note}
                        onClick={() => handlePlayKey(k.freq, k.note)}
                        className={`absolute z-10 h-28 w-8 -ml-4 rounded-b-md transition-all active:scale-95 ${
                          isCurrent
                            ? 'bg-fuchsia-600 shadow-lg shadow-fuchsia-500/50'
                            : 'bg-neutral-900 hover:bg-neutral-800'
                        } border border-neutral-700 flex flex-col justify-end items-center pb-2`}
                        style={{
                          left: `${
                            k.note === 'C#4' ? 44 :
                            k.note === 'D#4' ? 94 :
                            k.note === 'F#4' ? 194 :
                            k.note === 'G#4' ? 244 :
                            294
                          }px`
                        }}
                      >
                        <span className="font-mono text-[9px] text-neutral-300">{k.note}</span>
                        <span className="font-mono text-[8px] text-fuchsia-400 font-bold">[{k.key}]</span>
                      </button>
                    );
                  }
                  return (
                    <button
                      key={k.note}
                      onClick={() => handlePlayKey(k.freq, k.note)}
                      className={`h-44 w-12 rounded-b-lg border-r border-neutral-300/10 transition-all active:scale-98 flex flex-col justify-end items-center pb-3 ${
                        isCurrent
                          ? 'bg-purple-300 text-neutral-950 shadow-inner'
                          : 'bg-neutral-100 hover:bg-white text-neutral-900'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-bold">{k.note}</span>
                      <span className="font-mono text-[9px] text-neutral-500">[{k.key}]</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Launchpads / Drum & Texture triggers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {drumPads.map((pad) => (
              <button
                key={pad.id}
                onClick={() => soundEngine.playNote(pad.freq, pad.wave, 0.4, pad.category)}
                className={`rounded-xl border p-4 text-left transition-all active:scale-95 hover:border-purple-400/80 group ${pad.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-xs font-bold text-white group-hover:text-purple-300">
                    {pad.label}
                  </span>
                  <Disc className="h-4 w-4 text-neutral-400 group-hover:rotate-45 transition-transform" />
                </div>
                <p className="font-mono text-[11px] text-neutral-400">{pad.sub}</p>
                <span className="mt-3 inline-block rounded bg-black/40 px-1.5 py-0.5 font-mono text-[9px] text-purple-300">
                  TRIGGER TAP
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Arpeggiator Sequencer & Studio Recording */}
        <div className="space-y-6">
          {/* Step Sequencer */}
          <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-fuchsia-400" />
                <h3 className="font-display font-bold text-sm text-neutral-100">
                  16-STEP BLUR ARPEGGIATOR
                </h3>
              </div>
              <button
                onClick={toggleSequencer}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold font-mono transition-all ${
                  isSeqPlaying
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500'
                }`}
              >
                {isSeqPlaying ? <Square className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                <span>{isSeqPlaying ? 'HALT' : 'ENGAGE'}</span>
              </button>
            </div>

            {/* Tempo control */}
            <div className="mb-4 rounded-xl bg-black/40 p-3 border border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs text-neutral-400">TEMPO (BPM)</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="80"
                  max="160"
                  value={bpm}
                  onChange={(e) => setBpm(parseInt(e.target.value))}
                  className="w-24 accent-purple-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-xs font-bold text-purple-300 w-12 text-right">
                  {bpm} BPM
                </span>
              </div>
            </div>

            {/* Sequencer step LEDs */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {Array.from({ length: 16 }).map((_, idx) => {
                const isActive = activeStep === idx;
                const isDownbeat = idx % 4 === 0;
                return (
                  <div
                    key={idx}
                    className={`h-8 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                      isActive
                        ? 'bg-fuchsia-500 border-white text-white scale-105 shadow-md shadow-fuchsia-500/50'
                        : isDownbeat
                        ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                        : 'bg-neutral-900 border-white/5 text-neutral-500'
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-neutral-400 font-mono">
              Generates algorithmic generative chord polyphony & modulated sub patterns.
            </p>
          </div>

          {/* Studio Recording & Stem Takes */}
          <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-neutral-100 flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-400" />
                STUDIO SESSION RECORDER
              </h3>
              <button
                onClick={handleRecordTake}
                disabled={recordingStatus === 'recording'}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                  recordingStatus === 'recording'
                    ? 'bg-rose-500 text-white animate-pulse'
                    : recordingStatus === 'saved'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-white/10'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${recordingStatus === 'recording' ? 'bg-white' : 'bg-rose-500'}`} />
                <span>
                  {recordingStatus === 'recording'
                    ? 'RECORDING...'
                    : recordingStatus === 'saved'
                    ? 'TAKE BOUNCED'
                    : 'BOUNCE TAKE'}
                </span>
              </button>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] text-neutral-400">BOUNCED SESSION TAKES:</span>
              {savedTakes.map((take) => (
                <div
                  key={take.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/20 transition-all text-xs"
                >
                  <div className="truncate mr-2">
                    <p className="truncate font-mono font-medium text-neutral-200">{take.name}</p>
                    <p className="text-[10px] text-neutral-500">{take.timestamp} • {take.size} • 24-bit/96kHz</p>
                  </div>
                  <button
                    onClick={() => alert(`Downloading stem take: ${take.name}`)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors"
                    title="Download Stem Take"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
