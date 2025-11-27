import { useEffect, useRef, useState } from 'react';
import CatalogCategories from './CatalogCategories';

const HeroCarousel = () => {
  const [isLg, setIsLg] = useState(false);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, большой ли экран
    const checkScreenSize = () => {
      setIsLg(window.innerWidth >= 1024); // lg breakpoint (tailwind)
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const data = [
    {
      title: 'AI-ассистент запчастей',
      img: isLg ? 'images/hero-lg.png' : 'images/hero.png',
    },
    {
      title: 'AI-ассистент запчастей',
      img: isLg ? 'images/hero-lg.png' : 'images/hero.png',
    },
    {
      title: 'AI-ассистент запчастей',
      img: isLg ? 'images/hero-lg.png' : 'images/hero.png',
    },
  ];

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

  return (
    <div className='relative w-full h-full px-2 lg:px-0 bg-[#F6F6F6] lg:bg-transparent'>
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
        className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full lg:h-[60vh] w-full rounded-2xl'
      >
        {data.map((item, i) => (
          <div
            key={i}
            className='shrink-0 min-w-full min-h-[270px] lg:max-h-[560px] h-auto snap-start font-exo bg-cover lg:bg-cover bg-center bg-no-repeat rounded-2xl'
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
            }}
          >
            <div className='w-full h-full flex flex-col items-start justify-between pt-1 lg:pt-5 pb-3 lg:pb-8 px-3 lg:px-10 rounded-lg'>
              <p className='text-white text-[20px]/[36px] lg:text-2xl font-bold capitalize'>
                {item.title}
              </p>
              <button className='w-fit h-fit px-[12px] py-[7px] rounded-[10px] bg-gradient-to-br from-[#31825F] to-[#4EBC73] text-white text-sm border border-[#5AAE93]'>
                Открыть AI Phaeton
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='hidden lg:flex w-full h-[40vh]  flex-col gap-4'>
        <div className='w-full h-1/2 bg-white' />
        <div className='w-full min-h-1/2 h-fit bg-white px-5 py-4 rounded-2xl'>
          <CatalogCategories />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
