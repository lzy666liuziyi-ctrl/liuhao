import type { WuxingId } from '../types';

const map: Record<string, WuxingId[]> = {
  睡前: ['water'], 晨起: ['wood'], 茶室: ['earth'], 冥想: ['water', 'metal'], 阅读: ['earth', 'wood'], 空谷: ['metal'], 山林: ['wood'], 午后: ['fire', 'earth'], 独处: ['metal', 'water'], 空间音乐: ['earth'],
};

export const getRecommendedWuxingByScene = (scene: string): WuxingId[] => map[scene] ?? ['earth'];
export const getSeasonalWuxing = (date = new Date()): WuxingId => {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return 'wood';
  if (m >= 6 && m <= 8) return 'fire';
  if (m >= 9 && m <= 11) return 'metal';
  if (m === 12 || m <= 2) return 'water';
  return 'earth';
};
export const getSolarTermRecommendation = () => ({ tone: '宫音', title: '中土安和', note: '宫音取中土安和之意，适合茶室、静坐与日常放松场景。' });
