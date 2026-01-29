import { MapPin } from 'lucide-react';

export function Operations() {
  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='font-semibold text-gray-900'>Операции</h3>
        <button className='text-green-500 text-sm font-medium'>Все</button>
      </div>

      <div className='mb-4 bg-[#F7F7F7] rounded-[14px] p-3'>
        <div className='w-full rounded-full h-2 flex gap-0.5 overflow-hidden'>
          <div className='bg-[#7EC7F1] h-2 rounded-lg' style={{ width: '40%' }}></div>
          <div className='bg-[#F1747B] h-2 rounded-lg' style={{ width: '30%' }}></div>
          <div className='bg-[#FAD26B] h-2 rounded-lg' style={{ width: '15%' }}></div>
          <div className='bg-[#6BC78A] h-2 rounded-lg' style={{ width: '15%' }}></div>
        </div>
        <div className='flex items-start justify-between mt-2'>
          <span className='text-sm text-gray-600'>Траты за месяц</span>
          <span className='text-lg font-bold text-gray-900'>28 900 ₸</span>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0'>
            <MapPin className='w-5 h-5 text-green-600' />
          </div>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-900'>
              Алматы паркинг - оплата...
            </p>
            <p className='text-xs text-gray-500'>Парковка</p>
          </div>
          <div className='text-right'>
            <p className='text-sm font-semibold text-gray-900'>-900,00 ₸</p>
            <p className='text-xs text-gray-500'>Deposit Card</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0'>
            <div className='text-blue-600 font-bold text-xs'>QAJ</div>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-900'>QazAvtoJol</p>
            <p className='text-xs text-gray-500'>Платные дороги</p>
          </div>
          <div className='text-right'>
            <p className='text-sm font-semibold text-gray-900'>-1 200,00 ₸</p>
            <p className='text-xs text-gray-500'>Deposit Card</p>
          </div>
        </div>
      </div>
    </div>
  );
}
