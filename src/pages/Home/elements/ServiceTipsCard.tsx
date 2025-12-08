import { ChevronRight } from 'lucide-react';

interface VideoPreview {
  id: number;
  youtubeId: string;
}

const ServiceTipsCard = () => {
  const previews: VideoPreview[] = [
    { id: 1, youtubeId: 'VJxppgsHjF8' },
    { id: 2, youtubeId: 'WWEs82u37Mw' },
    { id: 3, youtubeId: 'RYHoyBhcA_A' },
  ];

  return (
    <div
      className='px-4 py-2 lg:px-32 lg:pt-20'
      style={{
        background:
          'linear-gradient(180deg,rgba(246, 246, 246, 1) 75%, rgba(255, 255, 255, 1) 75%)',
      }}
    >
      {/* Mobile version */}
      <div className='w-full max-w-[800px] mx-auto flex lg:hidden flex-col gap-2 bg-[#E3E6E8] p-2 lg:p-4 rounded-md lg:rounded-2xl'>
        {/* Верхняя карточка с текстом */}
        <div className='bg-white rounded-md py-11 px-6 flex flex-col gap-3 shadow-sm'>
          <span className='text-[15px] text-black'>Советы сервиса</span>
          <h2 className='text-xl font-semibold text-black'>
            Проверено мастерами
          </h2>
          <p className='text-black text-[15px] leading-relaxed'>
            Обзоры деталей, типичные ошибки и лайфхаки по экономии без потери
            качества.
          </p>

          <button className='mt-2 flex items-center gap-1 text-[15px] font-medium text-black hover:underline'>
            Смотреть подборку
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        {/* Видео-превью */}
        <div className='w-full grid grid-cols-[1fr_80px] gap-2'>
          {/* Основное видео */}
          <div className='relative rounded-md overflow-hidden'>
            <img
              src={`https://img.youtube.com/vi/c5LeLdbK_-A/maxresdefault.jpg`}
              alt='main video'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                <img
                  src={`${import.meta.env.BASE_URL}icon/play.svg`}
                  alt='play'
                  className='w-5 h-6 ml-1'
                />
              </div>
            </div>
          </div>

          {/* Маленькие превью */}
          <div className='flex flex-col gap-2'>
            {previews.map((video) => (
              <div
                key={video.id}
                className='relative w-[80px] aspect-square rounded overflow-hidden'
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={`preview-${video.id}`}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                    <img
                      src={`${import.meta.env.BASE_URL}icon/play.svg`}
                      alt='play'
                      className='w-3 h-4 ml-1'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop version */}
      <div className='w-full hidden lg:flex flex-col gap-2'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='w-full bg-white rounded-lg py-11 px-8 flex flex-col gap-5 shadow-sm'>
            <span className='text-xl text-black'>Советы сервиса</span>
            <h2 className='text-5xl font-semibold text-black'>
              Проверено мастерами
            </h2>
            <p className='w-[80%] text-black text-xl leading-relaxed'>
              Обзоры деталей, типичные ошибки и лайфхаки по экономии без потери
              качества.
            </p>

            <button className='mt-8 flex items-center gap-1 text-xl font-medium text-black hover:underline'>
              Смотреть подборку
              <ChevronRight className='w-8 h-8' />
            </button>
          </div>
          <div className='w-full grid grid-cols-2 gap-3'>
            <div className='relative rounded-md overflow-hidden'>
              <img
                src={`https://img.youtube.com/vi/c5LeLdbK_-A/maxresdefault.jpg`}
                alt='main video'
                className='w-full h-full aspect-square object-cover'
              />
              <div className='absolute bottom-5 right-5 flex items-center justify-center'>
                <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                  <img
                    src={`${import.meta.env.BASE_URL}icon/play.svg`}
                    alt='play'
                    className='w-5 h-6 ml-1'
                  />
                </div>
              </div>
            </div>

            <div className='relative rounded-md overflow-hidden'>
              <img
                src={`https://img.youtube.com/vi/c5LeLdbK_-A/maxresdefault.jpg`}
                alt='main video'
                className='w-full h-full aspect-square object-cover'
              />
              <div className='absolute bottom-5 right-5 flex items-center justify-center'>
                <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                  <img
                    src={`${import.meta.env.BASE_URL}icon/play.svg`}
                    alt='play'
                    className='w-5 h-6 ml-1'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full grid grid-cols-4 gap-3'>
          {previews.map((video) => (
            <div key={video.id} className='w-full relative aspect-square object-cover'>
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt='main video'
                className='w-full h-full aspect-square object-cover rounded-md '
              />
              <div className='absolute bottom-5 right-5 flex items-center justify-center'>
                <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                  <img
                    src={`${import.meta.env.BASE_URL}icon/play.svg`}
                    alt='play'
                    className='w-5 h-6 ml-1'
                  />
                </div>
              </div>
            </div>
          ))}
           <div className='relative rounded-md overflow-hidden'>
              <img
                src={`https://img.youtube.com/vi/c5LeLdbK_-A/maxresdefault.jpg`}
                alt='main video'
                className='w-full h-full aspect-square object-cover'
              />
              <div className='absolute bottom-5 right-5 flex items-center justify-center'>
                <div className='bg-white/90 rounded-full p-3 flex items-center justify-center'>
                  <img
                    src={`${import.meta.env.BASE_URL}icon/play.svg`}
                    alt='play'
                    className='w-5 h-6 ml-1'
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTipsCard;
