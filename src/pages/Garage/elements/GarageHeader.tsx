import { ArrowLeft } from 'lucide-react';

export function GarageHeader() {
  return (
    <div className='flex items-center justify-between px-4 pt-6 pb-4'>
      <button className='p-2'>
        <ArrowLeft className='w-6 h-6 text-white' />
      </button>
      <button className='bg-[#FFFFFF26] backdrop-blur-sm px-4 py-2 rounded-[10px] font-semibold text-white text-sm'>
        Управление гаражом
      </button>
    </div>
  );
}
