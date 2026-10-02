import React, { useState } from 'react';
import { BookOpen, Terminal, Sparkles, Filter, Eye, X, Compass, Radio } from 'lucide-react';
import { LoreItem } from '../types';

interface VisualArchivesProps {
  loreItems: LoreItem[];
}

export const VisualArchives: React.FC<VisualArchivesProps> = ({ loreItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<LoreItem | null>(loreItems[0]);
  const [galleryModalImage, setGalleryModalImage] = useState<{ title: string; desc: string; gradient: string } | null>(null);

  const categories = ['All', 'Origin', 'Manifesto', 'Transmission', 'Character File'];

  const filteredItems = selectedCategory === 'All'
    ? loreItems
    : loreItems.filter((i) => i.category === selectedCategory);

  const artGallery = [
    {
      title: '000-BETTY Holographic Sleeve',
      desc: 'Gatefold visual proof under 365nm ultraviolet emitter.',
      gradient: 'from-purple-900 via-indigo-950 to-black',
      tag: 'Vinyl Artwork'
    },
    {
      title: 'Son of Blur Reel Chamber',
      desc: 'Nocturnal analog tape head alignment with wow and flutter oscilloscope.',
      gradient: 'from-sky-950 via-slate-900 to-black',
      tag: 'Hardware Study'
    },
    {
      title: 'The Berlin Void Transmission',
      desc: 'Live projection mapping at Kraftwerk Berlin 2026.',
      gradient: 'from-fuchsia-950 via-purple-950 to-neutral-950',
      tag: 'Live Visuals'
    },
    {
      title: 'Harmonic Formant Matrix',
      desc: 'Vocal modulation curve visualization engineered by Betty.',
      gradient: 'from-rose-950 via-slate-950 to-black',
      tag: 'Spectral Graph'
    }
  ];

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <div className="border-b border-purple-500/20 pb-6">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
          <BookOpen className="h-4 w-4" />
          <span>PROJECT CHRONICLES • LORE & DOSSIERS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
          THE BETTY & SUNNOFBLUR ARCHIVES
        </h2>
        <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
          Declassified logs, studio manifestos, personnel profiles, and audio-visual schematics documenting the universe of 000-BETTY-AND-SSONNOFBLURR.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" /> FILTER:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/5 hover:border-purple-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Lore Index on Left, Active Terminal Document on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  isSelected
                    ? 'border-purple-500/60 bg-gradient-to-r from-purple-950/60 to-neutral-900/80 shadow-lg shadow-purple-950/50'
                    : 'border-white/5 bg-neutral-900/40 hover:border-purple-500/30 hover:bg-neutral-900/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-purple-400 font-bold">CH. {item.chapter}</span>
                  <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] text-neutral-400">
                    {item.category}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-neutral-100 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5">
                  <span>BY {item.author}</span>
                  <span>{item.era}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Terminal Reader (7 cols) */}
        <div className="lg:col-span-7">
          {activeItem ? (
            <div className="rounded-2xl border border-purple-500/30 bg-[#0e0a1a]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                  <Terminal className="h-4 w-4 text-purple-400" />
                  <span>DECRYPTED TERMINAL // LOG REF: {activeItem.id.toUpperCase()}</span>
                </div>
                <span className="rounded-md bg-purple-500/20 px-2.5 py-0.5 font-mono text-xs text-purple-300 border border-purple-500/30">
                  {activeItem.era}
                </span>
              </div>

              {/* Document Header */}
              <div>
                <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-widest">
                  CHAPTER {activeItem.chapter} — {activeItem.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeItem.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 font-mono text-xs text-neutral-400">
                  <span>TRANSCRIBED BY: <strong className="text-purple-300">{activeItem.author}</strong></span>
                  <span>•</span>
                  <span>SECURITY: ARCHIVAL LEVEL 0</span>
                </div>
              </div>

              {/* Document Summary Box */}
              <div className="rounded-xl bg-purple-950/30 border border-purple-500/20 p-4 font-mono text-xs text-purple-200/90 leading-relaxed">
                "{activeItem.summary}"
              </div>

              {/* Main Text Passages */}
              <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-neutral-300">
                {activeItem.content.map((paragraph, idx) => (
                  <p key={idx} className="border-l-2 border-purple-500/40 pl-4 py-1">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-neutral-500">INDEX KEYS:</span>
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-neutral-900 px-2.5 py-1 font-mono text-xs text-neutral-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-neutral-900/30 p-12 text-center text-neutral-400 font-mono text-sm">
              Select an archival dossier to initialize transcription.
            </div>
          )}
        </div>
      </div>

      {/* Visual Artworks & Schematics Gallery */}
      <div className="space-y-4 pt-6 border-t border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              OPTICAL ARTIFACTS & SCHEMATICS
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Visual art prints, hardware studies, and live projection mapping captures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {artGallery.map((art, idx) => (
            <div
              key={idx}
              onClick={() => setGalleryModalImage(art)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-neutral-900/40 p-4 transition-all hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/40"
            >
              {/* Image Preview Canvas Mock */}
              <div className={`relative h-40 w-full rounded-xl bg-gradient-to-br ${art.gradient} p-4 flex flex-col justify-between overflow-hidden shadow-inner border border-white/10 group-hover:scale-[1.02] transition-transform`}>
                <div className="flex justify-between items-start">
                  <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] text-purple-300 border border-purple-500/30">
                    {art.tag}
                  </span>
                  <Eye className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <div className="font-mono text-[10px] text-neutral-400 tracking-wider">
                  COORD: 000.{idx + 1}.BLUR
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-display font-bold text-sm text-neutral-100 group-hover:text-purple-300 transition-colors truncate">
                  {art.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {art.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {galleryModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-lg w-full rounded-3xl border border-purple-500/40 bg-neutral-950 p-6 shadow-2xl">
            <button
              onClick={() => setGalleryModalImage(null)}
              className="absolute top-4 right-4 rounded-full p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className={`h-64 rounded-2xl bg-gradient-to-br ${galleryModalImage.gradient} p-6 flex flex-col justify-between border border-white/10 mb-4`}>
              <span className="font-mono text-xs text-purple-300">HIGH-DEF OPTICAL SCAN</span>
              <div className="text-center font-display text-xl font-bold text-white tracking-widest">
                BETTY & SUNNOFBLUR
              </div>
              <span className="font-mono text-[10px] text-neutral-400">RESOLUTION: 4096x4096 • 32-BIT COLOR</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">{galleryModalImage.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{galleryModalImage.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
