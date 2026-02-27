import { GlobalBottomSheet } from '../ui/GlobalBottomSheet/GlobalBottomSheet';

interface CookieConsentSheetProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const CookieConsentSheet = ({
  isOpen,
  onAccept,
}: CookieConsentSheetProps) => {
  return (
    <GlobalBottomSheet isOpen={isOpen} onClose={() => {}} height='28vh'>
      <div className='py-4 flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <img src='/icon/mobile-menu/error.svg' alt='error' />
          <h2 className='text-xl font-semibold'>Cookies файлы</h2>
        </div>

        <p className='text-[#8E8E93] font-medium'>
          Продолжая использовать данный веб-сайт, вы даете согласие на
          использование нами{' '}
          <span className='text-[#52A5E0]'>файлов cookies</span> в целях
          повышения удобства использования сайта.
        </p>

        <button
          onClick={onAccept}
          className='w-full h-12 text-lg rounded-[10px] bg-[#4EBC73] text-white font-medium'
        >
          Хорошо
        </button>
      </div>
    </GlobalBottomSheet>
  );
};
