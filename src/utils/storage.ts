import type { GeneratedMusic } from '../types';

const FAVORITES_KEY = 'favoriteMusics';
const HISTORY_KEY = 'generatedHistory';

const read = (key: string): GeneratedMusic[] => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
};
const write = (key: string, data: GeneratedMusic[]) => localStorage.setItem(key, JSON.stringify(data));

export const getFavorites = () => read(FAVORITES_KEY);
export const saveFavorite = (music: GeneratedMusic) => {
  const items = getFavorites();
  if (!items.some((m) => m.id === music.id)) write(FAVORITES_KEY, [music, ...items]);
};
export const removeFavorite = (id: string) => write(FAVORITES_KEY, getFavorites().filter((m) => m.id !== id));
export const isFavorite = (id: string) => getFavorites().some((m) => m.id === id);
export const getHistory = () => read(HISTORY_KEY);
export const saveHistory = (music: GeneratedMusic) => write(HISTORY_KEY, [music, ...getHistory()].slice(0, 50));
export const clearHistory = () => write(HISTORY_KEY, []);

export const clearFavorites = () => write(FAVORITES_KEY, []);
