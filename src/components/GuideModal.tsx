import Modal from './Modal';
export default function GuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Modal open={open} onClose={onClose}><h3 className='text-lg font-semibold'>欢迎来到五音生乐</h3><ol className='mt-2 list-decimal pl-5 text-sm text-slate-600'><li>第一步：选择五行</li><li>第二步：搭配乐器与自然声</li><li>第三步：生成属于你的东方五音曲</li></ol><button onClick={onClose} className='mt-4 w-full rounded-xl bg-slate-900 py-2 text-white'>开始体验</button></Modal>;
}
