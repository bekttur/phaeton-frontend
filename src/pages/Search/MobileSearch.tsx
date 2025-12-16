import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchModal } from '../../context/SearchModalContext';

const MobileSearch = ({ initialQuery = '' }) => {
  const navigate = useNavigate();
  const { isOpen, close } = useSearchModal();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
        // @ts-ignore
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (query?: string) => {
    const q = query ?? searchQuery;

    navigate(`/search?article=${q}`);
    close();
  };

  useEffect(() => {
    if (searchQuery.length) {
      setSuggestions([
        // @ts-ignore
        { id: '1', text: searchQuery },
        // @ts-ignore
        { id: '2', text: `${searchQuery} смартфоны` },
      ]);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 top-14 bg-[#F6F6F6] z-50 flex flex-col'>
      <div className='bg-white px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='flex-1 relative'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='Поиск запчастей'
              className='w-full h-[42px] pl-10 pr-10 bg-[#EAECED] rounded-[10px]'
              autoFocus
            />
            <Search color='#AEAEB2' className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#AEAEB2] p-1'
              >
                <X className='w-3 h-3' color='white' />
              </button>
            )}
          </div>

          <button onClick={close} className='text-[#4EBC73] font-medium'>
            Отмена
          </button>
        </div>
      </div>

      {showSuggestions && (
        <div className='bg-white overflow-y-auto w-[90%] mx-auto mt-5 rounded-xl'>
          {suggestions.map((s) => (
            <button
              // @ts-ignore
              key={s.id}
              // @ts-ignore
              onClick={() => handleSearch(s.text)}
              className='w-full px-4 py-4 flex items-center gap-3 border-b'
            >
              <Search color='#AEAEB2' className='w-5 h-5' />
              {/* @ts-ignore */}
              {s.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileSearch;

// <div className='flex-1 bg-white overflow-y-auto'>
//   <div className='px-4 py-3'>
//     {/* Первая строка — базовые фильтры */}
//     <div className='flex items-center gap-2 pb-2'>
//       {baseFilters.map((filter) => (
//         <button
//           key={filter}
//           onClick={() => setSelectedFilter(filter)}
//           className={`px-4 py-2 rounded-[10px] text-sm font-medium whitespace-nowrap transition ${
//             selectedFilter === filter
//               ? 'bg-[#4EBC73] text-white border border-[#4EBC73]'
//               : 'bg-[#FDFDFD] text-black border border-[#E9EBEE]'
//           }`}
//         >
//           {filter}
//         </button>
//       ))}
//     </div>

//     {/* Кнопка "Еще 6" или "Скрыть" */}
//     {!showAllFilters ? (
//       <button
//         onClick={() => setShowAllFilters(true)}
//         className='mt-2 px-4 py-1.5 bg-[#FDFDFD] border border-[#E9EBEE] rounded-[10px] text-sm font-medium flex items-center gap-2'
//       >
//         Еще 6
//         <ChevronDown width={16} height={16} />
//       </button>
//     ) : (
//       <>
//         {/* Вторая строка — доп. фильтры, появляются под первыми */}
//         <div className='flex flex-wrap items-center gap-2'>
//           {extraFilters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setSelectedFilter(filter)}
//               className={`px-4 py-2 rounded-[10px] text-sm font-medium whitespace-nowrap transition ${
//                 selectedFilter === filter
//                   ? 'bg-[#4EBC73] text-white border border-[#4EBC73]'
//                   : 'bg-[#FDFDFD] text-black border border-[#E9EBEE]'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => setShowAllFilters(false)}
//           className='mt-3 px-4 py-1.5 bg-[#FDFDFD] border border-[#E9EBEE] rounded-[10px] text-sm font-medium flex items-center gap-2'
//         >
//           Скрыть
//           <ChevronUp width={16} height={16} />
//         </button>
//       </>
//     )}
//   </div>

//   <div className='bg-[#4EBCB6] rounded-2xl p-4 mb-4 mx-4'>
//     <div className='flex flex-row-reverse items-start gap-3'>
//       <img
//         src={`${import.meta.env.BASE_URL}images/911.png`}
//         alt='Car top view'
//         className='w-12 h-full rounded-lg object-cover'
//       />
//       <div className='flex-1'>
//         <div className='flex items-center gap-2 mb-1'>
//           <h3 className='font-semibold text-white'>Сократите поиск</h3>
//         </div>
//         <p className='text-white text-xs leading-relaxed'>
//           Введите данные об вашем автомобиле, мы покажем лишь подходящие
//           запчасти
//         </p>
//       </div>
//     </div>
//   </div>

//   <div className='px-4'>
//     <div className='flex items-center justify-start gap-3.5 my-5'>
//       <button className='h-12 w-12 bg-[#EAECED] rounded-[10px] flex items-center justify-center'>
//         <img
//           src={`${
//             import.meta.env.BASE_URL
//           }icon/format_line_spacing.svg`}
//           width={24}
//           height={24}
//         />
//       </button>

//       <div className='flex flex-col items-start'>
//         <span className='text-base font-semibold text-black'>
//           Колпаки на диски
//         </span>
//         <span className='text-[#8C8C8C] font-semibold text-xs'>
//           224 товара
//         </span>
//       </div>
//     </div>

//     <ProductsPage items={data && data.Items} />
//   </div>
// </div>
