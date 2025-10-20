import { useState } from 'react';
import { ChevronLeft, ChevronRight, Car } from 'lucide-react';

interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  maintenanceKm: number;
  image: string;
  services: {
    name: string;
    icon: string;
  }[];
}

const DigitalGarage = () => {
  const cars: Car[] = [
    {
      id: 1,
      name: 'Toyota Prado',
      model: 'Toyota Prado',
      year: 2024,
      maintenanceKm: 1823,
      image: 'images/car-placeholder.png',
      services: [
        { name: 'Масляный фильтр', icon: 'garage/1.svg' },
        { name: 'Моторное масло', icon: 'garage/2.svg' },
        { name: 'Тормозные колодки', icon: 'garage/3.svg' },
        { name: 'Воздушный фильтр', icon: 'garage/4.svg' },
      ],
    },
    {
      id: 2,
      name: 'BMW X5',
      model: 'BMW X5',
      year: 2023,
      maintenanceKm: 2450,
      image: 'images/car-placeholder.png',
      services: [
        { name: 'Масляный фильтр', icon: 'garage/1.svg' },
        { name: 'Моторное масло', icon: 'garage/2.svg' },
        { name: 'Тормозные колодки', icon: 'garage/3.svg' },
        { name: 'Воздушный фильтр', icon: 'garage/4.svg' },
      ],
    },
  ];

  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCarIndex((prev) => (prev + 1) % cars.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
      setIsAnimating(false);
    }, 500);
  };

  const currentCar = cars[currentCarIndex];
  const progressPercent = (currentCar.maintenanceKm / 10000) * 100;

  return (
    <div className='w-full h-full bg-gradient-to-br from-[#19372D] to-[#2D3540] rounded-xl p-6 flex flex-col justify-between'>
      <div className='flex-shrink-0'>
        <h2 className='text-white text-2xl font-bold mb-2'>
          Ваш цифровой гараж
        </h2>
        <p className='text-gray-300 text-sm mb-6'>
          Добавьте авто по VIN — покажем, что и когда менять
        </p>

        <div className='grid grid-cols-4 gap-3 mb-6'>
          {currentCar.services.map((service, index) => (
            <div
              key={index}
              className='bg-[#FFFFFF26] rounded-lg p-3 flex flex-col items-center justify-center text-center min-h-[90px] transition-all hover:bg-[#425566]'
            >
              <div className='w-10 h-10 bg-[#313C49] rounded-full flex items-center justify-center mb-2'>
                <img src={`${import.meta.env.BASE_URL}${service.icon}`} className='w-5' />
              </div>
              <span className='text-white text-xs leading-tight'>
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1 flex flex-col justify-end'>
        <div className='relative overflow-hidden'>
          <div className='flex items-center justify-center relative h-full'>
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className='relative left-0 z-10 w-9 h-8 bg-[#3A4D5F] rounded-full flex items-center justify-center hover:bg-[#425566] transition-colors disabled:opacity-50'
            >
              <ChevronLeft className='w-4 h-4 text-white' />
            </button>

            <div className='relative w-full max-w-md h-full flex items-center justify-center'>
              <div
                className={`w-full transition-all duration-500 ease-in-out ${
                  isAnimating
                    ? direction === 'right'
                      ? 'animate-slide-out-left'
                      : 'animate-slide-out-right'
                    : 'animate-slide-in'
                }`}
              >
                <div className='w-full h-48 bg-transparent rounded-lg flex items-center justify-center'>
                  <img
                    className='w-80'
                    src={`${import.meta.env.BASE_URL}images/car.png`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className='relative right-0 z-10 w-9 h-8 bg-[#3A4D5F] rounded-full flex items-center justify-center hover:bg-[#425566] transition-colors disabled:opacity-50'
            >
              <ChevronRight className='w-4 h-4 text-white' />
            </button>
          </div>
        </div>

        <div className='bg-[#FFFFFF26] rounded-lg p-4'>
          <div className='flex justify-between items-start mb-2'>
            <div>
              <h3 className='text-white text-lg font-semibold'>
                {currentCar.name} {currentCar.year}
              </h3>
              <p className='text-gray-300 text-sm'>
                до технического обслуживания{' '}
                <span className='text-white font-semibold'>
                  {currentCar.maintenanceKm} км
                </span>
              </p>
            </div>
          </div>

          <div className='w-full bg-[#313C49] rounded-full h-2 overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-[#5FCD84] to-[#5FCD84] transition-all duration-700 ease-out rounded-full'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalGarage;
