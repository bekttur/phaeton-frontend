import { useState } from 'react';
import { Check, X } from 'lucide-react';
import MobileModelSelect from '../../Search/elements/MobileModelSelect';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';

interface Props {
  vehicle: any;
}

const VehicleBlock = ({ vehicle }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const formatYearMonth = (value?: string) => {
    if (!value) return '';
    const [year, month] = value.split('-');
    return `${month}.${year}`;
  };

  if (!vehicle) return null;

  return (
    <>
      <div className='bg-white rounded-2xl p-4'>
        <div className='flex flex-col items-start gap-3'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='bg-[#4EBC73] rounded-full p-1'>
                <Check className='w-3 h-3 text-white' />
              </div>
              <h3 className='font-semibold text-[#050505]'>
                {vehicle.mfrName} {vehicle.vehicleModelSeriesName}
              </h3>
            </div>
            <p className='text-[#636366] text-sm font-medium'>
              Показываем совместимые товары на вашу машину
            </p>
          </div>

          <div className='w-full flex items-center justify-between'>
            {vehicle.vehicleImages?.[0] && (
              <img
                src={vehicle.vehicleImages[0].imageURL800}
                alt='Car'
                className='w-32 rounded-lg object-cover'
              />
            )}

            <div className='flex items-center gap-2'>
              <button
                className='text-[14px] px-3 py-1 bg-[#4EBC73] text-white rounded-full font-medium'
                onClick={() => setIsModalOpen(true)}
              >
                Подробнее
              </button>
              <button
                className='text-[14px] px-3 py-1 bg-[#F5F5F5] text-[#636366] rounded-full font-medium'
                onClick={() => setIsSelectOpen(true)}
              >
                Изменить
              </button>
            </div>
          </div>
        </div>
      </div>

      {isSelectOpen && (
        <MobileModelSelect
          isOpen={isSelectOpen}
          onClose={() => setIsSelectOpen(false)}
          selectedVehicle={vehicle}
        />
      )}

      {isModalOpen && (
        <GlobalBottomSheet
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {vehicle && (
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between mb-3'>
                <div />
                <h2 className='text-lg font-semibold'>
                  {vehicle.mfrName} {vehicle.vehicleModelSeriesName}
                </h2>
                <button
                  className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100'
                  onClick={() => setIsModalOpen(false)}
                >
                  <X width={16} height={16} color='#8C8C8C' />
                </button>
              </div>

              <div className='bg-white rounded-xl py-4 px-3 flex flex-col gap-3'>
                <p className='text-lg font-medium'>Основные сведения</p>

                {vehicle.vehicleImages?.[0] ? (
                  <img
                    src={vehicle.vehicleImages[0].imageURL800}
                    alt='Vehicle'
                    className='w-full rounded-xl object-cover'
                  />
                ) : (
                  <img
                    src='/images/911.svg'
                    style={{
                      width: '85%',
                      margin: '0 auto',
                      transform: 'scaleX(-1)',
                    }}
                  />
                )}

                <div className='space-y-1'>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Тип</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.description}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Дата выпуска</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {formatYearMonth(vehicle.beginYearMonth)} –{' '}
                      {formatYearMonth(vehicle.endYearMonth)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Тип</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.bodyStyle}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Привод</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.driveType}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl py-4 px-3 text-xl font-medium flex flex-col gap-3'>
                <p className='text-lg font-medium'>Технические данные</p>

                <div className='space-y-1'>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Код двигателя
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.engines[0]?.code}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Тип двигателя
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.engineType}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Рабочий объём двигателя
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.capacityCC} см³ / {vehicle.capacityLiters} л
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Мощность</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.kiloWattsFrom} кВт / {vehicle.horsePowerFrom} л.c
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>Тип топлива</span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.fuelType}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Количество цилиндров
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.cylinders}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Клапанов на цилиндр
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.valves}
                    </span>
                  </div>
                  <div className='flex justify-between items-center py-2 border-b'>
                    <span className='text-[#636366] text-sm'>
                      Система подачи топлива
                    </span>
                    <span className='text-black text-sm font-medium text-end'>
                      {vehicle.fuelMixtureFormationType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlobalBottomSheet>
      )}
    </>
  );
};

export default VehicleBlock;
