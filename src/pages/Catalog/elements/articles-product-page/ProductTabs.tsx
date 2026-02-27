import { useState } from 'react';

interface SpecItem {
  key: string;
  value: string;
}

export default function ProductTabs({ product }: any) {
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const specs: SpecItem[] = product?.attributes ?? [];

  const visibleSpecs = showAllSpecs ? specs : specs.slice(0, 5);

  return (
    <div className='bg-white mt-2 rounded-xl mx-4 p-3'>
      <div className='flex bg-[#EAECED] p-1 rounded-[10px] '>
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
          <div className='min-h-[30vh]'>
            <h3 className='font-semibold mb-4'>Основные характеристики</h3>
            <div className='space-y-1'>
              {visibleSpecs.map((spec, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center py-1 border-b'
                >
                  <span className='text-gray-600 text-sm'>{spec.key}</span>
                  <span className='text-gray-900 text-sm font-medium text-end'>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {specs.length > 5 && (
              <button
                className={`${showAllSpecs ? 'text-gray-600' : 'text-green-600'} text-sm font-medium mt-2`}
                onClick={() => setShowAllSpecs((prev) => !prev)}
              >
                {showAllSpecs ? 'скрыть' : 'показать всё'}
              </button>
            )}
          </div>
        ) : (
          <div className='min-h-[30vh]'>
            <h3 className='font-semibold mb-4'>Описание товара</h3>
            <p className='text-gray-700 leading-relaxed'>
              {product.brand} {product.number}
            </p>
            <p className='text-gray-700 leading-relaxed'>
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
