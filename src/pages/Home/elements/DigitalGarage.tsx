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

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  distance: string;
  title: string;
  progress: number;
}

const tabs = [
  { id: 'report', label: 'Отчет' },
  { id: 'auto', label: 'Авто ИИ' },
  { id: 'services', label: 'Сервисы' },
  { id: 'parts', label: 'Запчасти' },
];

const serviceItems: ServiceItem[] = [
  {
    id: '1',
    icon: 'logo/digital-garage/filter.svg',
    distance: '1 223 км',
    title: 'Масляный Фильтр',
    progress: 75,
  },
  {
    id: '2',
    icon: 'logo/digital-garage/oil.svg',
    distance: '1 223 км',
    title: 'Моторное масло',
    progress: 45,
  },
  {
    id: '3',
    icon: 'logo/digital-garage/stop.svg',
    distance: '1 223 км',
    title: 'Тормозные колодки',
    progress: 85,
  },
  {
    id: '4',
    icon: 'logo/digital-garage/airfilter.svg',
    distance: '1 223 км',
    title: 'Воздушный Фильтр',
    progress: 50,
  },
  {
    id: '5',
    icon: 'logo/digital-garage/filter.svg',
    distance: '1 223 км',
    title: 'Масляный Фильтр',
    progress: 75,
  },
  {
    id: '6',
    icon: 'logo/digital-garage/oil.svg',
    distance: '1 223 км',
    title: 'Моторное масло',
    progress: 45,
  },
  {
    id: '7',
    icon: 'logo/digital-garage/stop.svg',
    distance: '1 223 км',
    title: 'Тормозные колодки',
    progress: 85,
  },
  {
    id: '8',
    icon: 'logo/digital-garage/airfilter.svg',
    distance: '1 223 км',
    title: 'Воздушный Фильтр',
    progress: 50,
  },
];

const DigitalGarage = () => {
  const [activeTab, setActiveTab] = useState('report');

  const cars: Car[] = [
    {
      id: 1,
      name: 'Toyota Prado',
      model: 'Toyota Prado',
      year: 2024,
      maintenanceKm: 1823,
      image: 'images/car.png',
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
      image: 'images/bmw.png',
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
    <div className='w-full h-full bg-gradient-to-br from-[#19372D] to-[#2D3540] rounded-xl py-3 flex flex-col justify-between'>
      <div className='flex-shrink-0 px-6'>
        <h2 className='text-white text-xl font-bold mb-2'>
          Ваш цифровой гараж
        </h2>
        <p className='text-gray-300 text-sm mb-6'>
          Точный подбор деталей и напоминания по обслуживанию — по вашему VIN
        </p>

        {/* <div className='grid grid-cols-4 gap-3 mb-6'>
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
        </div> */}
      </div>

      <div className='flex-1 flex flex-col justify-start'>
        <div className='relative overflow-hidden px-6'>
          <div className='relative w-full'>
            <div className='w-[80%] bg-[#FFFFFF26] rounded-lg p-4 m-auto absolute left-0 right-0 top-0 h-[90vh]'>
              <div className='flex justify-between items-start'>
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

          <div className='flex items-center justify-center h-full mt-16 relative z-40'>
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className='relative left-0 z-10 w-9 h-8 bg-[#E8E8E82B] rounded-lg flex items-center justify-center hover:bg-[#425566] transition-colors disabled:opacity-50 mb-32'
            >
              <ChevronLeft className='w-4 h-4 text-white' />
            </button>

            <div className='relative w-full max-w-md h-full flex items-start justify-center'>
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
                    className='w-72 relative z-50'
                    src={`${import.meta.env.BASE_URL}${currentCar.image}`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className='relative right-0 z-10 w-9 h-8 bg-[#E8E8E82B] rounded-lg flex items-center justify-center hover:bg-[#425566] transition-colors disabled:opacity-50 mb-32'
            >
              <ChevronRight className='w-4 h-4 text-white' />
            </button>
          </div>

          {/* <div className='absolute w-[200%] bg-gradient-to-b from-[#2B4744] to-[#28363B] h-[10vh] bottom-0 left-0 z-0' /> */}
        </div>
        <div className='h-fit bg-gradient-to-b from-[#2B4744] to-[#28363B] px-6 pt-8 relative z-30 mt-[-50px]'>
          <div className='w-full mx-auto'>
            <div className='flex gap-2 my-3 justify-between'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-1/4 px-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#C0C0C057] text-white shadow-lg'
                      : 'bg-[#C0C0C01A] text-gray-300 hover:bg-slate-650'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8'>
              {serviceItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-[#FFFFFF1A] rounded-[10px] px-3 py-2 flex flex-col items-center'
                >
                  <div className='relative w-16 h-16'>
                    <div className='absolute inset-0 flex items-center justify-center bg-[#313C49] rounded-full m-2 text-white p-3'>
                      {/* @ts-ignore */}
                      <img
                        className='w-12 h-12'
                        src={`${import.meta.env.BASE_URL}${item.icon}`}
                      />
                    </div>
                  </div>
                  <div className='text-sm font-semibold text-white mb-1'>
                    {item.distance}
                  </div>
                  <div className='text-xs text-[#C0CCDD] text-center'>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-[#293B3E] rounded-[10px] p-3.5'>
              <h2 className='text-xs font-semibold text-white mb-4'>
                Сократите поиск
              </h2>
              <p className='text-[#D2D2D2] text-sm leading-relaxed'>
                Это пример возможностей «Гаража».
                <br />
                Введите ваш VIN — покажем точные данные по вашему авто
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalGarage;
