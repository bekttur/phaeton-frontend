export function CarEvaluation() {
  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <h3 className='font-semibold text-[#3A3A3C] mb-3 text-lg'>Оценка авто</h3>

      <div className='bg-white mb-3'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-[#9C9C9C33] rounded-xl flex items-center justify-center'>
            <img className='w-8 h-8' src='/garage/status/bmw.png' alt='bmw' />
          </div>
          <div className='flex-1'>
            <p className='text-lg font-medium text-[#3A3A3C]'>
              −32 230 000,00 ₸
            </p>
            <p className='text-base text-[#3A3A3C]'>Цена BMW X5 2024</p>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-tr from-[#4EB5BC] to-[#19B619] rounded-2xl flex items-center justify-between relative overflow-hidden'>
        <div className='w-full bg-[url(/garage/status/cred.png)] bg-no-repeat bg-contain bg-right h-full p-4'>
          <h4 className='text-white font-semibold mb-1'>Кредит под залог</h4>
          <h4 className='text-white font-semibold mb-1'>авто онлайн</h4>
        </div>
      </div>
    </div>
  );
}
