import { Track, LoreItem, WorkspaceTask, TourDate, MerchItem, SynthPreset } from '../types';

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'track-01',
    title: 'Echoes in the Mirage',
    subtitle: 'Chapter 01 — The First Transmission',
    duration: '03:48',
    durationSeconds: 228,
    bpm: 118,
    musicalKey: 'D Minor',
    releaseStatus: 'Released',
    releaseDate: 'Oct 2026',
    description: 'Layered analog poly-synths with tape saturation, vocal modulations by Betty, and driving sub-oscillations by Son of Blur.',
    lyrics: [
      '[Intro: Tape hiss, sub rumble]',
      'Light bends at the border of the skyline,',
      'Where the neon ceases to remember who we were.',
      'Call my name across the static line,',
      'Betty whispers through the blur.',
      '',
      '[Chorus]',
      'Caught in the echo, caught in the haze,',
      'Son of Blur guides the twilight through the maze.',
      'We dissolve into the resonance,',
      'Zero zero zero, final cadence.'
    ],
    gradient: 'from-purple-900 via-indigo-950 to-neutral-950',
    accentColor: '#a855f7',
    tags: ['Synthesizer', 'Atmospheric', '808 Bass', 'Tape Warmth'],
    synthNotes: [293.66, 349.23, 440.0, 523.25, 440.0, 349.23, 392.0, 329.63],
    stems: [
      { id: 's-01', name: 'Lead Poly-Synth', type: 'synth', volume: 0.85, muted: false, solo: false, color: '#c084fc', waveformPattern: [40, 65, 80, 55, 90, 70, 85, 60] },
      { id: 's-02', name: '808 Sub Resonance', type: 'bass', volume: 0.9, muted: false, solo: false, color: '#818cf8', waveformPattern: [85, 30, 95, 20, 80, 25, 90, 35] },
      { id: 's-03', name: 'Betty Vocal Modulations', type: 'vocals', volume: 0.75, muted: false, solo: false, color: '#f472b6', waveformPattern: [20, 85, 45, 95, 30, 80, 50, 70] },
      { id: 's-04', name: 'Analog Drum Sequencer', type: 'drums', volume: 0.8, muted: false, solo: false, color: '#fb923c', waveformPattern: [100, 20, 75, 40, 100, 25, 80, 30] },
      { id: 's-05', name: 'Tape Glitch & Noise Floor', type: 'texture', volume: 0.45, muted: false, solo: false, color: '#38bdf8', waveformPattern: [25, 35, 30, 45, 28, 40, 32, 50] }
    ]
  },
  {
    id: 'track-02',
    title: 'Blur Silhouette (000)',
    subtitle: 'Chapter 02 — High Speed Monolith',
    duration: '04:12',
    durationSeconds: 252,
    bpm: 124,
    musicalKey: 'F# Minor',
    releaseStatus: 'Studio Mix',
    releaseDate: 'Nov 2026',
    description: 'Hypnotic arpeggios bouncing through dual delay lines, anchored by crisp breakbeats and ethereal choir fragments.',
    lyrics: [
      '[Verse 1]',
      'Moving faster than the camera shutter,',
      'A streak of ultraviolet across the lens.',
      'Whatever secret words you utter,',
      'The frequency begins where reason ends.',
      '',
      '[Outro]',
      'Blur the silhouette, leave the frame.',
      'No one here remembers our real name.'
    ],
    gradient: 'from-fuchsia-950 via-purple-900 to-black',
    accentColor: '#e879f9',
    tags: ['Arpeggio', 'Breakbeat', 'Cyber-Noir', 'Vocal Textures'],
    synthNotes: [369.99, 440.0, 554.37, 659.25, 554.37, 440.0, 493.88, 369.99],
    stems: [
      { id: 's-06', name: 'Hyper Arp Synth', type: 'synth', volume: 0.85, muted: false, solo: false, color: '#e879f9', waveformPattern: [60, 85, 70, 95, 65, 80, 90, 75] },
      { id: 's-07', name: 'Acid Low End', type: 'bass', volume: 0.8, muted: false, solo: false, color: '#6366f1', waveformPattern: [70, 40, 85, 50, 95, 35, 75, 60] },
      { id: 's-08', name: 'Resonant Choir Stabs', type: 'vocals', volume: 0.7, muted: false, solo: false, color: '#f43f5e', waveformPattern: [30, 70, 20, 85, 40, 60, 30, 90] },
      { id: 's-09', name: 'Jungle Breaks & Kicks', type: 'drums', volume: 0.85, muted: false, solo: false, color: '#f59e0b', waveformPattern: [90, 50, 100, 30, 85, 65, 95, 40] },
      { id: 's-10', name: 'Sub-Harmonic Drone', type: 'texture', volume: 0.5, muted: false, solo: false, color: '#2dd4bf', waveformPattern: [40, 42, 45, 43, 48, 46, 44, 47] }
    ]
  },
  {
    id: 'track-03',
    title: 'Midnight Violet Tape',
    subtitle: 'Chapter 03 — Nocturnal Session',
    duration: '03:15',
    durationSeconds: 195,
    bpm: 94,
    musicalKey: 'A Minor',
    releaseStatus: 'Released',
    releaseDate: 'Sep 2026',
    description: 'Downtempo trip-hop inspired beat layered with Rhodes keyboard tones, filtered reverbs, and recorded rain ambience.',
    lyrics: [
      '[Spoken Sample]',
      '"The needle drops on side B, at 3:17 AM in Berlin."',
      '[Chorus]',
      'Violet tape unwinding slow,',
      'Everything we had left to know,',
      'Buried in the frequency floor.',
      'Close the studio door.'
    ],
    gradient: 'from-violet-950 via-slate-900 to-black',
    accentColor: '#8b5cf6',
    tags: ['Lo-Fi', 'Trip-Hop', 'Rhodes', 'Deep Chill'],
    synthNotes: [220.0, 261.63, 329.63, 392.0, 440.0, 329.63, 261.63, 196.0],
    stems: [
      { id: 's-11', name: 'Warm Rhodes Keys', type: 'synth', volume: 0.8, muted: false, solo: false, color: '#a78bfa', waveformPattern: [35, 55, 40, 60, 45, 50, 42, 58] },
      { id: 's-12', name: 'Fat Moog Sub', type: 'bass', volume: 0.85, muted: false, solo: false, color: '#3b82f6', waveformPattern: [90, 20, 85, 15, 95, 20, 80, 25] },
      { id: 's-13', name: 'Whisper Harmony', type: 'vocals', volume: 0.65, muted: false, solo: false, color: '#fb7185', waveformPattern: [15, 45, 25, 60, 20, 50, 30, 40] },
      { id: 's-14', name: 'Boom Bap Dusty Drums', type: 'drums', volume: 0.75, muted: false, solo: false, color: '#eab308', waveformPattern: [80, 10, 60, 30, 85, 15, 70, 25] },
      { id: 's-15', name: 'Rainfall & Vinyl Crackle', type: 'texture', volume: 0.4, muted: false, solo: false, color: '#06b6d4', waveformPattern: [30, 32, 28, 35, 31, 33, 29, 34] }
    ]
  },
  {
    id: 'track-04',
    title: 'Neon Static Cathedral',
    subtitle: 'Chapter 04 — Cybernetic Hymn',
    duration: '05:04',
    durationSeconds: 304,
    bpm: 130,
    musicalKey: 'C Minor',
    releaseStatus: 'Unmastered Demo',
    releaseDate: 'Dec 2026',
    description: 'Cathedral pipe organ samples processed through bit-crushers and granular synthesisers, accelerating into a thumping industrial groove.',
    lyrics: [
      '[Choir Intro]',
      'Sanctus ex machina,',
      'Transmitter open wide.',
      '[Drop]',
      'Underneath the high-voltage wire,',
      'Betty sets the wire on fire!'
    ],
    gradient: 'from-rose-950 via-indigo-950 to-neutral-950',
    accentColor: '#f43f5e',
    tags: ['Industrial', 'Granular', 'Cyberpunk', 'Heavy Kick'],
    synthNotes: [261.63, 311.13, 392.0, 523.25, 622.25, 523.25, 392.0, 311.13],
    stems: [
      { id: 's-16', name: 'Cathedral Organ Glitch', type: 'synth', volume: 0.9, muted: false, solo: false, color: '#f43f5e', waveformPattern: [70, 90, 85, 100, 75, 95, 80, 88] },
      { id: 's-17', name: 'Distorted Bass Wave', type: 'bass', volume: 0.85, muted: false, solo: false, color: '#6366f1', waveformPattern: [95, 80, 100, 75, 90, 85, 95, 80] },
      { id: 's-18', name: 'Cyber Vox Lead', type: 'vocals', volume: 0.7, muted: false, solo: false, color: '#ec4899', waveformPattern: [40, 80, 50, 90, 35, 75, 45, 85] },
      { id: 's-19', name: 'Industrial Hard Kicks', type: 'drums', volume: 0.95, muted: false, solo: false, color: '#ef4444', waveformPattern: [100, 40, 90, 60, 100, 35, 95, 50] },
      { id: 's-20', name: 'High-Voltage Buzz', type: 'texture', volume: 0.5, muted: false, solo: false, color: '#10b981', waveformPattern: [50, 55, 48, 62, 53, 58, 51, 60] }
    ]
  }
];

