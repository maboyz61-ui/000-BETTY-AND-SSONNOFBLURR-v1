import React, { useState } from 'react';
import { Play, Pause, Download, Volume2, VolumeX, Mic, Music2, FileText, ChevronDown, ChevronUp, Share2, Sparkles, Sliders } from 'lucide-react';
import { Track, Stem } from '../types';

interface TracksSectionProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
}) => {
  const [activeStemTab, setActiveStemTab] = useState<'mixer' | 'lyrics'>('mixer');
  const [localStems, setLocalStems] = useState<{ [trackId: string]: Stem[] }>(() => {
    const map: { [trackId: string]: Stem[] } = {};
    tracks.forEach((t) => {
      map[t.id] = [...t.stems];
    });
    return map;
  });
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentStems = localStems[currentTrack.id] || currentTrack.stems;

  const handleStemVolumeChange = (stemId: string, val: number) => {
    setLocalStems((prev) => {
      const updated = (prev[currentTrack.id] || []).map((s) =>
        s.id === stemId ? { ...s, volume: val } : s
      );
      return { ...prev, [currentTrack.id]: updated };
    });
  };

  const handleToggleStemMute = (stemId: string) => {
    setLocalStems((prev) => {
      const updated = (prev[currentTrack.id] || []).map((s) =>
        s.id === stemId ? { ...s, muted: !s.muted } : s
      );
      return { ...prev, [currentTrack.id]: updated };
    });
  };

  const handleToggleStemSolo = (stemId: string) => {
    setLocalStems((prev) => {
      const currentList = prev[currentTrack.id] || [];
      const target = currentList.find((s) => s.id === stemId);
      const willSolo = !target?.solo;

      const updated = currentList.map((s) => ({
        ...s,
        solo: s.id === stemId ? willSolo : false,
      }));
      return { ...prev, [currentTrack.id]: updated };
    });
  };

  const handleDownloadStems = (trackTitle: string) => {
    setDownloadSuccess(trackTitle);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-neutral-950 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300 border border-purple-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DISCOGRAPHY & INTERACTIVE MULTI-TRACK STEMS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            AUDIO RELEASES & ISOLATION STEMS
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Listen to master studio recordings or deconstruct each track down to its individual poly-synth, 808 sub, vocal modulation, and reel-to-reel tape textures.
          </p>
        </div>
      </div>

      {/* Main Grid: Track List on Left, Active Multi-track Mixer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Tracks Catalog (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <h3 className="font-display font-bold text-base text-neutral-100 flex items-center gap-2">
              <Music2 className="h-4 w-4 text-purple-400" />
              RECORDINGS CATALOG
            </h3>
            <span className="font-mono text-xs text-neutral-400">{tracks.length} MASTERS</span>
          </div>

          <div className="space-y-3">
            {tracks.map((track, idx) => {
              const isSelected = currentTrack.id === track.id;
              const isCurrentPlaying = isSelected && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => onSelectTrack(track)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 group ${
                    isSelected
                      ? 'border-purple-500/60 bg-gradient-to-r from-purple-950/60 to-neutral-900/80 shadow-lg shadow-purple-950/50'
                      : 'border-white/5 bg-neutral-900/40 hover:border-purple-500/30 hover:bg-neutral-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSelected) {
                            onTogglePlay();
                          } else {
                            onSelectTrack(track);
                            if (!isPlaying) onTogglePlay();
                          }
                        }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all shadow-md ${
                          isCurrentPlaying
                            ? 'bg-purple-500 text-white shadow-purple-500/50'
                            : 'bg-neutral-800 text-neutral-300 group-hover:bg-purple-600 group-hover:text-white'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-purple-400 font-bold">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <h4 className="font-display font-bold text-sm text-neutral-100 truncate group-hover:text-purple-300">
                            {track.title}
                          </h4>
                        </div>
                        <p className="font-mono text-xs text-neutral-400 truncate">{track.subtitle}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-semibold text-neutral-300 block">
                        {track.duration}
                      </span>
                      <span className="inline-block rounded bg-purple-900/40 px-1.5 py-0.5 font-mono text-[9px] text-purple-300 border border-purple-500/20">
                        {track.musicalKey} • {track.bpm}BPM
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-neutral-950/60 px-2 py-0.5 font-mono text-[10px] text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Track Multi-Track Stems Console (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-purple-500/30 bg-neutral-900/70 p-6 backdrop-blur-xl shadow-xl">
            {/* Console Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping"></span>
                  <span className="font-mono text-xs text-purple-400 font-bold tracking-wider">
                    ACTIVE MULTI-TRACK DESK
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">{currentTrack.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-xl bg-black/50 p-1 border border-white/10">
                  <button
                    onClick={() => setActiveStemTab('mixer')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeStemTab === 'mixer'
                        ? 'bg-purple-600 text-white font-bold shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sliders className="h-3.5 w-3.5" />
                    <span>Stem Mixer</span>
                  </button>
                  <button
                    onClick={() => setActiveStemTab('lyrics')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      activeStemTab === 'lyrics'
                        ? 'bg-purple-600 text-white font-bold shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Lyrics & Notes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mixer Tab Content */}
            {activeStemTab === 'mixer' && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-2">
                  <span>STEM CHANNEL & FREQUENCY BUS</span>
                  <div className="flex items-center gap-4">
                    <span>MUTE / SOLO</span>
                    <span className="w-24 text-right">GAIN</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentStems.map((stem) => {
                    const hasSoloActive = currentStems.some((s) => s.solo);
                    const isSilenced = stem.muted || (hasSoloActive && !stem.solo);

                    return (
                      <div
                        key={stem.id}
                        className={`rounded-xl border p-3.5 transition-all ${
                          isSilenced
                            ? 'bg-black/20 border-white/5 opacity-50'
                            : 'bg-black/40 border-purple-500/20 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-3 rounded-full shrink-0"
                              style={{ backgroundColor: stem.color }}
                            />
                            <div>
                              <span className="font-mono text-xs font-bold text-neutral-200">
                                {stem.name}
                              </span>
                              <span className="ml-2 font-mono text-[10px] text-neutral-500 uppercase">
                                [{stem.type}]
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Solo & Mute Buttons */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleToggleStemMute(stem.id)}
                                className={`rounded px-2 py-1 font-mono text-[10px] font-bold transition-all ${
                                  stem.muted
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                                title="Mute Stem"
                              >
                                M
                              </button>
                              <button
                                onClick={() => handleToggleStemSolo(stem.id)}
                                className={`rounded px-2 py-1 font-mono text-[10px] font-bold transition-all ${
                                  stem.solo
                                    ? 'bg-amber-400 text-neutral-950'
                                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                                title="Solo Stem"
                              >
                                S
                              </button>
                            </div>

                            {/* Waveform graphic preview */}
                            <div className="hidden sm:flex items-center gap-0.5 h-6 w-20 px-1 bg-neutral-950/60 rounded">
                              {stem.waveformPattern.map((val, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-sm transition-all"
                                  style={{
                                    height: `${isSilenced ? 4 : (val / 100) * 22}px`,
                                    backgroundColor: isSilenced ? '#525252' : stem.color,
                                    opacity: isSilenced ? 0.3 : 0.85,
                                  }}
                                />
                              ))}
                            </div>

                            {/* Stem volume slider */}
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                disabled={isSilenced}
                                value={stem.volume}
                                onChange={(e) =>
                                  handleStemVolumeChange(stem.id, parseFloat(e.target.value))
                                }
                                className="w-20 accent-purple-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer disabled:opacity-30"
                              />
                              <span className="font-mono text-[10px] text-neutral-400 w-8 text-right">
                                {isSilenced ? 'OFF' : `${Math.round(stem.volume * 100)}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stems Download Action */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-neutral-400 font-mono">
                    STEM PACKAGE FORMAT: 24-BIT / 96KHZ BROADCAST WAV
                  </div>
                  <button
                    onClick={() => handleDownloadStems(currentTrack.title)}
                    className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 text-xs font-mono font-bold transition-all shadow-lg shadow-purple-600/30"
                  >
                    <Download className="h-4 w-4" />
                    <span>DOWNLOAD STEM ARCHIVE (.ZIP)</span>
                  </button>
                </div>

                {downloadSuccess && (
                  <div className="rounded-xl bg-emerald-950/50 border border-emerald-500/30 p-3 text-xs text-emerald-300 font-mono animate-fade-in text-center">
                    ✓ Multi-track stems package for "{downloadSuccess}" archived for download.
                  </div>
                )}
              </div>
            )}

            {/* Lyrics Tab Content */}
            {activeStemTab === 'lyrics' && (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-black/40 p-6 border border-white/5 font-mono text-sm leading-relaxed text-neutral-300 whitespace-pre-line space-y-2">
                  {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
                    currentTrack.lyrics.map((line, idx) => (
                      <p
                        key={idx}
                        className={
                          line.startsWith('[')
                            ? 'text-purple-400 font-bold text-xs pt-2'
                            : 'text-neutral-200 hover:text-purple-200 transition-colors'
                        }
                      >
                        {line || '\u00A0'}
                      </p>
                    ))
                  ) : (
                    <p className="text-neutral-500 italic">Instrumental track — no vocal transcript recorded.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
