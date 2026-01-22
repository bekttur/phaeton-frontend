import { useEffect, useState } from 'react';

import { ArrowLeft, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticlesTree } from '../../../hooks/useModel';
import VehicleBlock from './VehicleBlock';
import FilterModal from './filter/FilterModal';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';

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
    <GlobalBottomSheet isOpen={isOpen} onClose={onClose}>
      <>
        <div className='flex items-center justify-between py-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Сортировать</h2>
          <button
            className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100'
            onClick={onClose}
          >
            <X width={16} height={16} color='#8C8C8C' />
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
        <div className='absolute bottom-2 w-full px-4 pb-6'>
          <button
            onClick={onClose}
            className='w-full h-12 rounded-xl bg-[#4EBC73] text-white text-base font-semibold'
          >
            Выбрать
          </button>
        </div>
      </>
    </GlobalBottomSheet>
  );
};

const ConfirmationPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  if (!state) return null;

  const { ktype, node, vehicle, treeData } = state;

  const [currentNode, setCurrentNode] = useState(node);

  const { data, isLoading } = useArticlesTree({
    ktype,
    nodeId: currentNode.id,
  });

  const children = treeData.filter(
    (item: any) => item.parentId === currentNode.id,
  );

  const handleBack = () => {
    const parentNode = treeData.find(
      (item: any) => item.id === currentNode.parentId,
    );

    if (parentNode && parentNode.parentId !== null) {
      setCurrentNode(parentNode);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentNode.id]);

  return (
    <div className='lg:hidden w-full h-full min-h-screen pt-14'>
      <div className='bg-white px-4 py-2 flex items-center gap-3'>
        <button onClick={handleBack} className='p-2 bg-[#EAECED] rounded-lg'>
          <ArrowLeft className='w-6 h-6 text-[#8C8C8C]' />
        </button>

        <div className='flex-1 relative'>
          <Search className='w-5 h-5 text-[#AEAEB2] absolute left-3 top-1/2 -translate-y-1/2' />
          <input
            type='text'
            placeholder='Поиск запчастей'
            className='w-full pl-10 pr-4 py-2 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      <div className='bg-[#F6F6F6] px-4 flex flex-col gap-4 pt-4'>
        {vehicle && <VehicleBlock vehicle={vehicle} />}

        {children.length > 0 && (
          <div className='flex gap-2 overflow-x-auto pb-2'>
            {children.map((item: any) => (
              <button
                key={item.id}
                onClick={() => setCurrentNode(item)}
                className={`
                px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                transition-colors
                ${
                  currentNode.id === item.id
                    ? 'bg-[#4EBC73] text-white'
                    : 'bg-white text-black'
                }
              `}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setMenuOpen(true)}
            className='w-10 h-10 shrink-0 bg-[#EAECED] rounded-[10px] flex items-center justify-center'
          >
            <img
              src={`${import.meta.env.BASE_URL}icon/discover_tune2.svg`}
              width={26}
              height={26}
            />
          </button>

          <div className='flex flex-1 flex-col items-start min-w-0'>
            <span className='text-base font-semibold text-black truncate w-full'>
              {currentNode.name}
            </span>

            <span className='text-[#8C8C8C] font-semibold text-xs'>
              {/* @ts-ignore */}
              {isLoading ? 'Загрузка...' : `${data?.total ?? 0} товаров`}
            </span>
          </div>

          <div
            className='w-10 h-10 shrink-0 bg-[#EAECED] rounded-[10px] transition-colors flex items-center justify-center'
            onClick={() => setFilterOpen(true)}
          >
            <img
              src={`${import.meta.env.BASE_URL}icon/discover_tune.svg`}
              width={18}
              height={18}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 pb-4'>
          {!!data &&
            // @ts-ignore
            data.items?.map((product: any) => (
              <Link
                key={`${product.id}-${product.number}-${product.mfrId}`}
                to={`/articles-product/${product.id}`}
                state={{
                  id: product.id,
                  number: product.number,
                  mfrId: product.mfrId,
                  ktype,
                }}
                className='bg-white rounded-xl overflow-hidden shadow-sm'
              >
                <div className='relative bg-[#E9F0F3] border-b-[1px] border-b-gray-100'>
                  <div className='flex items-center justify-center bg-[#fff]'>
                    <img
                      // src={`${import.meta.env.BASE_URL}${product.image}`}
                      src={product.image}
                      alt={product.name}
                      className='w-[82%] h-40 object-contain'
                    />
                  </div>
                </div>

                <div className='p-2'>
                  <span className='text-sm font-medium text-[#3E3E3E] mb-1 line-clamp-2'>
                    {!!product && product.name} {!!product && product.brand}{' '}
                    {!!product && product.number}
                  </span>

                  <div className='flex items-center gap-1 mb-2'>
                    <span className='text-sm font-semibold'>
                      {/* {product.rating} */}4
                    </span>
                    <div className='text-xs flex text-[#4EBC73]'>★★★★★</div>
                    <span className='text-xs text-[#6F7C8E]'>
                      {/* ({product.reviews} отзыва) */}
                      (134 отзыва)
                    </span>
                  </div>

                  <p className='text-lg font-bold text-[#3E3E3E] mb-2'>
                    32 000 ₸
                  </p>

                  <div className='w-fit h-fit px-2 py-1 bg-[#E3F2F8] rounded-[10px]'>
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-sm font-semibold'>
                      18 924 ₸ c кэшбеком
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      <SortMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {filterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
    </div>
  );
};

export default ConfirmationPage;
