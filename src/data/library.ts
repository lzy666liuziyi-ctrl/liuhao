import { wuxingMap } from './wuxing';
import type { GeneratedMusic, WuxingId } from '../types';

const by = (w: WuxingId, titles: string[]): GeneratedMusic[] => titles.map((title, i) => ({
  id: `lib_${w}_${i}`,
  title,
  wuxing: wuxingMap[w].wuxing,
  tone: wuxingMap[w].tone,
  scene: wuxingMap[w].scenes[i % wuxingMap[w].scenes.length],
  instruments: wuxingMap[w].mainInstruments.slice(0, 2),
  natureSound: wuxingMap[w].natureSounds[i % wuxingMap[w].natureSounds.length],
  duration: ([15, 30, 60, 5][i % 4] as 5 | 15 | 30 | 60),
  style: (['古典', '禅意', '国潮', '冥想', '环境音乐', '睡前轻音'][i % 6] as GeneratedMusic['style']),
  bpm: wuxingMap[w].defaultBpm,
  moodWords: wuxingMap[w].moodWords,
  description: `${title}是一首${wuxingMap[w].wuxing}行${wuxingMap[w].tone}曲。`,
  culturalNote: `取${wuxingMap[w].theme}之意。`,
  createdAt: new Date().toISOString(),
  audioUrl: ''
}));

export const libraryTracks: GeneratedMusic[] = [
...by('wood',['青木生风','竹影流泉','春山初醒','风入青林','木气舒扬','山岚初开']),
...by('fire',['赤日微光','夏火轻鸣','心灯初燃','花间徵音','暖阳入怀','朱明听夏']),
...by('earth',['中土安和','黄庭静坐','山居慢音','茶烟入宫','一念归中','厚土无声']),
...by('metal',['白露清音','秋山远钟','商音入月','金声玉振','风过寒林','空谷听钟']),
...by('water',['夜水归藏','羽音入梦','星河静流','冬藏无声','江月沉音','雨落深庭']),
];
