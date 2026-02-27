interface LoginPromptProps {
  onLoginClick?: () => void;
}

function LoginPrompt({ onLoginClick }: LoginPromptProps) {
  return (
    <div className='min-h-screen bg-[#F6F6F6] px-4 py-6'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-2xl p-6 shadow-sm'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center'>
              <img src='/icon/mobile-menu/person.svg' alt='person' />
            </div>
          </div>

          <h1 className='text-2xl text-[#0F0F0F] font-semibold text-center mb-1'>
            Войдите в профиль
          </h1>

          <p className='text-[#636366] text-center mb-5'>
            Сделайте процесс покупок удобнее
          </p>

		  <div className='w-full h-[1px] bg-[#EDEDED] mb-5' />

          <div className='space-y-5 mb-10'>
            <div className='flex flex-col items-start'>
              <div className='flex items-start gap-2'>
                <img
                  className='w-7 h-7'
                  src='/garage/status/car-info.png'
                  alt='car-info'
                />
                <h3 className='font-semibold text-lg mb-1'>
                  Сохраняйте свой автомобиль
                </h3>
              </div>
              <p className='text-[#636366] text-sm'>
                Умный поиск запчастей именно под вашу машину
              </p>
            </div>

            <div className='flex flex-col items-start'>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5'
                  src='/profile/bucket_check.svg'
                  alt='bucket_check'
                />
                <h3 className='font-semibold text-lg mb-1'>История заказов</h3>
              </div>
              <p className='text-[#636366] text-sm'>
                Все покупки и статусы в одном месте
              </p>
            </div>

            <div className='flex flex-col items-start'>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5'
                  src='/profile/shopping_cart.svg'
                  alt='bucket_check'
                />
                <h3 className='font-semibold text-lg mb-1'>
                  Быстрое оформление
                </h3>
              </div>
              <p className='text-[#636366] text-sm'>
                Данные доставки сохраняются автоматически
              </p>
            </div>

            <div className='flex flex-col items-start'>
              <div className='flex items-center gap-2'>
                <img
                  className='h-5'
                  src='/profile/sell.svg'
                  alt='bucket_check'
                />
                <h3 className='font-semibold text-lg mb-1'>
                  Персональные предложения
                </h3>
              </div>
              <p className='text-[#636366] text-sm'>
                Индивидуальные цены, акции и промокоды
              </p>
            </div>
          </div>

          <button
            onClick={onLoginClick}
            className='w-full bg-[#4EBC73] hover:bg-green-700 text-white font-semibold py-3 rounded-[10px] transition-colors'
          >
            Войти в профиль
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
