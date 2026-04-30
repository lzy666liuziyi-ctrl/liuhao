import { useEffect, useState } from 'react';
export default function MiniPlayer({ duration }: { duration: number }) {
  const total = duration * 60; const [playing, setPlaying] = useState(false); const [t, setT] = useState(0);
  useEffect(() => { if (!playing) return; const id = setInterval(() => setT((v) => Math.min(v + 1, total)), 1000); return () => clearInterval(id); }, [playing, total]);
  return <div className="rounded-2xl bg-slate-900 p-3 text-white"><button onClick={() => setPlaying(!playing)} className="rounded bg-white/20 px-3 py-1 text-sm">{playing ? '暂停' : '播放'}</button><div className="mt-2 h-1 rounded bg-white/20"><div className="h-1 rounded bg-cyan-300" style={{ width: `${(t / total) * 100}%` }} /></div><p className="mt-1 text-xs">{Math.floor(t/60)}:{String(t%60).padStart(2,'0')} / {duration}:00</p></div>;
}
