import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import ProductsPage from './ProductsPage';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Radio = ({ active }: { active: boolean }) => (
  <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      active ? 'border-[#4EBC73]' : 'border-gray-400'
    }`}
  >
    {active && <div className='w-3 h-3 rounded-full bg-[#4EBC73]' />}
  </div>
);

const SortMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const items = [
    'Популярные',
    'Новинки',
    'Сначала дешевые',
    'Сначала дорогие',
    'Высоки рейтинг',
  ];

  const [selected, setSelected] = useState('Все товары');

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 bg-black/30 z-[60]' onClick={onClose} />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl z-[70] min-h-[70vh] transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className='px-4 py-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-gray-900'>Сортировать</h2>
            <button
              onClick={onClose}
              className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition'
            >
              <X width={24} height={24} color='#666' />
            </button>
          </div>

          <div className='space-y-1 bg-white rounded-[10px] p-4'>
            {items.map((name) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className='w-full flex items-center justify-between px-2 py-3 rounded-xl hover:bg-gray-50 transition'
              >
                <span className='text-base text-gray-900'>{name}</span>

                <Radio active={selected === name} />
              </button>
            ))}
          </div>
        </div>
        <div className='absolute bottom-2 w-full px-4 pb-6'>
          <button
            onClick={onClose}
            className='w-full h-12 rounded-xl bg-[#4EBC73] text-white text-base font-semibold'
          >
            Выбрать
          </button>
        </div>
      </div>
    </>
  );
};

const ConfirmationPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='lg:hidden w-full h-full bg-gray-50 px-4 pt-14 flex flex-col gap-4'>
      <div className='bg-white p-2 flex items-center gap-3'>
        <Link
          to={'/catalog'}
          className='p-2 bg-[#EAECED] rounded-lg transition-colors'
        >
          <ArrowLeft className='w-6 h-6 text-[#8C8C8C]' />
        </Link>
        <div className='flex-1 relative'>
          <Search className='w-5 h-5 text-[#AEAEB2] absolute left-3 top-1/2 -translate-y-1/2' />
          <input
            type='text'
            placeholder='Поиск запчастей'
            className='w-full pl-10 pr-4 py-2 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='p-3 bg-[#EAECED] rounded-lg transition-colors'>
          <img
            src={`${import.meta.env.BASE_URL}icon/discover_tune.svg`}
            width={18}
            height={18}
          />
        </div>
      </div>
      {/* GREEN BLOCK */}
      <div className='bg-[#4EBC73] rounded-2xl p-4 shadow-md'>
        <div className='flex flex-row-reverse items-start gap-3'>
          <img
            src={`${import.meta.env.BASE_URL}images/911.png`}
            alt='Car top view'
            className='w-12 h-full rounded-lg object-cover'
          />
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <img
                src={`${import.meta.env.BASE_URL}icon/check_circle_white.svg`}
                width={22}
                height={22}
              />
              <h3 className='font-semibold text-white'>Audi RS 6 2015</h3>
            </div>
            <p className='text-white text-xs leading-relaxed'>
              Мы определили вашу комплектацию — теперь показываем только
              совместимые товары
            </p>
          </div>
        </div>
      </div>

      {/* BUTTON THAT OPENS MENU */}
      <div className='flex items-center justify-start gap-3.5'>
        <button
          onClick={() => setMenuOpen(true)}
          className='h-12 w-12 bg-[#EAECED] rounded-[10px] flex items-center justify-center'
        >
          <img
            src={`${import.meta.env.BASE_URL}icon/format_line_spacing.svg`}
            width={24}
            height={24}
          />
        </button>

        <div className='flex flex-col items-start'>
          <span className='text-base font-semibold text-black'>
            Колпаки на диски
          </span>
          <span className='text-[#8C8C8C] font-semibold text-xs'>
            224 товара
          </span>
        </div>
      </div>

      <ProductsPage />

      {/* MOBILE MENU */}
      <SortMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default ConfirmationPage;
