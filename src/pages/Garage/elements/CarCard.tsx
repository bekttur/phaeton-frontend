interface CarCardProps {
  activeTab: 'status' | 'services';
}
export function CarCard({ activeTab }: CarCardProps) {
  return (
    <div
      className={`mx-4 relative ${
        activeTab === 'status' ? 'bg-[#FFFFFF33]' : ''
      } backdrop-blur-sm rounded-3xl pt-5 px-5 overflow-visible`}
    >
      {activeTab === 'status' && (
        <div className='relative z-30'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-1'>
              <img
                src='/garage/status/car-info.png'
                className='w-6 h-6'
                alt='Car Icon'
              />
              <h2 className='text-white font-semibold text-lg'>BMW X5 2024</h2>
            </div>
          </div>

          <div className='flex items-center justify-between mb-2'>
            <span className='text-[#C0CCDD] text-base'>
              до тех. обслуживания
            </span>
            <span className='text-white font-semibold text-base'>1823 км</span>
          </div>

          <div className='w-full bg-gray-600 rounded-full h-2 mb-4'>
            <div
              className='bg-[#4EBC73] h-2 rounded-full'
              style={{ width: '65%' }}
            />
          </div>
        </div>
      )}

      <div className='absolute -bottom-1 w-[109.1%] -left-5 h-[80px] z-20 pointer-events-none'>
        <svg
          viewBox='0 0 100 44'
          preserveAspectRatio='none'
          className='w-full h-full'
        >
          <rect x='0' y='19.93' width='100' height='30' fill='#F7F7F7' />

          <path d='M0,20 Q50,0 100,20 L100,20 L0,20 Z' fill='#F7F7F7' />
        </svg>
      </div>

      <div className='h-40 flex items-center justify-center relative z-30'>
        <img
          src='/images/bmw.png'
          alt='BMW X5 2024'
          className='w-full h-auto object-contain'
        />
      </div>
    </div>
  );
}
