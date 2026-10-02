import React from 'react';
import { Disc3, Sliders, BookOpen, Calendar, ShoppingBag, FolderKanban, Volume2, VolumeX, Sparkles, Play, Pause } from 'lucide-react';
import { Track } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  cartCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  currentTrack,
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
  cartCount
}) => {
  const navItems = [
    { id: 'tracks', label: 'Tracks & Stems', icon: Disc3 },
    { id: 'synth', label: 'Sound Lab', icon: Sliders },
    { id: 'workspace', label: 'Studio Board', icon: FolderKanban },
    { id: 'lore', label: 'Lore Archives', icon: BookOpen },
    { id: 'tour', label: 'Live Dates', icon: Calendar },
    { id: 'merch', label: 'Vault Merch', icon: ShoppingBag, badge: cartCount > 0 ? cartCount : undefined },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/30 bg-[#0a0812]/90 backdrop-blur-xl">
      {/* Top micro-bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-neutral-400 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono tracking-wider text-[11px] text-neutral-300">STUDIO MASTER v1.0.4 • FREQUENCY 432Hz</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-mono text-[11px]">
          <span className="text-purple-400/90 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> ARCHIVE #000-BETTY
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">ANALOG TAPE + DIGITAL SYNTHESIS</span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('tracks')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-600 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-950/90 backdrop-blur-md">
              <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-tr from-purple-300 to-pink-200 text-lg">
                B
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold tracking-wider text-white group-hover:text-purple-300 transition-colors">
                BETTY & SUNNOFBLUR
              </span>
              <span className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                000
              </span>
            </div>
            <p className="font-mono text-[10px] text-neutral-400 tracking-tight">Audio-Visual Workspace & Sound Lab</p>
          </div>
        </div>

        {/* Center navigation tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/30 text-white shadow-sm border border-purple-500/40'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {currentTrack && (
            <div className="hidden md:flex items-center gap-2.5 rounded-xl bg-purple-950/40 px-3 py-1.5 border border-purple-500/20">
              <button
                onClick={onTogglePlay}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors shadow-sm"
                title={isPlaying ? 'Pause' : 'Play Synthesized Stream'}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
              </button>
              <div className="max-w-[120px] sm:max-w-[160px] truncate text-left">
                <p className="truncate text-xs font-semibold text-neutral-200">{currentTrack.title}</p>
                <p className="font-mono text-[10px] text-purple-400/80">{currentTrack.bpm} BPM • {currentTrack.musicalKey}</p>
              </div>
            </div>
          )}

          {/* Mute button */}
          <button
            onClick={onToggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-purple-500/40 transition-colors"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-red-400" /> : <Volume2 className="h-4 w-4 text-neutral-300" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-white/5 gap-2 scrollbar-none bg-[#0e0b18]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-purple-600 text-white font-semibold shadow'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
