import { Heart, Play } from 'lucide-react';
import type { GeneratedMusic } from '../types';
export default function MusicCard({ music, onFavorite }: { music: GeneratedMusic; onFavorite?: () => void }) {
  return <div className="rounded-2xl bg-white/80 p-3 shadow-ink"><div className="flex items-start justify-between"><div><p className="font-semibold">《{music.title}》</p><p className="text-xs text-slate-500">{music.wuxing} · {music.tone} · {music.scene}</p></div><button className="p-2"><Play size={16} /></button></div><p className="mt-2 text-xs text-slate-500">{music.instruments.join('、')} · {music.duration}分钟</p><button onClick={onFavorite} className="mt-2 flex items-center gap-1 text-xs text-rose-600"><Heart size={14}/>收藏</button></div>;
}
