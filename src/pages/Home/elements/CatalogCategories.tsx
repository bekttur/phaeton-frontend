const CatalogCategories = () => {
  const data = [
    {
      img: 'categories/7.png',
      title: 'Противоугон.  устройства',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/2.png',
      title: 'Освещение',
      items: [
        'Фары и освещение',
        'Переключатели',
        'Реле'
      ],
    },

    {
      img: 'categories/1.png',
      title: 'Шины',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/11.png',
      title: 'Автозапчасти',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/10.png',
      title: 'Масла и технические жидкости',
      items: [
        'Бамперы',
        'Панели',
        'Шумоизоляция'
      ],
    },
    {
      img: 'categories/8.png',
      title: 'Автохимия и автокосметика',
      items: [
        'АКПП',
        'Фильтр',
        'Тех. жидкости'
      ],
    },
    {
      img: 'categories/9.png',
      title: 'Комплекты дисков',
      items: [
        'ТНВД',
        'Бензонасос',
        'Топливный фильтр'
      ],
    },
    {
      img: 'categories/5.png',
      title: 'Все для ТО',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
  ];

  return (
    <div className='w-full h-fit flex flex-col gap-2 lg:gap-6'>
      <div className='w-full flex items-center justify-between px-2'>
        <span className='block text-lg font-semibold'>
          Популярные товары
        </span>
        <p className='text-sm text-[#4EBC73] font-semibold cursor-pointer'>
          Показать все
        </p>
      </div>
      <div className='w-full flex gap-2'>
        {data.map((item, idx) => (
          <div
            key={idx}
            className='w-full h-full rounded-lg bg-[#FDFDFD] border border-[#EAECED]'
          >
            <div
              className={`aspect-square relative bg-contain bg-no-repeat p-2`}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
                backgroundPosition: 'bottom right',
              }}
            >
             <p className='text-[#56625A] font-semibold' style={{fontSize: 14, lineHeight: 1.2}}>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogCategories;
