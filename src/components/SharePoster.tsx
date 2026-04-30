import type { GeneratedMusic } from '../types';
export default function SharePoster({ music }: { music: GeneratedMusic }) {
  return <div className='rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 p-4 text-white'><p className='text-sm opacity-80'>五音生乐</p><h4 className='text-xl font-semibold'>《{music.title}》</h4><p className='text-sm mt-1'>{music.wuxing}行{music.tone} · {music.style}</p><p className='mt-2 text-xs'>乐器：{music.instruments.join('、')}</p><p className='text-xs'>自然声：{music.natureSound}</p><p className='mt-2 text-xs line-clamp-2'>{music.culturalNote}</p><p className='mt-3 text-xs'>宫商角徵羽，一音一五行。</p></div>;
}
