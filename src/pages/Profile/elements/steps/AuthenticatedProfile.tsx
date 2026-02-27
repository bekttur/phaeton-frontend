import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { IUser } from '../../../../api/services/register';

interface AuthenticatedProfileProps {
  user: IUser | null;
  onLogout: () => void;
}

function AuthenticatedProfile({ user, onLogout }: AuthenticatedProfileProps) {
  
  const formatPhone = (phone?: string) => {
    if (!phone) return '';

    const digits = phone.replace(/\D/g, '');
    const clean =
      digits.length === 11 && digits.startsWith('7') ? digits.slice(1) : digits;

    if (clean.length < 10) return `+7${clean}`;

    return `+7 (${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(
      6,
      8,
    )}-${clean.slice(8, 10)}`;
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
          <button className='w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100'>
            <div className='w-12 h-12 bg-[#DEF2E3] rounded-2xl flex items-center justify-center flex-shrink-0'>
              <img
                className='w-5 h-5'
                src='/icon/mobile-menu/person.svg'
                alt='person'
              />
            </div>
            <div className='flex-1 text-left'>
              <div className='font-semibold text-lg'>
                {user?.phone && formatPhone(String(user.phone))}
              </div>
              <div className='text-[#8C8C8C] text-base'>Настройки профиля</div>
            </div>
            <ChevronRight className='w-6 h-6 text-[#8C8C8C]' />
          </button>

          <Link
            to={'/my-orders'}
            className='w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100'
          >
            <div className='w-12 h-12 bg-[#DEF2E3] rounded-2xl flex items-center justify-center flex-shrink-0'>
              <img
                className='w-5 h-5'
                src='/profile/bucket_check.svg'
                alt='bucket_check'
              />
            </div>
            <div className='flex-1 text-left'>
              <div className='font-semibold text-lg'>Мои заказы</div>
            </div>
            <ChevronRight className='w-6 h-6 text-[#8C8C8C]' />
          </Link>

          <button className='w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors'>
            <div className='w-12 h-12 bg-[#DEF2E3] rounded-2xl flex items-center justify-center flex-shrink-0'>
              <img className='h-5' src='/profile/sell.svg' alt='bucket_check' />
            </div>
            <div className='flex-1 text-left'>
              <div className='font-semibold text-lg'>Промо-купоны</div>
            </div>
            <ChevronRight className='w-6 h-6 text-[#8C8C8C]' />
          </button>

          <div className='mt-4 p-4'>
            <button
              onClick={onLogout}
              className='w-full bg-[#F5F5F5] hover:bg-gray-50 text-[#343434] font-medium text-lg py-3 rounded-[10px] transition-colors'
            >
              Выйти из профиля
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedProfile;
