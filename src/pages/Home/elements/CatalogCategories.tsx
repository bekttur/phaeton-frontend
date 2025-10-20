import Button from '../../../components/ui/Button/Button';

const CatalogCategories = () => {
  const data = [
    {
      img: 'categories/1.png',
      title: 'Ходовая часть',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/2.png',
      title: 'Электрика и свет',
      items: [
        'Фары и освещение',
        'Переключатели',
        'Реле'
      ],
    },

    {
      img: 'categories/3.png',
      title: 'Колёса и шины',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/4.png',
      title: 'Топливная система',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
    {
      img: 'categories/5.png',
      title: 'Фильтры и расходники',
      items: [
        'Бамперы',
        'Панели',
        'Шумоизоляция'
      ],
    },
    {
      img: 'categories/6.png',
      title: 'Кузов и интерьер',
      items: [
        'АКПП',
        'Фильтр',
        'Тех. жидкости'
      ],
    },
    {
      img: 'categories/1.png',
      title: 'Топливная система',
      items: [
        'ТНВД',
        'Бензонасос',
        'Топливный фильтр'
      ],
    },
    {
      img: 'categories/2.png',
      title: 'Ходовая часть',
      items: [
        'Подвеска',
        'Рулевое управление',
        'Стабилизатор'
      ],
    },
  ];

  return (
    <div className='w-full h-fit flex flex-col gap-2 lg:gap-6 px-2 py-3 bg-[#F6F6F6] lg:px-32'>
      <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6'>
        {data.map((item, idx) => (
          <div
            key={idx}
            className='min-w-[166px] min-h-[176px] rounded-md bg-[#efefef] border border-[#DCE0E5]'
          >
            <div
              className={`w-[100%] h-[100%] relative bg-contain bg-no-repeat px-2 py-1.5 lg:px-4 lg:py-5`}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
                backgroundPosition: 'bottom right',
              }}
            >
              <span className='text-base font-semibold'>{item.title}</span>
              <ul className='mt-2 hidden lg:block'>
                {item.items.map((desc) => (
                  <li className='text-[15px] text-[#525E6F]'>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-center'>
        <Button className='w-full text-base rounded-md'>Открыть полный каталог</Button>
      </div>
    </div>
  );
};

export default CatalogCategories;
