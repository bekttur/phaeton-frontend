import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const navigate = useNavigate();
  const { items, removeItem, addItem, removeAllItems, fetchCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0,
  );

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div
      className={`
        lg:hidden w-full bg-[#F6F6F6] py-20 lg:py-0 px-4 min-h-screen
      `}
    >
      <div className='w-full flex items-center justify-between mb-4'>
        {' '}
        <span className='text-lg font-semibold'>Корзина</span>{' '}
        <button onClick={() => navigate(-1)} className='text-base text-[#4EBC73]'>
          {' '}
          назад к покупкам{' '}
        </button>{' '}
      </div>

      {items.length === 0 ? (
        <div className='bg-[#F6F6F6]'>
          <div className='w-full'>
            <div className='bg-white rounded-2xl p-4 shadow-sm'>
              <div className='flex justify-center my-4'>
                <div className='w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center'>
                  <img
                    src='/icon/basket0.svg'
                    className='w-8 h-8'
                    alt='basket0'
                  />
                </div>
              </div>

              <h1 className='text-2xl text-[#0F0F0F] font-semibold text-center mb-1'>
                Ваша корзина пуста
              </h1>

              <p className='text-[#636366] text-center mb-5'>
                Выберите товары в каталоге — они появятся здесь.
              </p>

              <button
                className='w-full bg-[#4EBC73] hover:bg-green-700 text-white font-semibold py-3 rounded-[10px] transition-colors text-lg'
                onClick={() => navigate('/catalog')}
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative pb-20'>
          <div className='w-full grid grid-cols-2 gap-4 mb-4'>
            <div className='bg-white py-3 px-4 rounded-2xl shadow-sm'>
              <div className='flex items-center justify-start'>
                <img
                  className='w-4 h-4'
                  src='/icon/mobile-menu/favorite.svg'
                  alt='favorite'
                />
                <span className='ml-2 text-lg font-semibold'>Избранное</span>
              </div>
              <span className='text-[#636366] text-base font-normal'>
                3 товара ждут вас
              </span>
            </div>
            <div className='bg-white py-3 px-4 rounded-2xl shadow-sm'>
              <div className='flex items-center justify-start'>
                <img
                  className='w-4 h-4'
                  src='/icon/mobile-menu/bucket_check.svg'
                  alt='favorite'
                />
                <span className='ml-2 text-lg font-semibold'>Мои заказы</span>
              </div>
              <span className='text-[#636366] text-base font-normal'>
                2 товара в пути
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            {items.map((item, idx) => (
              <div
                key={idx}
                className='w-full flex flex-col gap-1 bg-white rounded-xl p-4 shadow-sm'
              >
                <div className='w-full flex items-start gap-4'>
                  {/* <div className=' rounded-xl bg-[#F1F2F2] overflow-hidden'> */}
                  <img
                    src={
                      item.PhotoItem ||
                      `${import.meta.env.BASE_URL}product/first-product.png`
                    }
                    alt={item.Name}
                    className='w-20 object-contain'
                  />
                  {/* </div> */}

                  <div>
                    <p className='font-medium'>{item.Name}</p>
                    <p className='font-bold text-lg'>
                      {item.Price.toLocaleString('ru-RU')} ₸
                    </p>
                  </div>
                </div>

                <hr />

                <div className='flex items-center justify-between mt-2'>
                  <button
                    onClick={() => removeAllItems(item.Article, item.Brand)}
                    className='p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors'
                  >
                    <Trash2 className='w-5 h-5 text-red-500' />
                  </button>

                  <div className='flex items-center gap-2'>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => removeItem(item.Article, item.Brand)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                      ${
                        item.quantity === 1
                          ? 'bg-gray-100 cursor-not-allowed opacity-50'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Minus className='w-5 h-5 text-gray-700' />
                    </button>

                    <span className='w-10 text-center font-semibold text-lg'>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => addItem(item)}
                      className='w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center'
                    >
                      <Plus className='w-5 h-5 text-gray-700' />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Итог */}
            {/* <div className='w-full bg-white rounded-xl'>
            <div className='flex items-center justify-between text-lg font-semibold'>
              <span>Итого:</span>
              <span>{total.toLocaleString('ru-RU')} ₸</span>
            </div>
          </div> */}
          </div>

          <div className='fixed bottom-20 left-0 right-0 p-4 bg-transparent'>
            <button
              onClick={() => navigate('/checkout')}
              className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xl'
            >
              Перейти к оформлению{' '}
              <span>{total.toLocaleString('ru-RU')} ₸</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
