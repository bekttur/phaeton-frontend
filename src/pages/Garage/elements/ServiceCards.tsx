export function ServiceCards() {
  const services = [
    {
      icon: '/garage/services/parking.png',
      label: 'Парковки',
    },
    { icon: '/garage/services/stations.png', label: 'Заправки' },
    { icon: '/garage/services/car-washes.png', label: 'Автомойки' },
    { icon: '/garage/services/roads.png', label: 'Дороги' },
    { icon: '/garage/services/insurance.png', label: 'Страхование' },
    { icon: '/garage/services/tires.png', label: 'Шины' },
    { icon: '/garage/services/car-service.png', label: 'Автосервис' },
    { icon: '/garage/services/spares.png', label: 'Запчасти' },
  ];

  return (
    <div className='grid grid-cols-4 gap-[0.54rem] px-4 mb-4'>
      {services.map((service, index) => (
        <div key={index} className='flex flex-col items-center gap-2'>
          <div
            className={`bg-[#99999949] rounded-2xl w-16 h-16 flex items-center justify-center`}
          >
            <img src={service.icon} alt="" />
          </div>
          <span className='text-white text-[11px] text-center leading-tight'>
            {service.label}
          </span>
        </div>
      ))}
    </div>
  );
}
