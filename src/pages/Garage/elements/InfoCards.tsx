
export function InfoCards() {
  return (
    <div className='grid grid-cols-3 gap-3 px-4 mb-4'>
      <div
        className='
        rounded-2xl p-4 h-24
        flex flex-col gap-1 justify-between
        text-white
        bg-[radial-gradient(circle_at_-3%_-30%,#FFFFFF33_75%,#FFFFFF33_37%,#FF3347_120%)]
      '
      >
        <img className='w-6 h-6' src='/garage/status/fines.png' alt='fines' />

        <div className='text-sm font-medium'>
          2 новых
          <br />
          штрафа
        </div>
      </div>

      <div
        className='
        rounded-2xl p-4 h-24
        flex flex-col gap-1 justify-between
        text-white
        bg-[radial-gradient(circle_at_-3%_-30%,#FFFFFF33_75%,#FFFFFF33_37%,#FF9500_120%)]
      '
      >
        {/* <Shield className='w-6 h-6 text-white' /> */}
        <img className='w-6 h-6' src='/garage/status/secure.png' alt='secure' />
        <div className='text-white text-sm font-medium'>
          Страховка
          <br />
          истекает
        </div>
      </div>
      <div
        className='
        rounded-2xl p-4 h-24
        flex flex-col gap-1 justify-between
        text-white
        bg-[#FFFFFF33]
      '
      >
        <div className='flex items-center justify-between'>
          <img
            className='w-6 h-6'
            src='/garage/status/parking.svg'
            alt='secure'
          />
          <div className='bg-[#FFFFFF33] p-1 rounded-[8px] text-center text-[10px]'>
            <span>№2018</span>
          </div>
        </div>

        <div className='text-white text-sm font-medium'>
          Парковка
          <br />
          рядом
        </div>
      </div>
    </div>
  );
}
