import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function ProductGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

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
        <button className='p-2 bg-[#D8D8D899] rounded-[14px] transition-colors'>
          <Heart className='w-6 h-6 text-[#83838399]' />
        </button>
      </div>

      <div className='relative aspect-[4/3] mb-4 flex items-center justify-center'>
        <img
          src={`${import.meta.env.BASE_URL}product/first-product.png`}
          alt='Мотоцикл'
          className='w-[70%] h-full object-contain'
        />
      </div>

      <div className='flex justify-center gap-2 mb-4'>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
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

        <h1 className='text-base font-semibold'>Мотоцикл кавасаки Врум-ВРУМ</h1>

        <div className='text-lg font-bold'>32 000 ₸</div>
      </div>

      <div className='bg-[#efefef9e] rounded-[10px] px-[11px] py-2.5 flex items-center gap-2 my-4'>
        <img src={`${import.meta.env.BASE_URL}icon/check_circle.svg`} alt='' />
        <span className='text-sm text-[#636366]'>
          Подходит вашему Автомобилю
        </span>
        <button className='ml-auto p-1 bg-[#8C8C8C] w-5 h-5 hover:bg-gray-100 rounded-full flex items-center justify-center'>
          <span className=' text-white rounded-full'>?</span>
        </button>
      </div>

      <div className='bg-[#efefef9e] rounded-[10px] px-[11px] py-2.5 flex flex-col gap-1'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#207FC2] to-[#0ECE8D] text-xl font-black'>
            28 000 ₸
          </span>
          <button className='ml-auto p-1 bg-[#8C8C8C] w-5 h-5 hover:bg-gray-100 rounded-full flex items-center justify-center'>
            <span className=' text-white rounded-full'>?</span>
          </button>
        </div>
        <p className='text-sm text-[#636366] mb-2'>Цена с учетом кэшбэка</p>
        <div className='bg-[#EAECED] w-full h-[1.5px]' />
        <div className='flex items-center justify-between mt-1'>
          <span className='text-xs text-[#000000]'>
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
