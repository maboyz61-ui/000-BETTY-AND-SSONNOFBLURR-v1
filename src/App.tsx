import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { AudioPlayer } from './components/AudioPlayer';
import { TracksSection } from './components/TracksSection';
import { SoundLab } from './components/SoundLab';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { VisualArchives } from './components/VisualArchives';
import { TourDates } from './components/TourDates';
import { MerchVault } from './components/MerchVault';

import { INITIAL_TRACKS, INITIAL_LORE, INITIAL_TASKS, INITIAL_TOUR_DATES, INITIAL_MERCH } from './data/mockData';
import { Track, WorkspaceTask, MerchItem } from './types';
import { soundEngine } from './audioEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('tracks');
  const [tracks] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(INITIAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Studio tasks state
  const [tasks, setTasks] = useState<WorkspaceTask[]>(INITIAL_TASKS);

  // Cart state
  const [cart, setCart] = useState<{ item: MerchItem; quantity: number }[]>([]);

  // Synchronize audio engine with playback state
  const handleTogglePlay = () => {
    soundEngine.ensureContext();
    if (isPlaying) {
      soundEngine.stopTrackLoop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      soundEngine.startTrackLoop(currentTrack.bpm, currentTrack.synthNotes);
    }
  };

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    if (isPlaying) {
      soundEngine.startTrackLoop(track.bpm, track.synthNotes);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    handleSelectTrack(tracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    handleSelectTrack(tracks[prevIndex]);
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
    soundEngine.setMasterVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      soundEngine.setMasterVolume(volume);
    } else {
      setIsMuted(true);
      soundEngine.setMasterVolume(0);
    }
  };

  const handleAddTask = (newTask: WorkspaceTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTaskStage = (taskId: string, newStage: WorkspaceTask['stage']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, stage: newStage } : t))
    );
  };

  const handleAddToCart = (item: MerchItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#07050d] text-neutral-100 flex flex-col relative selection:bg-purple-600 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-purple-700/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-700/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[140px] animate-pulse-slow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Top Header Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        cartCount={cartTotalCount}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'tracks' && (
          <TracksSection
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
          />
        )}

        {activeTab === 'synth' && (
          <SoundLab />
        )}

        {activeTab === 'workspace' && (
          <ProjectWorkspace
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateStage={handleUpdateTaskStage}
          />
        )}

        {activeTab === 'lore' && (
          <VisualArchives loreItems={INITIAL_LORE} />
        )}

        {activeTab === 'tour' && (
          <TourDates tourDates={INITIAL_TOUR_DATES} />
        )}

        {activeTab === 'merch' && (
          <MerchVault
            merchItems={INITIAL_MERCH}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* Fixed Bottom Audio Player Console */}
      <AudioPlayer
        currentTrack={currentTrack}
        tracks={tracks}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    </div>
  );
}

export default App;