export const INITIAL_LORE: LoreItem[] = [
  {
    id: 'lore-01',
    chapter: '000',
    title: 'The Genesis of Betty and Son of Blur',
    era: 'Epoch 000 — Berlin Underground',
    category: 'Origin',
    author: 'Terminal Log',
    accent: '#a855f7',
    summary: 'How an avant-garde vocal synth experiment merged with an illicit underground tape-loop archivist.',
    tags: ['Genesis', 'Philosophy', 'Hardware', 'Analogue-Digital'],
    content: [
      'In the sub-basements of former power stations, Betty was tuning a custom algorithmic resonator designed to deconstruct classical choral melodies into frequency shards.',
      'Son of Blur—known only for decaying reel-to-reel magnetic tapes and high-defocus video optics—plugged a 1974 tube preamp directly into her master output.',
      'The resulting resonance was neither purely electronic nor purely acoustic. It existed in the liminal blur between clarity and distortion.',
      'From that night forward, the project code 000-BETTY-AND-SSONNOFBLURR was stamped onto every cassette, code repository, and live performance.'
    ]
  },
  {
    id: 'lore-02',
    chapter: '001',
    title: 'The Dual Oscillator Manifesto',
    era: 'Studio Directive',
    category: 'Manifesto',
    author: 'Betty',
    accent: '#ec4899',
    summary: 'Tenet of sound design: Never clean the signal until it is on the verge of collapsing into pure emotion.',
    tags: ['Aesthetic', 'Rules', 'Tone', 'Production'],
    content: [
      '1. The blur is not a mistake; it is the space where the human ear projects its own memory.',
      '2. Pristine digital fidelity separates the listener from the artist. Analog drift brings them closer.',
      '3. Sub-bass must be felt in the sternum before it is identified in the monitors.',
      '4. Betty provides the voice of certainty; Son of Blur dissolves the boundaries surrounding it.'
    ]
  },
  {
    id: 'lore-03',
    chapter: '002',
    title: 'The Phosphor Archives: Field Transmission 14',
    era: 'Nocturnal Session 2026',
    category: 'Transmission',
    author: 'Son of Blur',
    accent: '#38bdf8',
    summary: 'Notes on capturing room reflections and magnetic degradation during the recording of Echoes in the Mirage.',
    tags: ['Field Recording', 'Microphones', 'Tape Decay'],
    content: [
      'Temperature in the tracking room: 14°C. Condenser diaphragms are slightly damp.',
      'We ran the main vocal bus through an ancient cassette player with loose capstan belts. The wow and flutter created an involuntary tremolo that could never be programmed.',
      'When Betty harmonized with the tape feedback, the studio meters pinned into the red, but the speakers didn’t tear. They breathed.'
    ]
  },
  {
    id: 'lore-04',
    chapter: '003',
    title: 'Personnel Dossier: Betty',
    era: 'Subject Profile',
    category: 'Character File',
    author: 'The Collective',
    accent: '#a855f7',
    summary: 'Lead vocalist, synthesizer architect, microtonal tuning programmer, and lyricist.',
    tags: ['Vocals', 'Synths', 'Code', 'Architecture'],
    content: [
      'Known roles: Lead lyricist, hardware synth programmer, modular patch designer.',
      'Signature instrument: Modified Prophet-6, custom DSP vocal formant tracker.',
      'Philosophy: "Words are only frequencies that learned how to be impatient."'
    ]
  },
  {
    id: 'lore-05',
    chapter: '004',
    title: 'Personnel Dossier: Son of Blur',
    era: 'Subject Profile',
    category: 'Character File',
    author: 'The Collective',
    accent: '#818cf8',
    summary: 'Tape manipulator, low-frequency sound designer, visual projectionist, and noise archivist.',
    tags: ['Bass', 'Tape', 'Visuals', 'Optics'],
    content: [
      'Known roles: Sub-bass sculpting, tape-delay feedback loops, live video deflection.',
      'Signature instrument: Nagra IV-S tape recorder, custom 808 sub saturator.',
      'Philosophy: "Sharp focus is an illusion invented by lenses that have never walked in the dark."'
    ]
  }
];

