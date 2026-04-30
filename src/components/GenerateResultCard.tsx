import { motion } from 'framer-motion';
import type { GeneratedMusic } from '../types';
import Tag from './Tag';
export default function GenerateResultCard({ music }: { music: GeneratedMusic }) {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/90 p-4 shadow-ink"><h3 className="text-lg font-semibold">《{music.title}》</h3><p className="text-sm text-slate-500">{music.wuxing}行 {music.tone} · {music.style}</p><div className="mt-2 flex flex-wrap gap-2">{music.moodWords.map((m) => <Tag key={m} text={m} />)}</div><p className="mt-2 text-sm">{music.description}</p><p className="mt-2 text-xs text-slate-500">{music.culturalNote}</p></motion.div>;
}
