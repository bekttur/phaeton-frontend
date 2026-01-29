
export function ServiceHistory() {
  const services = [
    {
      icon: '/garage/status/oil-filter.png',
      label: 'Масляный Фильтр',
      distance: '1200 км',
      progress: 40,
      color: 'bg-green-500',
    },
    {
      icon: '/garage/status/motor-oil.png',
      label: 'Моторное масло',
      distance: '1800 км',
      progress: 60,
      color: 'bg-green-500',
    },
    {
      icon: '/garage/status/brake-pads.png',
      label: 'Тормозные колодки',
      distance: '3000 км',
      progress: 25,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>История обслуживания</h3>

      <div className='space-y-4 mb-4'>
        {services.map((service, index) => (
          <div key={index} className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-[#9C9C9C33] rounded-xl flex items-center justify-center flex-shrink-0'>
              <img src={String(service.icon)} alt='' />
            </div>
            <div className='flex-1'>
              <div className='flex justify-between items-center mb-1'>
                <span className='text-sm font-medium text-gray-900'>
                  {service.label}
                </span>
                <span className='text-sm font-semibold text-gray-900'>
                  {service.distance}
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-1.5'>
                <div
                  className={`${service.color} h-1.5 rounded-full`}
                  style={{ width: `${service.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className='w-full py-3 bg-gray-100 rounded-xl text-gray-700 font-medium'>
        Посмотреть
      </button>
    </div>
  );
}
