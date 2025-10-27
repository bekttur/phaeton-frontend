import { useState } from 'react';
import {
  Search,
  ArrowRight,
} from 'lucide-react';

const DesktopHeader = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'vin' | 'model'>(
    'catalog'
  );

  return (
    <div className='hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white border-b'>
      {/* Верхняя строка */}
      <div className='border-b border-gray-200 bg-[#F6F6F6]'>
        <div className='mx-auto px-32 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <button className='flex items-center gap-2 text-sm bg-[#EDEDED] rounded-md text-[#4A5E46] hover:text-[#62C382] font-semibold transition py-2 px-3'>
              <img
                src={`${
                  import.meta.env.BASE_URL
                }icon/mobile-menu/location_on.svg`}
                width={16}
                height={16}
              />
              <span>г. Алматы</span>
            </button>

            <button className='w-[70px] relative flex items-center gap-2 text-sm bg-[#EDEDED] rounded-md text-[#4A5E46] hover:text-[#62C382] font-semibold transition py-2 px-3'>
              <span>Рус</span>
              <img
                src={`${import.meta.env.BASE_URL}icon/chevron-down.svg`}
                alt='chevron'
                className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3'
              />
            </button>
          </div>

          <div className='flex items-center gap-4'>
            <button className='flex items-center gap-2 px-4 py-2 bg-[#DEF2E3] text-sm text-[#4A5E46] font-semibold hover:bg-gray-50 rounded-md transition'>
              <img
                src={`${import.meta.env.BASE_URL}icon/mobile-menu/favorite.svg`}
                width={18}
                height={18}
              />
              <span>Избранное</span>
            </button>

            <button className='flex items-center gap-2 px-4 py-2 bg-[#DEF2E3] text-sm text-[#4A5E46] font-semibold hover:bg-gray-50 rounded-md transition'>
              <img
                src={`${import.meta.env.BASE_URL}icon/shopping_cart.svg`}
                width={18}
                height={18}
              />
              <span>Корзина</span>
            </button>

            <button className='px-6 py-2 bg-[#62C382] text-white text-sm font-medium rounded-md hover:bg-[#4EBC73] transition'>
              Войти
            </button>
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className='mx-auto px-32 py-4'>
        <div className='flex items-center gap-8'>
          {/* Логотип */}
          <div className='flex-shrink-0'>
            <span className='text-3xl font-semibold text-[#62C382]'>
              Phaeton
            </span>
          </div>

          {/* Выпадающий список */}
          <div className='flex-shrink-0'>
            <button className='flex items-center gap-2 px-4 py-2 text-md font-semibold text-[#315448] hover:bg-gray-50 rounded-md transition relative'>
              <span>Каталог запчастей</span>
               <img
                src={`${import.meta.env.BASE_URL}icon/chevron-down.svg`}
                alt='chevron'
                className='pointer-events-none relative right-0 w-3 h-3'
              />
            </button>
          </div>

          {/* Поиск */}
          <div className='flex-2 w-full flex items-center gap-4 bg-[#F3F3F1] py-1 px-1.5 rounded-md'>
            <div className='relative flex items-center gap-2'>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 text-sm font-medium rounded-md  transition ${
                  activeTab === 'catalog'
                    ? 'bg-[#62C382] text-white'
                    : 'bg-[#F9F9F7] border border-[#DDDDDDB8] text-[#6E6E6F] hover:bg-gray-200'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveTab('vin')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === 'vin'
                    ? 'bg-[#62C382] text-white'
                    : 'bg-[#F9F9F7] border border-[#DDDDDDB8] text-[#6E6E6F] hover:bg-gray-200'
                }`}
              >
                VIN
              </button>
              <button
                onClick={() => setActiveTab('model')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  activeTab === 'model'
                    ? 'bg-[#62C382] text-white'
                    : 'bg-[#F9F9F7] border border-[#DDDDDDB8] text-[#6E6E6F] hover:bg-gray-200'
                }`}
              >
                Модель
              </button>
            </div>
            <div className='relative flex-1 w-full'>
              <Search
                className='absolute left-4 top-1/2 -translate-y-1/2'
                width={18}
                height={18}
                color='#62C382'
              />
              <input
                type='text'
                placeholder={
                  activeTab === 'catalog'
                    ? 'Поиск по каталогу, например «масляный фильтр»'
                    : activeTab === 'vin'
                    ? 'Введите ваш VIN'
                    : 'Выберите марку и модель'
                }
                className='w-full h-10 pl-12 pr-14 border border-none rounded-lg text-sm focus:outline-none focus:border-none focus:ring-0 focus:ring-transparent bg-[#F3F3F1]'
              />
              <button className='absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#F9F9F7] text-white rounded-md border border-[#DDDDDDB8] hover:bg-[#4EBC73] transition'>
                <ArrowRight width={18} height={18} color='#6E6E6F' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
