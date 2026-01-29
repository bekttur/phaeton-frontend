import { ChevronRight } from 'lucide-react';

export function Insurance() {
  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <h3 className='text-lg font-semibold text-[#3A3A3C] mb-4'>Страховки</h3>

      <div className='space-y-3'>
        <button className='w-full flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors'>
          <div className='w-11 h-11 bg-[#4EBC7333] rounded-2xl flex items-center justify-center flex-shrink-0'>
            <img
              src='/garage/services/car.png'
              className='w-7 h-7'
              alt=''
            />
          </div>
          <div className='flex-1 text-left'>
            <p className='text-base font-medium text-[#3A3A3C]'>ОГПО ВТС</p>
            <p className='text-sm text-gray-500'>
              Действует до 12 декабря 2025
            </p>
          </div>
          <ChevronRight className='w-5 h-5 text-gray-400' />
        </button>

        <div className='w-full h-[1px] bg-[#EAECED]' />

        <button className='w-full flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors'>
          <div className='w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <img
              src='/garage/services/car-gray.png'
              className='w-7 h-7'
              alt=''
            />
          </div>
          <div className='flex-1 text-left'>
            <p className='text-base font-medium text-[#3A3A3C]'>КАСКО Classic</p>
            <p className='text-sm text-gray-500'>
              Действует до 11 декабря 2025
            </p>
          </div>
          <ChevronRight className='w-5 h-5 text-gray-400' />
        </button>
      </div>
    </div>
  );
}