export const INITIAL_TASKS: WorkspaceTask[] = [
  {
    id: 'task-1',
    title: 'Complete 24-bit/96kHz Stem Bounce for "Echoes in the Mirage"',
    category: 'Audio',
    stage: 'completed',
    assignee: 'Son of Blur',
    priority: 'high',
    dueDate: '2026-10-05',
    notes: 'Tape saturation added on stem 5, 808 sub calibrated at -6dB true peak.'
  },
  {
    id: 'task-2',
    title: 'Program Live Shaders for "Blur Silhouette" Tour Visuals',
    category: 'Visual',
    stage: 'in_progress',
    assignee: 'Son of Blur',
    priority: 'high',
    dueDate: '2026-10-18',
    notes: 'Audio-reactive bloom shader responding to kick frequencies (45Hz-90Hz).'
  },
  {
    id: 'task-3',
    title: 'Finalize Lyric Booklet Typography & Ultraviolet Foil Stamping',
    category: 'Merch',
    stage: 'concept',
    assignee: 'Betty',
    priority: 'medium',
    dueDate: '2026-10-25',
    notes: 'Using custom Space Mono & Cinzel hybrid typesetting.'
  },
  {
    id: 'task-4',
    title: 'Mastering Quality Check for Neon Static Cathedral 12" Dubplate',
    category: 'Release',
    stage: 'mix_master',
    assignee: 'Studio Lab',
    priority: 'high',
    dueDate: '2026-11-01',
    notes: 'Checking low-end phase correlation on lathe cutting stylus simulation.'
  },
  {
    id: 'task-5',
    title: 'Soundcheck Protocol for London & Berlin Live Immersive Sets',
    category: 'Live',
    stage: 'in_progress',
    assignee: 'Betty',
    priority: 'medium',
    dueDate: '2026-11-10',
    notes: 'Quadraphonic speaker array setup and wireless MIDI latency test.'
  }
];

