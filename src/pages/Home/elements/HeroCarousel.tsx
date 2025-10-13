import { useEffect, useRef, useState } from 'react';

const HeroCarousel = () => {
  const data = [
    {
      title: 'AI-ассистент запчастей',
      img: 'images/hero.png',
    },
    {
      title: 'AI-ассистент запчастей',
      img: 'images/hero.png',
    },
    {
      title: 'AI-ассистент запчастей',
      img: 'images/hero.png',
    },
  ];

  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== current) {
        setCurrent(index);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [current]);

  return (
    <div className='relative w-full h-auto px-2 bg-[#F6F6F6]'>
      <div className='absolute top-3 right-4 flex gap-1 z-10'>
        {data.map((_: any, i: number) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-[#FFFFFF80]'
            }`}
          />
        ))}
      </div>

      {/* Контент */}
      <div
        ref={containerRef}
        className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full`}
      >
        {data.length > 0 &&
          data.map((item: any, i: number) => (
            <div
              key={i}
              className='shrink-0 w-full min-h-[270px] h-auto snap-start font-exo bg-cover bg-center bg-no-repeat rounded-lg'
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
              }}
            >
              <div className='w-full h-full flex flex-col items-start justify-between py-1 px-3 rounded-lg'>
                <p className='text-white text-[20px]/[36px] font-bold capitalize '>
                  {item.title}
                </p>

                <button className='w-fit h-fit px-2.5 py-1.5 rounded-[4.5px] bg-[#4EBC73] text-white text-sm'>
                  Подобрать запчасть
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
