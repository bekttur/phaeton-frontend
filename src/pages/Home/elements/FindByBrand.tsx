import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button/Button';

const FindByBrand = () => {
  const brands = [
    {
      name: 'Mitsubishi',
      img: 'brands/mitsubishi.png',
      width: 33,
      height: 29,
    },
    { name: 'Audi', img: 'brands/audi.png', width: 47, height: 26 },
  ];

  // Повторяем список
  const repeatedBrands = Array(5).fill(brands).flat();
  const repeatedBrandsLg = Array(9).fill(brands).flat(); 

  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLg(window.innerWidth >= 1024); 
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  const data = isLg ? repeatedBrandsLg : repeatedBrands;

  return (
    <div className='w-full h-fit flex flex-col gap-4 px-4 py-4 bg-[#F6F6F6] lg:px-32 lg:pt-20'>
      <span className='text-xl lg:text-3xl font-bold'>Найдите запчасти по марке</span>
      <div
        className={`w-full grid ${
          isLg ? 'grid-cols-6' : 'grid-cols-2'
        } gap-2 lg:gap-4`}
      >
        {data.map((brand, i) => (
          <div
            key={i}
            className='w-full h-[60px] rounded-lg bg-white border border-[#DCE0E5] flex items-center justify-center px-3 gap-4'
          >
            <img
              className='object-contain'
              src={`${import.meta.env.BASE_URL}${brand.img}`}
              alt={brand.name}
              width={brand.width}
              height={brand.height}
            />
            <span className='text-[15px] font-semibold text-start flex-1'>
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      <div className='w-full flex items-center justify-center'>
        <Button className='w-full text-base rounded-md bg-[#E3E6E8] hover:bg-[#c9cccdb9]'>
          <span className='text-[#14181F]'>Открыть полный список</span>
        </Button>
      </div>
    </div>
  );
};

export default FindByBrand;