export const INITIAL_TOUR_DATES: TourDate[] = [
  {
    id: 'tour-1',
    date: 'NOV 14, 2026',
    city: 'London',
    venue: 'Printworks Horizon Hall',
    country: 'United Kingdom',
    status: 'Selling Fast',
    rsvpCount: 2480,
    coordinates: '51.4975° N, 0.0469° W'
  },
  {
    id: 'tour-2',
    date: 'NOV 21, 2026',
    city: 'Berlin',
    venue: 'Kraftwerk Vault Complex',
    country: 'Germany',
    status: 'Sold Out',
    rsvpCount: 3100,
    coordinates: '52.5117° N, 13.4183° E'
  },
  {
    id: 'tour-3',
    date: 'DEC 05, 2026',
    city: 'Reykjavik',
    venue: 'Harpa Glass Pavilion',
    country: 'Iceland',
    status: 'Tickets Available',
    rsvpCount: 1120,
    coordinates: '64.1506° N, 21.9328° W'
  },
  {
    id: 'tour-4',
    date: 'DEC 12, 2026',
    city: 'Tokyo',
    venue: 'Liquidroom Prism Stage',
    country: 'Japan',
    status: 'Selling Fast',
    rsvpCount: 1850,
    coordinates: '35.6515° N, 139.7126° E'
  },
  {
    id: 'tour-5',
    date: 'JAN 08, 2027',
    city: 'New York',
    venue: 'Knockdown Center Main Ruin',
    country: 'United States',
    status: 'Tickets Available',
    rsvpCount: 2200,
    coordinates: '40.7144° N, 73.9168° W'
  }
];

