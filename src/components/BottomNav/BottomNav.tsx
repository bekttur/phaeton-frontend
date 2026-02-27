import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation('menu');

  return (
    <div
      className={`grid lg:hidden grid-cols-5 gap-1 py-2 px-7 fixed w-full bottom-0 bg-white border-t ${
        pathname.startsWith('/product/') || pathname.startsWith('/search')
          ? 'hidden'
          : 'grid'
      }`}
    >
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
        <p
          className={`text-xs font-medium mt-1 ${pathname === '/' ? 'text-[#000]' : 'text-[#636366]'} `}
        >
          {t('home')}
        </p>
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
        <p
          className={`text-xs font-medium mt-1 ${pathname.startsWith('/catalog') ? 'text-[#000]' : 'text-[#636366]'} `}
        >
          Каталог
        </p>
      </Link>

      {/* Корзина */}
      <Link to='/basket' className='w-full flex flex-col items-center'>
        <div
          className={`rounded-md w-10 h-10 flex items-center justify-center ${
            pathname.startsWith('/basket') ? 'bg-[#DEF2E3]' : 'bg-[#F6F6F6]'
          }`}
        >
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/shopping_cart.svg`}
            alt=''
          />
        </div>
        <p className='text-xs font-medium mt-1 text-[#636366]'>Корзина</p>
      </Link>

      {/* Гараж */}
      <Link to={'/garage'} className='w-full flex flex-col items-center'>
        <div
          className={`rounded-md w-10 h-10 flex items-center justify-center ${
            pathname.startsWith('/garage') ? 'bg-[#DEF2E3]' : 'bg-[#F6F6F6]'
          }`}
        >
          <img
            className='w-5 h-5'
            src={`${import.meta.env.BASE_URL}icon/car_gear.svg`}
            alt=''
          />
        </div>
        <p
          className={`text-xs font-medium mt-1 ${pathname.startsWith('/garage') ? 'text-[#000]' : 'text-[#636366]'} `}
        >
          Гараж
        </p>
      </Link>

      {/* Ассистент */}
      <div className='w-full flex flex-col items-center'>
        <div className='rounded-md bg-[#F6F6F6] w-10 h-10 flex items-center justify-center'>
          <img
            className='w-6 h-6'
            src={`${import.meta.env.BASE_URL}icon/assistent.svg`}
            alt=''
          />
        </div>
        <p
          className={`text-xs font-medium mt-1 ${pathname.startsWith('/assistent') ? 'text-[#000]' : 'text-[#636366]'} `}
        >
          Ассистент
        </p>
      </div>
    </div>
  );
};

export default BottomNav;
