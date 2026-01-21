import { useEffect, useRef, useState } from 'react';
import CatalogCategories from './CatalogCategories';

const HeroCarousel = () => {
  const [isLg, setIsLg] = useState(false);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = [
    {
      title: 'Найдите запчасть ',
      title2: 'с помощью AI-Phaeton',
      img: isLg ? 'images/hero-lg.png' : 'images/hero2.png',
      isCashback: false,
    },
    {
      title: 'Повышенный кешбэк',
      title2: 'на автозапчасти',
      description: 'Покупайте нужное для авто и получайте выгоду каждый раз',
      isCashback: true,
      img: isLg ? 'images/second.png' : 'images/second.png',
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => setIsLg(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      const index = Math.round(scrollLeft / clientWidth);
      setCurrent(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const nextIndex = (current + 1) % data.length;
      container.scrollTo({
        left: nextIndex * container.clientWidth,
        behavior: 'smooth',
      });
      setCurrent(nextIndex);
    }, 5000); // 5000ms = 5 секунд

    return () => clearInterval(interval);
  }, [current, data.length]);

  return (
    <div className='relative w-full h-full px-4 lg:px-0 bg-[#F6F6F6] lg:bg-transparent'>
      <div className='absolute top-4 lg:top-5 right-8 lg:right-5 flex gap-1 z-10'>
        {data.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-[#FFFFFF80]'
            }`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className='flex overflow-x-auto snap-x gap-1 snap-mandatory scrollbar-hide h-full lg:h-[60vh] w-full rounded-2xl'
      >
        {data.map((item, i) => (
          <div
            key={i}
            className='shrink-0 min-w-full min-h-[280px] lg:max-h-[560px] h-auto snap-start font-exo bg-cover lg:bg-cover bg-center bg-no-repeat rounded-2xl'
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
            }}
          >
            <div className='w-full h-full flex flex-col items-start justify-start gap-2 pt-3 lg:pt-5 pb-3 lg:pb-8 px-4 lg:px-10 rounded-lg'>
              <div>
                <p className='text-white text-[20px]/[30px] lg:text-2xl font-semibold whitespace-nowrap'>
                  {item.title}
                </p>
                <p className='text-white text-[20px]/[30px] lg:text-2xl font-semibold whitespace-nowrap mt-[-3px]'>
                  {item.title2}
                </p>
              </div>
              {!!item.description && (
                <p className='text-white w-[180px] text-base'>
                  {item.description}
                </p>
              )}
              {item.isCashback && (
                <div className='w-fit h-fit px-3 py-2 bg-[#E3F2F8] rounded-xl mt-2'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-[15px] font-semibold'>
                    Кэшбек до 20%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden lg:flex w-full h-[40vh] flex-col gap-4'>
        <div className='w-full h-1/2 bg-white' />
        <div className='w-full min-h-1/2 h-fit bg-white px-5 py-4 rounded-2xl'>
          <CatalogCategories />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
