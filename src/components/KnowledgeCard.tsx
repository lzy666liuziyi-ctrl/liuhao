import { useState } from 'react';
export default function KnowledgeCard({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)} className="w-full rounded-2xl bg-white/80 p-4 text-left"><p className="font-medium">{title}</p>{open && <p className="mt-2 text-sm text-slate-600">{content}</p>}</button>;
}
