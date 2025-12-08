import { Search, X, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProductsPage from '../Catalog/elements/ProductsPage';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface SearchSuggestion {
  id: string;
  text: string;
}

const MobileSearch = ({
  isOpen,
  onClose,
  initialQuery = '',
}: MobileSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('Шины');

  const baseFilters = ['Шины', 'Диски', 'Колпаки на диски'];

  const extraFilters = [
    'Ниппели, вентили и секретки',
    'Диски',
    'Заглушки для дисков',
    'Колпаки на диски',
  ];

  const [showAllFilters, setShowAllFilters] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const mockSuggestions: SearchSuggestion[] = [
        { id: '1', text: searchQuery },
        {
          id: '2',
          text: `${searchQuery} смартфоны`,
        },
        { id: '3', text: `${searchQuery} смартфоны` },
        { id: '4', text: `${searchQuery} смартфоны` },
        { id: '5', text: `${searchQuery} смартфоны` },
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setShowSuggestions(false);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(true);
    setShowResults(false);
  };

  if (!isOpen) return null;

  return (
      <div className='fixed inset-0 top-14 bg-[#F6F6F6] z-50 flex flex-col'>
        <div className='bg-[#FFFFFF] px-4 py-3'>
          <div className='flex items-center gap-3'>
            {showResults && (
              <button
                onClick={() => {
                  setShowResults(false);
                  setShowSuggestions(true);
                }}
                className='flex items-center justify-center bg-[#EAECED] rounded-[10px] h-[42px] w-[42px]'
              >
                <ChevronLeft size={24} color='#8C8C8C' />
              </button>
            )}

            <div className='flex-1 relative'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder='Поиск запчастей, например «фильтр»'
                className='w-full h-[42px] pl-10 pr-10 bg-[#EAECED] rounded-[10px] text-base focus:outline-none'
                autoFocus
              />
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2'
                size={20}
                color='#AEAEB2'
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#C7C7CC] flex items-center justify-center'
                >
                  <X size={14} color='#fff' />
                </button>
              )}
            </div>

            {!showResults && (
              <button
                onClick={onClose}
                className='text-[#4EBC73] text-base font-medium'
              >
                Отмена
              </button>
            )}

            {showResults && (
              <div className='p-3 bg-[#EAECED] rounded-[10px] transition-colors'>
                <img
                  src={`${import.meta.env.BASE_URL}icon/discover_tune.svg`}
                  width={18}
                  height={18}
                />
              </div>
            )}
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className='bg-white overflow-y-auto w-[90%] h-fit mx-auto rounded-xl mt-5'>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setSearchQuery(suggestion.text);
                  handleSearch();
                }}
                className='w-full px-4 py-4 flex items-center gap-3 border-b border-[#F5F5F5] hover:bg-[#F5F5F5] text-left'
              >
                <Search size={20} color='#AEAEB2' className='flex-shrink-0' />
                <span className='text-base text-black'>{suggestion.text}</span>
              </button>
            ))}
          </div>
        )}

        {showResults && (
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
                    <h3 className='font-semibold text-white'>
                      Сократите поиск
                    </h3>
                  </div>
                  <p className='text-white text-xs leading-relaxed'>
                    Введите данные об вашем автомобиле, мы покажем лишь
                    подходящие запчасти
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

              <ProductsPage />
            </div>
          </div>
        )}
      </div>
  );
};

export default MobileSearch;
