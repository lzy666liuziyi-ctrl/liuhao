import { motion } from 'framer-motion';
import type { WuxingItem } from '../types';

const styleMap={木:'from-emerald-100 to-teal-50 text-emerald-700',火:'from-red-100 to-orange-50 text-red-700',土:'from-yellow-100 to-amber-50 text-amber-700',金:'from-slate-100 to-zinc-50 text-zinc-700',水:'from-blue-100 to-slate-100 text-blue-900'} as const;
export default function WuxingCard({ item, active, onClick }: { item: WuxingItem; active: boolean; onClick: () => void }) {
  return <motion.button whileTap={{ scale: 0.98 }} animate={active?{scale:1.02}:{scale:1}} onClick={onClick} className={`w-full rounded-2xl border p-3 text-left bg-gradient-to-br ${styleMap[item.wuxing as keyof typeof styleMap]} ${active?'border-white shadow-[0_0_0_2px_rgba(15,23,42,0.25)]':'border-transparent'}`}><p className='font-semibold'>{item.wuxing} · {item.tone}</p><p className='text-xs opacity-80'>{item.theme.split('、')[0]}</p><p className='text-xs mt-1 opacity-70'>{item.description.slice(0,28)}...</p></motion.button>;
}
