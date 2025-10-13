import Button from '../../../components/ui/Button/Button';

const CatalogCategories = () => {
  const data = [
    {
      img: 'categories/1.png',
      title: 'Ходовая часть',
    },
    {
      img: 'categories/2.png',
      title: 'Электрика и свет',
    },

    {
      img: 'categories/3.png',
      title: 'Колёса и шины',
    },
    {
      img: 'categories/4.png',
      title: 'Топливная система',
    },
    {
      img: 'categories/5.png',
      title: 'Фильтры и расходники',
    },
    {
      img: 'categories/6.png',
      title: 'Кузов и интерьер',
    },
  ];

  return (
    <div className='w-full h-fit flex flex-col gap-2 px-2 py-4 bg-[#F6F6F6]'>
      <div className='w-full grid grid-cols-2 gap-2'>
        {data.map((item, idx) => (
          <div
            key={idx}
            className='w-[166px] h-[176px] rounded-[6px] bg-[#efefef] border border-[#DCE0E5]'
          >
            <div
              className={`w-[100%] h-[100%] relative bg-contain bg-no-repeat px-2 py-1.5`}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${item.img})`,
                backgroundPosition: '15px 0px',
              }}
            >
              <span className='text-base font-semibold'>{item.title}</span>
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
