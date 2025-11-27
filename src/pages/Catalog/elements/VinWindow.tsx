import { X } from 'lucide-react';
import Button from '../../../components/ui/Button/Button';
import { useViewportHeight } from '../../../hooks/useViewportHeight'; // добавь свой путь
import { useNavigate } from 'react-router-dom';

interface VinWindowProps {
  handleCloseVin: () => void;
}

const VinWindow = ({ handleCloseVin }: VinWindowProps) => {
  const viewportHeight = useViewportHeight();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/confirmation');
  };

  return (
    <div
      className='lg:hidden relative w-full max-w-lg bg-white overflow-hidden flex flex-col'
      style={{ height: `${viewportHeight}px` }} // ← динамическая высота
    >
      {/* Кнопка закрытия */}
      <button
        onClick={handleCloseVin}
        className='absolute top-6 right-6 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors'
      >
        <X className='w-4 h-4 text-gray-700' />
      </button>

      {/* Контент с прокруткой */}
      <div className='flex-1 overflow-y-auto'>
        <div
          className='relative h-[300px] bg-gradient-to-b from-[#4EBC73] to-[#65DDC0] flex items-end justify-center overflow-hidden pb-8'
          style={{ borderRadius: '0 0 140px 140px' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/car.png`}
            alt='Car'
            className='relative z-10 w-4/5 h-auto object-contain drop-shadow-2xl'
          />
        </div>

        <div className='relative'>
          <div className='w-[50px] h-[50px] flex items-center justify-center absolute left-1/2 bottom-[-25px] bg-white rounded-lg p-2 shadow-lg z-100 border border-[#E8E8E8] transform -translate-x-1/2'>
            <img
              className='w-8 h-8'
              src={`${import.meta.env.BASE_URL}icon/car_gear.svg`}
              alt=''
            />
          </div>
        </div>

        <div className='px-8 pt-10 pb-8'>
          <h1 className='text-2xl font-bold text-[#4EBC73] text-center mb-2'>
            Добавьте свой автомобиль
          </h1>
          <p className='text-center text-[#13362A] font-medium mb-4'>
            сократите поиск до 10 секунд
          </p>

          <p className='text-center text-[#315448] font-semibold text-sm leading-relaxed mb-6'>
            Укажите VIN (17 символов) — определим комплектацию и покажем только
            те запчасти, которые подойдут именно вашему авто.
          </p>

          <div className='sticky bottom-0 w-full bg-white flex flex-col gap-4 pb-4 pt-2'>
            <Button className='w-full h-10 rounded-[10px]'>
              Добавить автомобиль
            </Button>

            <Button
              onClick={handleClick}
              className='w-full h-10 rounded-[10px] text-[#636366] bg-[#EBECED]'
            >
              <span className='text-[#636366]'> Спасибо, я сделаю потом</span>
            </Button>
          </div>

          {/* <input
            type='text'
            placeholder='Введите VIN, например JTMBFREV60D012345'
            className='w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors mb-6'
            maxLength={17}
          /> */}
        </div>
      </div>

      {/* Нижние кнопки — фиксированы */}
    </div>
  );
};

export default VinWindow;
