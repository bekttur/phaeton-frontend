import { GlobalBottomSheet } from '../ui/GlobalBottomSheet/GlobalBottomSheet';

interface ConfirmCitySheetProps {
  isOpen: boolean;
  city: string;
  onYes: () => void;
  onNo: () => void;
  //   onClose: () => void;
}

export const ConfirmCitySheet = ({
  isOpen,
  city,
  onYes,
  onNo,
  //   onClose,
}: ConfirmCitySheetProps) => {
  return (
    <GlobalBottomSheet isOpen={isOpen} onClose={() => {}} height='30vh'>
      <div className='py-4 flex flex-col gap-5'>
        <h2 className='text-xl font-semibold text-start flex gap-2'>
          Ваш город{' '}
          <span className='text-[#4EBC73] flex items-center'>
            {' '}
            <img
              className='w-5 h-5'
              src='/icon/mobile-menu/location_on.svg'
              alt='location_on'
            />
            {city}?
          </span>
        </h2>
        <p className='text-[#8E8E93] font-medium'>
          Город влияет на <span className='text-[#4EBC73]'>наличие</span> и{' '}
          <span className='text-[#4EBC73]'>сроки доставки</span>. Если вы в
          другом городе — выберите его сейчас.
        </p>

        <div className='flex flex-col gap-3'>
          <button
            onClick={onYes}
            className='w-full h-12 text-lg rounded-[10px] bg-[#4EBC73] text-white font-medium'
          >
            Да, всё верно
          </button>

          <button
            onClick={onNo}
            className='w-full h-12 text-lg rounded-[10px] bg-[#EAECED] text-[#343434] font-medium'
          >
            Нет, выбрать другой город
          </button>
        </div>
      </div>
    </GlobalBottomSheet>
  );
};
