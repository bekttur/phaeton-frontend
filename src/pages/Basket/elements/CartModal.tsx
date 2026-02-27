import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';
import { useEffect } from 'react';
export default function CartModal() {
  const { items, isCartOpen, closeCart, removeItem, removeAllItems, addItem, fetchCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0,
  );

  useEffect(() => {
      fetchCart();
    }, []);

  return (
    <GlobalBottomSheet
      isOpen={isCartOpen}
      onClose={closeCart}
      zIndex={50}
      height='fit-content'
    >
      <div className='flex flex-col h-full rounded-t-3xl'>
        <div className='py-3 border-b border-gray-200 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Товары в корзине</h2>
          <button
            onClick={closeCart}
            className='py-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-6 h-6 text-gray-600' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto py-4'>
          {items.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>Корзина пуста</div>
          ) : (
            <div className='space-y-4'>
              {items.map((item) => (
                <div
                  key={item.ItemId}
                  className='bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100'
                >
                  <div className='w-24 h-24 bg-gray-100 rounded-xl overflow-hidden'>
                    <img
                      src={item.PhotoItem}
                      alt={item.Name}
                      className='w-full h-full object-contain'
                    />
                  </div>

                  <div className='flex-1 flex flex-col justify-between'>
                    <div>
                      <h3 className='font-medium text-sm line-clamp-2 mb-1'>
                        {item.Name}
                      </h3>
                      <p className='text-lg font-bold'>
                        {item.Price.toLocaleString('ru-RU')} ₸
                      </p>
                    </div>

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
                          className='w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors'
                        >
                          <Plus className='w-5 h-5 text-gray-700' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className='py-4 border-t border-gray-200'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-gray-600'>Итого:</span>
              <span className='text-2xl font-bold'>
                {total.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <button
              onClick={() => {
                closeCart();
                navigate('/basket');
              }}
              className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-xl'
            >
              Перейти к оформлению
            </button>
          </div>
        )}
      </div>
    </GlobalBottomSheet>
  );
}
