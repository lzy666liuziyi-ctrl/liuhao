import { useEffect, useRef, useState } from 'react';
import type { GeneratedMusic } from '../types';

export default function MiniPlayer({ music }: { music: GeneratedMusic }) {
  const totalMock = music.duration * 60;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [total, setTotal] = useState(totalMock);
  const [error, setError] = useState('');

  useEffect(() => {
    setPlaying(false); setT(0); setError(''); setTotal(totalMock);
    if (!music.audioUrl) return;
    const audio = new Audio(music.audioUrl);
    audioRef.current = audio;
    const onTime = () => setT(audio.currentTime || 0);
    const onMeta = () => setTotal(Math.floor(audio.duration) || totalMock);
    const onEnd = () => { setPlaying(false); setT(0); audio.currentTime = 0; };
    const onErr = () => { setError('未找到本地音源文件，请将对应 mp3 放入 public/samples 目录。当前切换为模拟播放模式。'); audioRef.current = null; };
    audio.addEventListener('timeupdate', onTime); audio.addEventListener('loadedmetadata', onMeta); audio.addEventListener('ended', onEnd); audio.addEventListener('error', onErr);
    return () => { audio.pause(); audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('ended', onEnd); audio.removeEventListener('error', onErr); };
  }, [music.audioUrl, totalMock]);

  useEffect(() => {
    if (audioRef.current) { if (playing) void audioRef.current.play().catch(() => setError('未找到本地音源文件，请将对应 mp3 放入 public/samples 目录。当前切换为模拟播放模式。')); else audioRef.current.pause(); return; }
    if (!playing) return;
    const id = setInterval(() => setT((v) => (v >= totalMock ? (setPlaying(false), 0) : v + 1)), 1000);
    return () => clearInterval(id);
  }, [playing, totalMock]);

  const durationUsed = audioRef.current ? total : totalMock;
  return <div className='rounded-2xl bg-slate-900 p-3 text-white'><button onClick={() => setPlaying(!playing)} className='rounded bg-white/20 px-3 py-1 text-sm'>{playing ? '暂停' : '播放'}</button><div className='mt-2 h-1 rounded bg-white/20'><div className='h-1 rounded bg-cyan-300 transition-all' style={{ width: `${(t / Math.max(durationUsed,1)) * 100}%` }} /></div><p className='mt-1 text-xs'>{Math.floor(t/60)}:{String(Math.floor(t%60)).padStart(2,'0')} / {Math.floor(durationUsed/60)}:{String(Math.floor(durationUsed%60)).padStart(2,'0')}</p>{error && <p className='mt-1 text-[11px] text-amber-300'>{error}</p>}</div>;
}
