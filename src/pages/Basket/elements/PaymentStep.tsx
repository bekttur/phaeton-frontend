import { useCart } from '../../../context/CartContext';

interface PaymentData {
  promoCode: string;
  expressDelivery: boolean;
}

interface PaymentStepProps {
  data: PaymentData;
  onUpdate: (data: PaymentData) => void;
  isExpanded: boolean;
}

export default function PaymentStep({
  data,
  onUpdate,
  isExpanded,
}: PaymentStepProps) {
  const { items } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );
  const deliveryFee = data.expressDelivery ? 2000 : 0;
  const total = subtotal + deliveryFee;

  if (!isExpanded) {
    return (
      <div className='bg-white rounded-2xl p-4'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-[#EAECED] text-black flex items-center justify-center font-bold text-sm'>
            3
          </div>
          <h3 className='text-lg font-semibold'>Оплата заказа</h3>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl p-4'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm'>
          3
        </div>
        <h3 className='text-lg font-semibold'>Оплата заказа</h3>
      </div>

      <div className='space-y-4 mb-6'>
        <div>
          <input
            type='text'
            placeholder='Промокод'
            value={data.promoCode}
            onChange={(e) => onUpdate({ ...data, promoCode: e.target.value })}
            className='w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73]'
          />
        </div>

        <div className='space-y-3 flex items-start justify-between'>
          <div>
            <h4 className='font-semibold text-base'>Экспресс доставка</h4>
            <span className='text-base text-[#8E8E93]'>
              Платная доставка за 2-3 дня
            </span>
          </div>

          <label className='switch'>
            <input
              type='checkbox'
              checked={data.expressDelivery}
              onChange={(e) =>
                onUpdate({ ...data, expressDelivery: e.target.checked })
              }
            />
            <span className='slider'></span>
          </label>
        </div>

        <div className='space-y-2 pt-4'>
          <div className='flex justify-between items-center border-b border-gray-200 py-2'>
            <span className='text-base font-semibold text-[#636366]'>
              Сумма заказа
            </span>
            <span className='text-base font-semibold'>
              {subtotal.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          <div className='flex justify-between items-center border-b border-gray-200 py-2'>
            <span className='text-base font-semibold text-[#636366]'>
              Доставка
            </span>
            <span className='text-base font-semibold'>
              {deliveryFee.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          <div className='flex justify-between items-center border-b border-gray-200 py-2'>
            <span className='text-base font-semibold text-[#636366]'>
              Итого
            </span>
            <span className='text-xl font-bold text-[#000000]'>
              {total.toLocaleString('ru-RU')} ₸
            </span>
          </div>
        </div>
      </div>

      <button className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors'>
        Оплатить картой
      </button>
    </div>
  );
}
