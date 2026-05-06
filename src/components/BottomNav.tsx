import type { TabKey } from '../types';
const tabs: { key: TabKey; label: string }[] = [{key:'home',label:'首页'},{key:'generate',label:'生成'},{key:'library',label:'曲库'},{key:'knowledge',label:'知音'},{key:'mine',label:'我的'}];
export default function BottomNav({ tab, setTab }: { tab: TabKey; setTab: (t: TabKey) => void }) {
  return <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-[430px] justify-around border-t bg-white/95 py-2">{tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} className={`text-xs ${tab===t.key?'text-slate-900':'text-slate-400'}`}>{t.label}</button>)}</div>;
}
