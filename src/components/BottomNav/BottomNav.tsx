const BottomNav = () => {
  return (
    <div className='grid grid-cols-5 gap-5 py-4 px-2 sticky bottom-0 bg-white border-t'>
      <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img className='w-5 h-5' src='/icon/home.svg' alt='' />
        </div>
        <p className='text-sm mt-2'>Главное</p>
      </div>

	  <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img className='w-5 h-5' src='/icon/local_mall.svg' alt='' />
        </div>
        <p className='text-sm mt-2'>Каталог</p>
      </div>

	  <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img className='w-5 h-5' src='/icon/shopping_cart.svg' alt='' />
        </div>
        <p className='text-sm mt-2'>Корзина</p>
      </div>

	  <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img className='w-5 h-5' src='/icon/favorite.svg' alt='' />
        </div>
        <p className='text-sm mt-2'>Избранное</p>
      </div>

	  <div className='w-full flex flex-col items-center'>
        <div className=' rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img className='w-5 h-5' src='/icon/car_gear.svg' alt='' />
        </div>
        <p className='text-sm mt-2'>Гараж</p>
      </div>
    </div>
  );
};

export default BottomNav;