export const INITIAL_MERCH: MerchItem[] = [
  {
    id: 'merch-1',
    title: '000-BETTY-AND-SSONNOFBLURR Double LP',
    edition: 'First Pressing — Smoked Violet Vinyl (Limited 500)',
    price: 38,
    category: 'Vinyl',
    tag: 'Collector Edition',
    description: 'Heavyweight 180g vinyl with ultraviolet spot varnish gatefold, full stem download code, and 16-page lore manifesto.',
    details: ['180g Audiophile Vinyl', 'Gatefold Sleeve', 'Digital FLAC 24-bit Stems Included', 'Foil Stamped numbering'],
    inStock: true,
    colorHex: '#9333ea'
  },
  {
    id: 'merch-2',
    title: 'Son of Blur Modular Tape Cassette',
    edition: 'C-60 Chrome Tape with Hand-Dubbed Master Tone',
    price: 18,
    category: 'Tape',
    tag: 'Studio Dub',
    description: 'Real-time high-bias cassette dubbed directly from the studio Revox reel machine, enclosed in transparent smoky casing.',
    details: ['Real-Time Tape Duplication', 'J-Card with handwritten lyrics', 'Unreleased B-side drone session'],
    inStock: true,
    colorHex: '#0284c7'
  },
  {
    id: 'merch-3',
    title: 'The Mirage Heavyweight Hoodie',
    edition: '520 GSM Brushed Organic Cotton — Charcoal Violet',
    price: 88,
    category: 'Apparel',
    tag: 'Signature Apparel',
    description: 'Oversized boxy drop-shoulder fit featuring embroidered Betty & Sunnofblur frequency coordinates on the sleeve.',
    details: ['520 GSM French Terry', 'Distressed edge details', 'High-density puff screenprint', 'Hidden earphone loop'],
    inStock: true,
    colorHex: '#475569'
  },
  {
    id: 'merch-4',
    title: 'Phosphor Holographic Screenprint (18x24")',
    edition: 'Signed & Numbered Studio Print (Edition of 150)',
    price: 45,
    category: 'Print',
    tag: 'Archival Art',
    description: 'Silkscreen printed with light-reactive metallic pigment on archival cotton rag paper. Glows under 365nm UV blacklight.',
    details: ['Hand-printed in Berlin', 'Cotton rag 310gsm', 'Signed by Betty and Son of Blur'],
    inStock: true,
    colorHex: '#ec4899'
  }
];

export const SYNTH_PRESETS: SynthPreset[] = [
  {
    id: 'preset-1',
    name: 'Twilight Mirage',
    description: 'Lush atmospheric pad with soft lowpass filter and heavy tape blur delay.',
    bpm: 118,
    filterCutoff: 1400,
    resonance: 4.2,
    blurDiffusion: 0.65,
    delayFeedback: 0.5,
    waveType: 'sawtooth',
    chords: ['D Minor', 'F Major', 'C Major', 'G Minor']
  },
  {
    id: 'preset-2',
    name: 'Acid Monolith 000',
    description: 'Resonant squelch synth with high peak filter and sharp rhythmic decay.',
    bpm: 124,
    filterCutoff: 3800,
    resonance: 12.0,
    blurDiffusion: 0.2,
    delayFeedback: 0.25,
    waveType: 'sawtooth',
    chords: ['F# Minor', 'A Major', 'E Minor', 'B Minor']
  },
  {
    id: 'preset-3',
    name: 'Deep Oceanic Sub',
    description: 'Ultra-low sine waves that shake the subwoofer floor with sub-harmonics.',
    bpm: 94,
    filterCutoff: 450,
    resonance: 1.5,
    blurDiffusion: 0.1,
    delayFeedback: 0.1,
    waveType: 'sine',
    chords: ['A Minor', 'E Minor', 'F Major', 'D Minor']
  },
  {
    id: 'preset-4',
    name: 'Cathedral Granular',
    description: 'Glistening choral harmonics layered through intense feedback reflections.',
    bpm: 130,
    filterCutoff: 2600,
    resonance: 7.5,
    blurDiffusion: 0.85,
    delayFeedback: 0.65,
    waveType: 'triangle',
    chords: ['C Minor', 'Ab Major', 'Eb Major', 'Bb Major']
  }
];
