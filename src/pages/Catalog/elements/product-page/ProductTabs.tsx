import { useState } from 'react';

interface SpecItem {
  label: string;
  value: string;
}

export default function ProductTabs({ product }: any) {
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');

  // Преобразуем product.Parameters в массив
  const specs: SpecItem[] = Object.entries(product?.Parameters ?? {}).map(
    ([label, value]) => ({
      label,
      value: String(value),
    })
  );

  return (
    <div className='bg-white mt-2 rounded-xl mx-4 p-3'>
      <div className='flex bg-[#EAECED] p-1 rounded-[10px]'>
        <button
          onClick={() => setActiveTab('specs')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'specs'
              ? 'bg-white text-black rounded-lg'
              : 'text-gray-500'
          }`}
        >
          Характеристики
        </button>
        <button
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === 'description'
              ? 'bg-white text-black rounded-lg'
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
              {product?.Description ??
                'Описание товара будет здесь. Подробная информация о продукте.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
