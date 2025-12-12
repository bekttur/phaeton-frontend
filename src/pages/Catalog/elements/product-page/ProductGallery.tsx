import { Heart } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ProductGallery({ product }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const slides = [
    'product/first-product.png',
    'product/first-product.png',
    'product/first-product.png',
    'product/first-product.png',
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrentSlide(index);
  };

  const goToSlide = (index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: 'smooth',
    });
    setCurrentSlide(index);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite((prev) => !prev);
  };

  return (
    <div className='bg-white px-4 py-6'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex gap-2'>
          <span className='px-4 py-2 bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-white text-sm font-bold rounded-full'>
            0 - 0 - 24
          </span>

          <span className='px-4 py-2 bg-[#4EBC73] text-white text-sm font-medium rounded-full'>
            -10%
          </span>
        </div>
        <button
          onClick={toggleFavorite}
          className='p-2 bg-[#D8D8D899] rounded-[14px] transition-colors'
        >
          <Heart
            className={`w-6 h-6 transition ${
              favorite ? 'text-[#5FCD84] fill-[#5FCD84]' : 'text-[#83838399]'
            }`}
          />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='
          relative 
          w-full 
          overflow-x-auto 
          snap-x 
          snap-mandatory 
          flex 
          no-scrollbar
        '
      >
        {/* {slides.map((src, i) => (
          <div
            key={i}
            className='snap-start flex-shrink-0 w-full flex items-center justify-center aspect-[4/3]'
          >
            <img
              src={`${import.meta.env.BASE_URL}${src}`}
              className='w-[70%] h-full object-contain'
            />
          </div>
        ))} */}
        <div className='snap-start flex-shrink-0 w-full flex items-center justify-center aspect-[4/3]'>
          <img src={product.PhotoItem} className='w-50 h-auto' />
        </div>
      </div>

      {/* ===== DOTS ===== */}
      <div className='flex justify-center gap-2 mt-3 mb-5'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className='flex flex-col items-start gap-2 '>
        <div className='flex items-center gap-1 bg-[#EAECED] w-fit py-0.5 px-2 rounded-md'>
          <span className='text-lg font-semibold'>4.5</span>
          <span className='text-[#4EBC73]'>★</span>
          <span className='text-gray-600 text-sm'>132 отзыва</span>
        </div>

        <h1 className='text-base font-semibold'>{!!product && product.Name}</h1>

        <div className='text-lg font-bold'>
          {!!product && product.Price.toLocaleString('ru-RU')} ₸
        </div>
      </div>

      <div className='flex items-center w-full justify-between gap-3 mt-2'>
        <div className='w-1/2 rounded-[10px] bg-[#efefef9e] p-2.5'>
          <span className='text-[#636366] text-base font-medium'>
            Склад: {!!product && product.Warehouse}
          </span>
        </div>
        <div className='w-1/2 rounded-[10px] bg-[#efefef9e] p-2.5'>
          <span className='text-[#636366] text-base font-medium'>
            Доставка:{' '}
            {!product ||
            (product.ExpectedDelivery === 0 && product.GuaranteedDelivery === 0)
              ? 'Сегодня'
              : `${product.ExpectedDelivery} - ${product.GuaranteedDelivery}`}
          </span>
        </div>
      </div>

      <div className='bg-[#efefef9e] rounded-[10px] px-[11px] py-2.5 flex items-center gap-2 my-4'>
        <img src={`${import.meta.env.BASE_URL}icon/check_circle.svg`} alt='' />
        <span className='text-sm text-[#636366] font-medium'>
          Подходит вашему Автомобилю
        </span>
        <button className='ml-auto p-1 bg-[#8C8C8C] w-5 h-5 hover:bg-gray-100 rounded-full flex items-center justify-center'>
          <span className=' text-white rounded-full'>?</span>
        </button>
      </div>

      <div className='bg-[#efefef9e] rounded-[10px] px-[11px] py-2.5 flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-xl font-black'>
            28 000 ₸
          </span>
          <button className='ml-auto p-1 bg-[#8C8C8C] w-5 h-5 hover:bg-gray-100 rounded-full flex items-center justify-center'>
            <span className=' text-white rounded-full'>?</span>
          </button>
        </div>
        <p className='text-base text-[#636366] mb-2 font-medium'>Цена с учетом кэшбэка</p>
        <div className='bg-[#EAECED] w-full h-[1.5px]' />
        <div className='flex items-center justify-between mt-1'>
          <span className='text-base text-[#000000] font-medium'>
            Кэшбэк "Большая разница"
          </span>

          <span className='px-4 py-2 bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-white text-sm font-medium rounded-full'>
            + 4 000 ₸
          </span>
        </div>
      </div>
    </div>
  );
}
