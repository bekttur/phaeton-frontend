import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className='grid lg:hidden grid-cols-4 gap-5 py-2 px-2 sticky bottom-0 bg-white border-t'>
      {/* Главное */}
      <Link to='/' className='w-full flex flex-col items-center'>
        <div
          className={`rounded-md w-10 h-10 flex items-center justify-center ${
            pathname === '/' ? 'bg-[#DEF2E3]' : 'bg-[#F6F6F6]'
          }`}
        >
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/home.svg`}
            alt=''
          />
        </div>
        <p className='text-xs font-semibold mt-1'>Главное</p>
      </Link>

      {/* Каталог */}
      <Link to='/catalog' className='w-full flex flex-col items-center'>
        <div
          className={`rounded-md w-10 h-10 flex items-center justify-center ${
            pathname.startsWith('/catalog') ? 'bg-[#DEF2E3]' : 'bg-[#F6F6F6]'
          }`}
        >
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/local_mall.svg`}
            alt=''
          />
        </div>
        <p className='text-xs font-semibold mt-1'>Каталог</p>
      </Link>

      {/* Корзина */}
      <div className='w-full flex flex-col items-center'>
        <div className='rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/shopping_cart.svg`}
            alt=''
          />
        </div>
        <p className='text-xs font-semibold mt-1'>Корзина</p>
      </div>

      {/* Гараж */}
      <div className='w-full flex flex-col items-center'>
        <div className='rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/car_gear.svg`}
            alt=''
          />
        </div>
        <p className='text-xs font-semibold mt-1'>Гараж</p>
      </div>
    </div>
  );
};

export default BottomNav;
