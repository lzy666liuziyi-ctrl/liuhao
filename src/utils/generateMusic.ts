import { wuxingMap } from '../data/wuxing';
import type { GenerateOptions, GeneratedMusic } from '../types';

const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export function generateMusic(options: GenerateOptions): GeneratedMusic {
  const base = wuxingMap[options.wuxingId];
  const title = pickRandom(base.titleSeeds);
  const bpm = base.defaultBpm + Math.floor(Math.random() * 7) - 3;
  const moodWords = shuffle(base.moodWords).slice(0, 3);
  const mainPair = options.instruments.slice(0, 2).join('与') || base.mainInstruments.slice(0, 2).join('与');

  return {
    id: `music_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title,
    wuxing: base.wuxing,
    tone: base.tone,
    scene: options.scene,
    instruments: options.instruments,
    natureSound: options.natureSound,
    duration: options.duration,
    style: options.style,
    bpm,
    moodWords,
    description: `这是一首 ${options.duration} 分钟的${base.wuxing}行${base.tone}音乐，风格为${options.style}，适合用于${options.scene}、冥想、独处等安静场景。`,
    culturalNote: `本曲取${base.wuxing}行${base.tone}之意，以${mainPair}为主，配合${options.natureSound}声，营造${title}般的东方意境。`,
    createdAt: new Date().toISOString(),
    audioUrl: ''
  };
}
