import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function MobileResults() {
  const { state } = useLocation();
  const brandData = state?.brandData;

  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('Шины');

  const baseFilters = ['Шины', 'Диски', 'Колпаки на диски'];

  const extraFilters = [
    'Ниппели, вентили и секретки',
    'Диски',
    'Заглушки для дисков',
    'Колпаки на диски',
  ];

  const [showAllFilters, setShowAllFilters] = useState(false);

  if (!brandData || brandData.Items.length === 0) {
    return <div>Нет данных</div>;
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className='lg:hidden w-full h-full bg-gray-50 relative top-14'>
      <div>
        <div className='flex-1 bg-white overflow-y-auto'>
          <div className='px-4 py-3'>
            {/* Первая строка — базовые фильтры */}
            <div className='flex items-center gap-2 pb-2'>
              {baseFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-[10px] text-sm font-medium whitespace-nowrap transition ${
                    selectedFilter === filter
                      ? 'bg-[#4EBC73] text-white border border-[#4EBC73]'
                      : 'bg-[#FDFDFD] text-black border border-[#E9EBEE]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Кнопка "Еще 6" или "Скрыть" */}
            {!showAllFilters ? (
              <button
                onClick={() => setShowAllFilters(true)}
                className='mt-2 px-4 py-1.5 bg-[#FDFDFD] border border-[#E9EBEE] rounded-[10px] text-sm font-medium flex items-center gap-2'
              >
                Еще 6
                <ChevronDown width={16} height={16} />
              </button>
            ) : (
              <>
                {/* Вторая строка — доп. фильтры, появляются под первыми */}
                <div className='flex flex-wrap items-center gap-2'>
                  {extraFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-[10px] text-sm font-medium whitespace-nowrap transition ${
                        selectedFilter === filter
                          ? 'bg-[#4EBC73] text-white border border-[#4EBC73]'
                          : 'bg-[#FDFDFD] text-black border border-[#E9EBEE]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowAllFilters(false)}
                  className='mt-3 px-4 py-1.5 bg-[#FDFDFD] border border-[#E9EBEE] rounded-[10px] text-sm font-medium flex items-center gap-2'
                >
                  Скрыть
                  <ChevronUp width={16} height={16} />
                </button>
              </>
            )}
          </div>

          <div className='bg-[#4EBCB6] rounded-2xl p-4 mb-4 mx-4'>
            <div className='flex flex-row-reverse items-start gap-3'>
              <img
                src={`${import.meta.env.BASE_URL}images/911.png`}
                alt='Car top view'
                className='w-12 h-full rounded-lg object-cover'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <h3 className='font-semibold text-white'>Сократите поиск</h3>
                </div>
                <p className='text-white text-xs leading-relaxed'>
                  Введите данные об вашем автомобиле, мы покажем лишь подходящие
                  запчасти
                </p>
              </div>
            </div>
          </div>

          <div className='px-4'>
            <div className='flex items-center justify-start gap-3.5 my-5'>
              <button className='h-12 w-12 bg-[#EAECED] rounded-[10px] flex items-center justify-center'>
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }icon/format_line_spacing.svg`}
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
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3 pb-4'>
          {!!brandData.Items &&
            brandData.Items.map((product: any) => (
              <Link
                to={'/product/1'}
                key={product.ItemId}
                className='bg-white rounded-xl overflow-hidden shadow-sm'
              >
                <div className='relative bg-[#E9F0F3]'>
                  {/* сердечко */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product.ItemId);
                    }}
                    className={`absolute top-2 right-2 p-1 ${
                      favorites.includes(product.ItemId)
                        ? 'bg-[#FFFFFF]'
                        : 'bg-[#D8D8D899]'
                    }  rounded-lg`}
                  >
                    <Heart
                      className={`w-5 h-5 transition ${
                        favorites.includes(product.ItemId)
                          ? 'text-[#5FCD84] fill-[#5FCD84]'
                          : 'text-[#83838399]'
                      }`}
                    />
                  </button>

                  {/* {product.isFeatured && (
                  <span
                    className={`absolute ${
                      product.discount ? 'top-10' : 'top-2'
                    } left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded`}
                  >
                    Товар месяца
                  </span>
                )} */}

                  <div className='flex items-center justify-center'>
                    <img
                      // src={`${import.meta.env.BASE_URL}${product.image}`}
                      src={`${
                        import.meta.env.BASE_URL
                      }product/first-product.png`}
                      alt={product.Name}
                      className='w-[70%] h-40 object-contain'
                    />
                  </div>

                  {/* {product.installment && (
                  <span className='absolute bottom-2 left-2 px-2 py-0.5 bg-[#4EBC73] text-white text-xs font-medium rounded-lg'>
                    -10%
                  </span>
                )} */}
                </div>

                <div className='p-2'>
                  <span className='text-sm font-medium text-[#3E3E3E] mb-1'>
                    {product.Name}
                  </span>
                  {/* <h3 className='text-sm font-medium text-[#3E3E3E] mb-1'>
                  {product.description}
                </h3> */}

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
                    {product.Price.toLocaleString('ru-KZ')} ₸
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MobileResults;
