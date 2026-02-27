import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useLoader } from '../../../context/LoaderContext';
import { useCreateOrder, usePaybox } from '../../../hooks/useData';
import type { DeliveryData } from './CheckoutPage';
import type { ContactDetails } from '../../../api/services/register';

interface PaymentData {
  promoCode: string;
  expressDelivery: boolean;
}

interface PaymentStepProps {
  data: PaymentData;
  onUpdate: (data: PaymentData) => void;
  isExpanded: boolean;
  contact: ContactDetails;
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
    0,
  );
  const deliveryFee = data.expressDelivery ? 1500 : 0;
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
            contact: {
              // userGuid: '9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B',
              userGuid:
                !!contact && contact.userGuid
                  ? contact.userGuid
                  : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              orderType: 1,
              name:
                !!contact && contact.fullName
                  ? contact.fullName
                  : 'Тестовый заказ',
              phone:
                !!contact && contact.phone ? `${contact.phone}` : '77001234567',
              email:
                !!contact && contact.email ? contact.email : 'test@mail.kz',
            },
            // userGuid: '9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B',
            userGuid:
              !!contact && contact.userGuid
                ? contact.userGuid
                : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            // contragentGuid: contragentGuid,
            apiKey: 'ihUOF5RTrO5wAHhQfbQW',

            contragentGuid: contragentGuid,
            // contragentGuid:
            //   !!contact && contact.contragentGuid
            //     ? contact.contragentGuid
            //     : '3fa85f64-5717-4562-b3fc-2c963f66afa6',

            brand: item.Brand,
            article: item.Article,
            warehouseId: '9b1ccf6b-9555-11e3-b018-0025909bbfce',
            // warehouseId:
            //   !!contact && contact.userGuid
            //     ? contact.userGuid
            //     : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            price: item.Price,
            count: item.quantity,
            expectedDelivery: item.ExpectedDelivery,
            guaranteedDelivery: item.GuaranteedDelivery,
            comment: fullAddress || 'Адрес не указан',
            force: 0,
            address: fullAddress || 'Адрес не указан',
            coordinateX:
              delivery.method === 'pickup'
                ? String(delivery.pickupLng)
                : String(delivery.lng),
            coordinateY:
              delivery.method === 'pickup'
                ? String(delivery.pickupLat)
                : String(delivery.lat),
            courier: delivery.method === 'pickup' ? '2' : '0',
            code: '0',
            isExpress: data.expressDelivery,

            // name: item.Name,
            // globalID: 'string',

            // warehouseId: item.WarehouseId,

            // order1CGuid:
            //   !!contact && contact.userGuid
            //     ? contact.userGuid
            //     : '3fa85f64-5717-4562-b3fc-2c963f66afa6',

            // supplierId: 0,

            // deliveryProbability: 0,

            // useBonus: 0,

            ...(delivery.method === 'pickup' && {
              selectedPvzAddress: delivery.address,
              selectedPvzId: delivery.pickupId,
              selectedPvzLat: delivery.pickupLat,
              selectedPvzLon: delivery.pickupLng,
              selectedPvzName: delivery.pickupName,
            }),
          }),
        ),
      );

      const orderItems = orderResponses.flatMap((r) => r.orderItems ?? []);      

      if (!orderItems.length) {
        throw new Error('OrderItems пустой');
      }

      const payboxOrders = orderItems.map((orderItem) => {
        const cartItem = items.find(
          (i) =>
            i.Article === orderItem.article &&
            i.Brand === orderItem.brand
            // i.WarehouseId === orderItem.warehouseId,
        );
        

        return {
          ProductCategoryGuid: cartItem!.CategoryId,
          WarehouseGuid: orderItem.warehouseId,
          OrderGuid: orderItem.orderGuid,
          OrderNumber: orderItem.orderNumber,
          // ErrorCode: orderItem.Error ?? null,
          // Result: orderItem.Error ? 'Error' : 'Ok',
        };
      });

      const orderNumber = payboxOrders[0].OrderNumber;

      console.log("payboxOrders", payboxOrders);
      

      const payboxResponse = await paybox({
        Orders: payboxOrders,

        Amount: total,
        // userGuid: '9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B',
        UserGuid: !!contact && contact.userGuid
                ? contact.userGuid
                : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
          {data.expressDelivery && (
            <div className='flex justify-between items-center border-b border-gray-200 py-2'>
              <span className='text-base font-semibold text-[#636366]'>
                Доставка
              </span>
              <span className='text-base font-semibold'>
                {deliveryFee.toLocaleString('ru-RU')} ₸ (Экспресс)
              </span>
            </div>
          )}
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
