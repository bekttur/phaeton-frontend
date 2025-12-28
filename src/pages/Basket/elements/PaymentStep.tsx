import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useLoader } from '../../../context/LoaderContext';
import { useCreateOrder, usePaybox } from '../../../hooks/useData';
import type { DeliveryData } from './CheckoutPage';

interface PaymentData {
  promoCode: string;
  expressDelivery: boolean;
}

interface PaymentStepProps {
  data: PaymentData;
  onUpdate: (data: PaymentData) => void;
  isExpanded: boolean;
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  delivery: DeliveryData;
}

export default function PaymentStep({
  data,
  onUpdate,
  isExpanded,
  contact,
  delivery,
}: PaymentStepProps) {
  const { items } = useCart();
  const { startRequest, finishRequest, loading } = useLoader();

  const fullAddress = [
    delivery.address,
    delivery.building && `дом ${delivery.building}`,
    delivery.entrance && `подъезд ${delivery.entrance}`,
    delivery.floor && `этаж ${delivery.floor}`,
  ]
    .filter(Boolean)
    .join(', ');

  const subtotal = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );
  const deliveryFee = data.expressDelivery ? 2000 : 0;
  const total = subtotal + deliveryFee;

  // const { data: contragentData } = useGettingContragent();
  const { mutateAsync: createOrder } = useCreateOrder();
  const { mutateAsync: paybox } = usePaybox();

  const [openLoader, setOpenLoader] = useState(false);

  const handlePay = async () => {
    startRequest();
    setOpenLoader(true);

    const contragentGuid = '0c2d2a4f-c5be-11f0-bbdb-bc97e1b23a0b';

    try {
      const orderResponses = await Promise.all(
        items.map((item) =>
          createOrder({
            Contact: {
              UserGuid: '906f6c86-e0db-11f0-bbbd-f8f21e092c7d',
              OrderType: 1,
              Name:
                !!contact && contact.fullName
                  ? contact.fullName
                  : 'Тестовый заказ',
              Phone:
                !!contact && contact.phone
                  ? `7${contact.phone}`
                  : '77001234567',
              Email:
                !!contact && contact.email ? contact.email : 'test@mail.kz',
            },
            UserGuid: '9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B',
            ApiKey: 'ihUOF5RTrO5wAHhQfbQW',
            ContragentGuid: contragentGuid,

            Brand: item.Brand,
            Article: item.Article,
            WarehouseId: item.WarehouseId,

            Price: item.Price,
            Count: item.quantity,

            ExpectedDelivery: item.ExpectedDelivery,
            GuaranteedDelivery: item.GuaranteedDelivery,

            Comment: fullAddress || 'Адрес не указан',
            Force: 0,

            Address: fullAddress || 'Адрес не указан',

            CoordinateX: '43.247369',
            CoordinateY: '76.967546',
            Courier: delivery.method === 'pickup' ? '2' : '0',
            Code: '0',

            ...(delivery.method === 'pickup' && {
              SelectedPvzAddress: delivery.address,
              SelectedPvzId: delivery.pickupId,
              SelectedPvzLat: delivery.pickupLat,
              SelectedPvzLon: delivery.pickupLng,
              SelectedPvzName: delivery.pickupName,
            }),
          })
        )
      );

      const orderItems = orderResponses.flatMap((r) => r.OrderItems ?? []);

      if (!orderItems.length) {
        throw new Error('OrderItems пустой');
      }

      const payboxOrders = orderItems.map((orderItem) => {
        const cartItem = items.find(
          (i) =>
            i.Article === orderItem.Article &&
            i.Brand === orderItem.Brand &&
            i.WarehouseId === orderItem.WarehouseId
        );

        return {
          ProductCategoryGuid: cartItem!.CategoryId,
          WarehouseGuid: orderItem.WarehouseId,
          OrderGuid: orderItem.OrderGuid,
          OrderNumber: orderItem.OrderNumber,
          // ErrorCode: orderItem.Error ?? null,
          // Result: orderItem.Error ? 'Error' : 'Ok',
        };
      });

      const orderNumber = payboxOrders[0].OrderNumber;

      const payboxResponse = await paybox({
        Orders: payboxOrders,

        Amount: total,
        UserGuid: '9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B',
        AgentGuid: contragentGuid,
        ContractGuid: contragentGuid,

        Description: `Оплата заказа ${orderNumber}`,
        Model: {
          name:
            !!contact && contact.fullName ? contact.fullName : 'Тестовый заказ',
          phone:
            !!contact && contact.phone ? `7${contact.phone}` : '77001234567',
          email: !!contact && contact.email ? contact.email : 'test@mail.kz',
          address: fullAddress || 'Адрес не указан',
          comment: fullAddress || 'Адрес не указан',
          routes: [],
          route: '',
        },
      });

      if (
        typeof payboxResponse === 'string' &&
        payboxResponse.startsWith('http')
      ) {
        window.location.href = payboxResponse;
      } else {
        throw new Error('payment_url не получен');
      }
    } catch (error) {
      console.error('Ошибка оплаты:', error);
      alert('Ошибка при переходе к оплате');
    } finally {
      finishRequest();
      setOpenLoader(false);
    }
  };

  if (!isExpanded && !loading) {
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
      {!!loading && openLoader && (
        <div className='fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center'>
          <div className='w-12 h-12 p-1 bg-white rounded-full'>
            <div className='w-10 h-10 border-[3px] border-t-[#4EBC73] border-l-[#4EBC73] border-b-[#4EBC73] border-white rounded-full animate-spin'></div>
          </div>
        </div>
      )}
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

        {/* <div className='space-y-3 flex items-start justify-between'>
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
        </div> */}

        <div className='space-y-2 pt-4'>
          <div className='flex justify-between items-center border-b border-gray-200 py-2'>
            <span className='text-base font-semibold text-[#636366]'>
              Сумма заказа
            </span>
            <span className='text-base font-semibold'>
              {subtotal.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          {/* <div className='flex justify-between items-center border-b border-gray-200 py-2'>
            <span className='text-base font-semibold text-[#636366]'>
              Доставка
            </span>
            <span className='text-base font-semibold'>
              {deliveryFee.toLocaleString('ru-RU')} ₸
            </span>
          </div> */}
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

      <button
        className='w-full bg-[#4EBC73] hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors'
        onClick={handlePay}
      >
        Оплатить картой
      </button>
    </div>
  );
}
