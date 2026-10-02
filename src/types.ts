export interface Stem {
  id: string;
  name: string;
  type: 'synth' | 'drums' | 'bass' | 'vocals' | 'texture';
  volume: number; // 0 to 1
  muted: boolean;
  solo: boolean;
  color: string;
  waveformPattern: number[];
}

export interface Track {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  bpm: number;
  musicalKey: string;
  releaseStatus: 'Released' | 'Studio Mix' | 'Unmastered Demo' | 'Live Session';
  releaseDate: string;
  description: string;
  lyrics?: string[];
  gradient: string;
  accentColor: string;
  tags: string[];
  stems: Stem[];
  synthNotes: number[]; // Frequencies for generative synth playback
}

export interface LoreItem {
  id: string;
  chapter: string;
  title: string;
  era: string;
  category: 'Origin' | 'Manifesto' | 'Transmission' | 'Character File' | 'Artifact';
  summary: string;
  content: string[];
  tags: string[];
  author: 'Betty' | 'Son of Blur' | 'The Collective' | 'Terminal Log';
  accent: string;
}

export interface WorkspaceTask {
  id: string;
  title: string;
  category: 'Audio' | 'Visual' | 'Merch' | 'Live' | 'Release';
  stage: 'concept' | 'in_progress' | 'mix_master' | 'completed';
  assignee: 'Betty' | 'Son of Blur' | 'Studio Lab' | 'Creative Director';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  notes?: string;
}

export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  country: string;
  status: 'Tickets Available' | 'Selling Fast' | 'Sold Out' | 'Secret Location';
  rsvpCount: number;
  coordinates: string;
}

export interface MerchItem {
  id: string;
  title: string;
  edition: string;
  price: number;
  category: 'Vinyl' | 'Apparel' | 'Tape' | 'Artifact' | 'Print';
  tag: string;
  description: string;
  details: string[];
  inStock: boolean;
  colorHex: string;
}

export interface SynthPreset {
  id: string;
  name: string;
  description: string;
  bpm: number;
  filterCutoff: number; // 100 to 8000 Hz
  resonance: number;    // 1 to 20
  blurDiffusion: number;// 0 to 1
  delayFeedback: number;// 0 to 0.8
  waveType: OscillatorType;
  chords: string[];
}
