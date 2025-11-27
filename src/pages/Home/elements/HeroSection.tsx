import HeroCarousel from './HeroCarousel';
import DigitalGarage from './DigitalGarage';

const HeroSection = () => {
  return (
    <div className='w-full h-auto mt-20 lg:px-32 bg-[#F6F6F6] lg:p-6 lg:mt-32'>
      <div
        className='w-full flex flex-col lg:flex-row gap-0 lg:gap-6 lg:min-h-[530px]'
      >
        <div className='w-full lg:w-[70%] h-auto lg:h-auto'>
          <HeroCarousel />
        </div>

        <div className='hidden lg:block w-full lg:w-[30%] h-auto lg:h-auto'>
          <DigitalGarage />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
