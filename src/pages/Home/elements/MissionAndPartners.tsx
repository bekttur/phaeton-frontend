const MissionAndPartners = () => {
  const logos = [
    'logo/partners/1.svg',
    'logo/partners/2.svg',
    'logo/partners/3.svg',
    'logo/partners/4.svg',
    'logo/partners/5.svg',
    'logo/partners/6.svg',
    'logo/partners/7.svg',
  ];

  return (
    <div className='w-full px-4 py-6 flex flex-col items-start gap-3 overflow-hidden lg:px-32 lg:pt-20'>
      <p className='text-3xl text-black font-semibold'>
        Магазин <span className='text-[#4EBC73]'>Phaeton</span>
      </p>

      <div className='flex flex-col gap-6 w-full lg:flex-row lg:items-start lg:justify-between'>
        {/* Левый блок — Миссия */}
        <div className='flex-1 flex flex-col gap-2 max-w-[400px] lg:max-w-full'>
          <p className='text-lg text-[#62C382] font-semibold'>Миссия и цели</p>
          <p className='block lg:hidden text-base text-[#14181F]'>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <p className='hidden lg:block text-base text-[#14181F]'>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. 
          </p>
          <p className='hidden lg:block text-base text-[#14181F]'>
            The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. The languages only differ in their grammar, their pronunciation and their most common words. 
          </p>
        </div>

        {/* Правый блок — Партнёры + карусель */}
        <div className='flex-1 flex flex-col gap-4'>
          {/* Партнёры */}
          <div className='flex flex-col gap-2'>
            <p className='text-lg text-[#62C382] font-semibold'>
              Наши партнёры
            </p>
            <p className='block lg:hidden text-base text-[#14181F]'>
              Мы сотрудничаем с ведущими брендами и поставщиками автозапчастей.
            </p>
            <p className='hidden lg:block text-base text-[#14181F]'>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. 
          </p>
          </div>

          {/* Карусель логотипов */}
          <div className='relative w-full overflow-hidden'>
            <div className='scroll-container'>
              <div className='scroll-content flex items-center gap-6 animate-scroll'>
                {[...logos, ...logos].map((logo, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.BASE_URL}${logo}`}
                    alt={`partner-${index}`}
                    className='h-[60px] object-contain opacity-90 hover:opacity-100 transition'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAndPartners;
