import type { ReactNode } from 'react';
export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4' onClick={onClose}><div className='w-full max-w-sm rounded-2xl bg-white p-4' onClick={(e)=>e.stopPropagation()}>{children}</div></div>;
}
