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
        { id: '2', text: `${searchQuery} запчасти` },
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