export function Promotions() {
  return (
    <div className='mx-4 mb-4 bg-white p-4 rounded-2xl'>
      <div className='flex gap-3 overflow-x-auto -mx-4 px-4 scrollbar-hide'>
        <div className='flex-shrink-0 w-40 bg-[#44d1f1c1] rounded-2xl p-4 relative overflow-hidden'>
          <div className='absolute top-3 left-3'>
           <img src="/garage/services/freedom.png" alt="freedom" className='w-8 h-8 rounded-full' />
          </div>
          {/* <div className='absolute bottom-12 right-3 opacity-20'>
            <Car className='w-24 h-24 text-white' />
          </div> */}
          <div className='relative z-10 mt-auto pt-16'>
            <p className='text-white font-semibold text-sm mb-1'>КАСКО</p>
            <p className='text-white text-xs'>Кешбек до 10%</p>
          </div>
        </div>

        <div className='flex-shrink-0 w-40 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl p-4 relative overflow-hidden'>
          <div className='absolute top-3 left-3'>
           <img src="/garage/services/freedom.png" alt="freedom" className='w-8 h-8 rounded-full' />
          </div>
          {/* <div className='absolute bottom-8 right-0 opacity-30'>
            <Circle className='w-32 h-32 text-gray-800' />
          </div> */}
          <div className='relative z-10 mt-auto pt-16'>
            <p className='text-gray-800 font-semibold text-sm mb-1'>Шины</p>
            <p className='text-gray-700 text-xs'>Кешбек 5%</p>
          </div>
        </div>

        <div className='flex-shrink-0 w-40 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl p-4 relative overflow-hidden'>
          <div className='absolute top-3 left-3'>
           <img src="/garage/services/freedom.png" alt="freedom" className='w-8 h-8 rounded-full' />
          </div>
          <div className='relative z-10 mt-auto pt-16'>
            <p className='text-gray-800 font-semibold text-sm mb-1'>Шины</p>
            <p className='text-gray-700 text-xs'>Кешбек 7%</p>
          </div>
        </div>
      </div>

      <h3 className='font-semibold text-[#3A3A3C] my-4'>Акции и скидки</h3>

      <button className='w-full py-2.5 bg-[#EAECED] rounded-2xl text-[#636366] font-semibold'>
        Показать все
      </button>
    </div>
  );
}
