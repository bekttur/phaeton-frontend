import { useState } from 'react';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');

  const specs = [
    { label: 'Марка модель', value: 'Марка модель' },
    { label: 'Марка модель', value: 'Марка модель' },
    { label: 'Марка модель', value: 'Марка модель' },
    { label: 'Марка модель', value: 'Марка модель' },
  ];

  return (
    <div className='bg-white mt-2 rounded-xl mx-4 p-3'>
      <div className='flex bg-[#EAECED] p-1 rounded-[10px]'>
        <button
          onClick={() => setActiveTab('specs')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'specs'
              ? 'bg-[#FFFFFF] text-black rounded-lg'
              : 'text-gray-500'
          }`}
        >
          Характеристики
        </button>
        <button
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'description'
              ? 'bg-[#FFFFFF] text-black rounded-lg'
              : 'text-gray-500'
          }`}
        >
          Описание
        </button>
      </div>

      <div className='pt-2'>
        {activeTab === 'specs' ? (
          <div>
            <h3 className='font-semibold mb-4'>Основные характеристики</h3>
            <div className='space-y-1'>
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center py-1 border-b'
                >
                  <span className='text-gray-600 text-sm'>{spec.label}</span>
                  <span className='text-gray-900 text-sm font-medium'>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <button className='text-green-600 text-sm font-medium mt-4'>
              показать всё
            </button>
          </div>
        ) : (
          <div>
            <p className='text-gray-700 leading-relaxed'>
              Описание товара будет здесь. Подробная информация о продукте, его
              характеристиках и особенностях.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
