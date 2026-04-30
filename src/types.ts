export type WuxingId = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface WuxingItem {
  id: WuxingId;
  wuxing: string;
  tone: string;
  elementColor: string;
  theme: string;
  description: string;
  mainInstruments: string[];
  natureSounds: string[];
  scenes: string[];
  titleSeeds: string[];
  defaultBpm: number;
  moodWords: string[];
}

export interface GeneratedMusic {
  id: string;
  title: string;
  wuxing: string;
  tone: string;
  scene: string;
  instruments: string[];
  natureSound: string;
  duration: 5 | 15 | 30 | 60;
  style: '古典' | '禅意' | '国潮' | '冥想' | '环境音乐' | '睡前轻音';
  bpm: number;
  moodWords: string[];
  description: string;
  culturalNote: string;
  createdAt: string;
  audioUrl?: string;
}

export interface MusicTrack extends GeneratedMusic {
  source: 'library' | 'generated';
}

export interface GenerateOptions {
  wuxingId: WuxingId;
  scene: string;
  instruments: string[];
  natureSound: string;
  duration: 5 | 15 | 30 | 60;
  style: GeneratedMusic['style'];
}

export type TabKey = 'home' | 'generate' | 'library' | 'knowledge' | 'mine';
