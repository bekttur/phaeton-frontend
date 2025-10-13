const BottomNav = () => {
  return (
    <div className='grid grid-cols-4 gap-5 py-2 px-2 sticky bottom-0 bg-white border-t'>
      <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/home.svg`}
            alt=''
          />
        </div>
        <p className='text-xs mt-1'>Главное</p>
      </div>

      <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/local_mall.svg`}
            alt=''
          />
        </div>
        <p className='text-xs mt-1'>Каталог</p>
      </div>

      <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/shopping_cart.svg`}
            alt=''
          />
        </div>
        <p className='text-xs mt-1'>Корзина</p>
      </div>

      <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/car_gear.svg`}
            alt=''
          />
        </div>
        <p className='text-xs mt-1'>Гараж</p>
      </div>
    </div>
  );
};

export default BottomNav;
