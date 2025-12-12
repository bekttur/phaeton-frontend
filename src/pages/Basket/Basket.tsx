import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Basket = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className='lg:hidden w-full  bg-[#F6F6F6] pt-16'>
      {items.length === 0 ? (
        <div className='text-center text-gray-500 mt-10'>Корзина пуста</div>
      ) : (
        <div className='flex flex-col gap-5 bg-white rounded-xl p-4'>
          <div className='w-full flex items-center justify-between'>
            {' '}
            <span className='text-lg font-semibold'>Ваш заказ</span>{' '}
            <a href='/catalog' className='text-base text-[#4EBC73]'>
              {' '}
              вернуться к покупкам{' '}
            </a>{' '}
          </div>
          {items.map((item) => (
            <div key={item.ItemId} className='w-full flex flex-col gap-1'>
              {/* Товар */}
              <div className='w-full flex items-start gap-4'>
                <div className=' rounded-xl bg-[#F1F2F2] overflow-hidden'>
                  <img
                    src={item.PhotoItem}
                    alt={item.Name}
                    className='w-60 object-contain'
                  />
                </div>

                <div>
                  <p className='font-medium'>{item.Name}</p>
                  <p className='font-bold text-lg'>
                    {item.Price.toLocaleString('ru-RU')} ₸
                  </p>
                </div>
              </div>

              <hr />

              {/* Контролы */}
              <div className='flex items-center justify-between mt-2'>
                <button
                  onClick={() => removeItem(item.ItemId)}
                  className='p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors'
                >
                  <Trash2 className='w-5 h-5 text-red-500' />
                </button>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={() =>
                      updateQuantity(item.ItemId, item.quantity - 1)
                    }
                    className='w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center'
                  >
                    <Minus className='w-5 h-5 text-gray-700' />
                  </button>

                  <span className='w-10 text-center font-semibold text-lg'>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.ItemId, item.quantity + 1)
                    }
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
      )}
    </div>
  );
};

export default Basket;
