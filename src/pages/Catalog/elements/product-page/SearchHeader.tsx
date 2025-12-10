import { ArrowLeft, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SearchHeader() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromL = params.get('from') || '/catalog'; // fallback на /catalog

  return (
    <div className='bg-white p-4 flex items-center gap-3'>
      <Link
        to={fromL}
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
    </div>
  );
}
