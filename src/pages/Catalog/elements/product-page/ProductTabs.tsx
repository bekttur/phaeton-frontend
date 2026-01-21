import { useState } from 'react';

interface SpecItem {
  label: string;
  value: string;
}

export default function ProductTabs({ product }: any) {
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const specs: SpecItem[] = Object.entries(product?.Parameters ?? {}).map(
    ([label, value]) => ({
      label,
      value: String(value),
    }),
  );

  const visibleSpecs = showAllSpecs ? specs : specs.slice(0, 5);

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
          <div className='min-h-[20vh]'>
            <h3 className='font-semibold mb-4'>Основные характеристики</h3>
            <div className='space-y-1'>
              {visibleSpecs.map((spec, index) => (
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

            {specs.length > 5 && (
              <button
                className={`${showAllSpecs ? 'text-gray-600' : 'text-green-600'} text-sm font-medium mt-2`}
                onClick={() => {
                  setShowAllSpecs((prev) => !prev);
                  if (showAllSpecs) {
                    document
                      .querySelector('.specs-top')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {showAllSpecs ? 'скрыть' : 'показать всё'}
              </button>
            )}
          </div>
        ) : (
          <div className='min-h-[20vh] space-y-1'>
            <div className='flex justify-between items-center py-1 border-b'>
              <span className='text-gray-600 text-sm'>Артикул</span>
              <span className='text-gray-900 text-sm font-medium'>
                {product?.Article}
              </span>
            </div>
            <div className='flex justify-between items-center py-1 border-b'>
              <span className='text-gray-600 text-sm'>Бренд</span>
              <span className='text-gray-900 text-sm font-medium'>
                {product?.Brand}
              </span>
            </div>
            <div className='flex justify-between items-center py-1 border-b'>
              <span className='text-gray-600 text-sm'>Склад</span>
              <span className='text-gray-900 text-sm font-medium'>
                {product?.Warehouse}
              </span>
            </div>
            <div className='flex justify-between items-start py-1 border-b'>
              <span className='text-gray-600 text-sm'>На авто</span>
              <span className='text-gray-900 text-sm font-medium whitespace-pre-line text-end'>
                {product?.Using?.replace(/;/g, '\n')}
              </span>
            </div>
            <div className='flex justify-between items-center py-1 border-b'>
              <span className='text-gray-600 text-sm'>Доставка</span>
              <span className='text-gray-900 text-sm font-medium'>
                {!product ||
                (product.ExpectedDelivery === 0 &&
                  product.GuaranteedDelivery === 0)
                  ? 'Сегодня'
                  : `${product.ExpectedDelivery}-${product.GuaranteedDelivery} дней`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
