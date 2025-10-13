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
    <div className='p-2' style={{
          background:
            'linear-gradient(180deg,rgba(246, 246, 246, 1) 75%, rgba(255, 255, 255, 1) 75%)',
        }}>
      <div className='w-full max-w-[800px] mx-auto flex flex-col gap-2 bg-[#E3E6E8] p-2 rounded-md'>
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
                <img src={`${import.meta.env.BASE_URL}icon/play.svg`} alt='play' className='w-5 h-6 ml-1' />
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
    </div>
  );
};

export default ServiceTipsCard;
