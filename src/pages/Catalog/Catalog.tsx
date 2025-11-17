import { Link, useLocation } from 'react-router-dom';
import { catalog_data } from './elements/catalog.data';
import QuickSearchTabs from './elements/QuickSearchTabs';
import { Check } from 'lucide-react';

const Catalog = () => {
  const { pathname } = useLocation();

  // если мы на главной — показываем первые 6
  const showAll = pathname === '/catalog';
  const items = showAll ? catalog_data : catalog_data.slice(0, 6);

  return (
    <div style={{ paddingTop: showAll ? '70px' : '0px' }}>
      {!!showAll && <QuickSearchTabs />}

      {!!showAll && (
        <div className='bg-[#4EBC73] rounded-2xl p-4 mb-4 shadow-md mx-2'>
          <div className='flex flex-row-reverse items-start gap-3'>
            <img
              src={`${import.meta.env.BASE_URL}images/911.png`}
              alt='Car top view'
              className='w-12 h-full rounded-lg object-cover'
            />
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='bg-white rounded-full p-1'>
                  <Check className='w-3 h-3 text-emerald-500' />
                </div>
                <h3 className='font-semibold text-white'>Audi RS 6 2015</h3>
              </div>
              <p className='text-white text-xs leading-relaxed'>
                Мы определили вашу комплектацию — теперь показываем только
                совместимые товары
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='px-2 bg-[#F6F6F6] mb-3'>
        <div className='grid grid-cols-3 gap-[13px]'>
          {items.map((item) => (
            <Link
              to={`/${item.id}`}
              key={item.id}
              className='aspect-square bg-[#FDFDFD] border border-[#E9EBEE] rounded-md px-2 py-1'
            >
              <div
                className='w-full h-full bg-contain bg-bottom bg-no-repeat rounded-md flex items-start'
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}${
                    item.img
                  })`,
                }}
              >
                <span className='text-sm font-medium text-[#56625A]'>
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* кнопка "Открыть каталог" показывается только на главной */}
        {pathname === '/' && (
          <div className='mt-4 flex justify-center'>
            <Link
              to='/catalog'
              className='w-full text-center py-3 bg-[#EAECED] text-[#636366] rounded-xl text-base font-semibold'
            >
              Открыть каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
