import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio, Sparkles, Activity, SlidersHorizontal } from 'lucide-react';
import { Track } from '../types';
import { soundEngine } from '../audioEngine';

interface AudioPlayerProps {
  currentTrack: Track;
  tracks: Track[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [visualizerMode, setVisualizerMode] = useState<'frequency' | 'wave'>('frequency');

  // Track timer simulation
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlaybackSeconds((prev) => (prev + 1) % currentTrack.durationSeconds);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);

  // Reset timer on track change
  useEffect(() => {
    setPlaybackSeconds(0);
  }, [currentTrack.id]);

  // Canvas visualizer animation loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const analyser = soundEngine.getAnalyser();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!analyser || !isPlaying) {
        // Subtle resting baseline
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 1.5;
        const midY = canvas.height / 2;
        ctx.moveTo(0, midY);
        for (let x = 0; x < canvas.width; x += 10) {
          const y = midY + Math.sin(x * 0.05 + Date.now() * 0.002) * 2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (visualizerMode === 'frequency') {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / (bufferLength / 1.5));
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.95;

          const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
          gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.8)');
          gradient.addColorStop(1, 'rgba(56, 189, 248, 1)');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, Math.max(2, barWidth - 1), barHeight);

          x += barWidth;
          if (x > canvas.width) break;
        }
      } else {
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#c084fc';
        ctx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, visualizerMode]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const progressPercent = (playbackSeconds / currentTrack.durationSeconds) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-purple-500/20 bg-[#0d0918]/95 backdrop-blur-2xl shadow-2xl shadow-purple-950/80">
      {/* Visualizer header line */}
      <div className="relative h-1 w-full bg-neutral-900">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3.5 min-w-[200px] max-w-[280px]">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-700 via-indigo-800 to-neutral-900 shadow-md border border-purple-400/20 overflow-hidden">
            <Radio className={`h-6 w-6 text-purple-200 ${isPlaying ? 'animate-pulse text-purple-300' : 'opacity-60'}`} />
            {isPlaying && (
              <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            )}
          </div>
          <div className="truncate">
            <h4 className="truncate text-sm font-bold text-neutral-100 font-display">
              {currentTrack.title}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
              <span className="text-purple-400">{currentTrack.bpm} BPM</span>
              <span>•</span>
              <span className="text-neutral-300">{currentTrack.musicalKey}</span>
              <span>•</span>
              <span className="rounded bg-neutral-800 px-1 py-0.2 text-[9px] text-neutral-400">
                {currentTrack.releaseStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Controls & Audio-Visual display */}
        <div className="flex flex-1 flex-col items-center max-w-xl">
          {/* Top Controls */}
          <div className="flex items-center gap-4 mb-1.5">
            <button
              onClick={onPrevTrack}
              className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Previous Track"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={onTogglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? 'Pause' : 'Play Live Synth Stream'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <button
              onClick={onNextTrack}
              className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Next Track"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            {/* Mode switch for visualizer */}
            <button
              onClick={() => setVisualizerMode(prev => prev === 'frequency' ? 'wave' : 'frequency')}
              className="hidden sm:flex items-center gap-1 rounded-md bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-purple-300 border border-purple-500/20 hover:border-purple-400/50"
              title="Toggle Spectrum / Oscilloscope"
            >
              <Activity className="h-3 w-3" />
              <span>{visualizerMode === 'frequency' ? 'FFT' : 'OSC'}</span>
            </button>
          </div>

          {/* Time & Mini Visualizer Canvas */}
          <div className="flex w-full items-center gap-3">
            <span className="font-mono text-[11px] text-neutral-400 min-w-[36px] text-right">
              {formatTime(playbackSeconds)}
            </span>
            
            <div className="relative flex-1 h-7 rounded-lg overflow-hidden bg-neutral-950/80 border border-white/5 flex items-center px-1">
              <canvas
                ref={canvasRef}
                width={360}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="font-mono text-[11px] text-neutral-400 min-w-[36px]">
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* Right: Master Volume & Quick Controls */}
        <div className="hidden md:flex items-center gap-3 min-w-[190px] justify-end">
          <button
            onClick={onToggleMute}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-24 accent-purple-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            title="Master Gain"
          />
          <span className="font-mono text-[10px] text-neutral-400 w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
