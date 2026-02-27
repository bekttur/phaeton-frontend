import { useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useMyOrders } from '../../hooks/useData';
import { useNavigate } from 'react-router';
import LoginPrompt from '../Profile/elements/steps/LoginPrompt';

interface OrderItem {
  orderItemID: number;
  name: string;
  price: number;
  count: number;
  photoItem: string;
  lastStatus: {
    status: string;
    period: string;
    providerStatus: string;
    comment: string;
  };
}

interface Order {
  orderID: number;
  createDate: string;
  isRefuse: boolean;
  comment: string;
  items: OrderItem[];
}

const MyOrders = () => {
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data, isLoading, isError, error } = useMyOrders();
  const scrollPositionRef = useRef(0);

  const orders = data?.orders ?? [];

  const getStatusConfig = (order: Order) => {
    if (order.isRefuse) {
      return {
        label: 'Отменено',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
      };
    }

    const status = order.items[0]?.lastStatus?.status ?? 'В обработке';

    return {
      label: status,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
    };
  };

  if (isLoading) {
    return (
      <div className='fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center'>
        <div className='w-12 h-12 p-1 bg-white rounded-full'>
          <div className='w-10 h-10 border-[3px] border-t-[#4EBC73] border-l-[#4EBC73] border-b-[#4EBC73] border-white rounded-full animate-spin'></div>
        </div>
      </div>
    );
  }

  if (isError) {
    const status = (error as any)?.response?.status;

    if (status === 401) {
      return (
        <div className='bg-[#F6F6F6] relative top-14 bottom-20'>
          <LoginPrompt
            onLoginClick={() =>
              navigate('/profile', {
                state: { from: 'orders' },
              })
            }
          />
        </div>
      );
    }

    return (
      <div className='pt-20 text-center min-h-screen text-red-500'>
        Ошибка загрузки
      </div>
    );
  }

  if (!isLoading && !isError && orders.length === 0) {
    return (
      <div className='bg-[#F6F6F6] relative top-14 bottom-20 min-h-screen'>
        <div className='max-w-2xl mx-auto px-4 py-10'>
          <div className='bg-white rounded-2xl p-5 text-center shadow-sm'>
            <div className='flex justify-center mb-6'>
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center'>
                <img
                  src='/profile/shopping_cart.svg'
                  alt='empty-orders'
                  className='w-10 h-10 opacity-60'
                />
              </div>
            </div>

            <h2 className='text-xl font-semibold mb-2'>
              У вас пока нет заказов
            </h2>

            <p className='text-[#636366] mb-6'>
              Оформите первый заказ в каталоге — и он появится здесь.
            </p>

            <button
              onClick={() => navigate('/catalog')}
              className='w-full bg-[#4EBC73] hover:bg-green-700 text-white font-semibold py-3 rounded-[10px] transition-colors text-lg'
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    const statusConfig = getStatusConfig(selectedOrder);

    const total = selectedOrder.items.reduce(
      (sum: number, item: any) => sum + item.price * item.count,
      0,
    );

    return (
      <div className='bg-gray-50 relative top-14 bottom-20'>
        <div className='bg-white border-b sticky top-0 z-10'>
          <div className='max-w-2xl mx-auto px-4 py-4 flex items-center'>
            <button
              onClick={() => {
                setSelectedOrder(null);
                setTimeout(() => {
                  window.scrollTo(0, scrollPositionRef.current);
                }, 0);
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className='text-xl font-semibold ml-4'>Мои заказы</h1>
          </div>
        </div>

        <div className='max-w-2xl mx-auto p-4'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div
              className={`inline-flex items-center text-sm gap-2 px-3 py-1 rounded-full ${statusConfig.bgColor} mb-4`}
            >
              <span className={statusConfig.textColor}>
                {statusConfig.label}
              </span>
            </div>

            <div className='flex gap-4 mb-6'>
              <img
                src={
                  selectedOrder.items[0].photoItem ||
                  `/product/first-product.png`
                }
                alt={selectedOrder.items[0].name}
                className='w-24 h-24 object-contain rounded-lg bg-gray-100'
              />
              <div className='flex flex-col justify-between'>
                <h2 className='text-base font-medium line-clamp-2'>
                  {selectedOrder.items[0].name}
                </h2>
                <p className='text-xl font-semibold'>
                  {total.toLocaleString()} ₸
                </p>
              </div>
            </div>

            <div className='space-y-4 border-t pt-4 text-base'>
              <div className='flex justify-between'>
                <span className='text-[#636366]'>Номер заказа</span>
                <span className='font-medium'>{selectedOrder.orderID}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#636366]'>Дата заказа</span>
                <span className='font-medium'>
                  {new Date(selectedOrder.createDate).toLocaleString('ru-RU')}
                </span>
              </div>
              <div className='flex justify-between border-dashed border-b border-gray-300 pb-4 mb-4'>
                <span className='text-[#636366]'>Адрес</span>
                <span className='font-medium'>
                  {selectedOrder.comment || 'Адрес не указан'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#636366]'>Количество</span>
                <span className='font-medium'>
                  {selectedOrder.items[0].count}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#636366]'>Сумма</span>
                <span className='font-medium'>{total.toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========= LIST =========
  return (
    <div className='min-h-screen bg-gray-50 relative top-14'>
      <div className='max-w-2xl mx-auto p-4 space-y-4 mb-32'>
        {orders.map((order: any) => {
          const statusConfig = getStatusConfig(order);

          const total = order.items.reduce(
            (sum: number, item: any) => sum + item.price * item.count,
            0,
          );

          return (
            <div
              key={order.orderID}
              className='bg-white rounded-xl shadow-sm p-4'
            >
              <div
                className={`inline-flex items-center gap-2 px-3 text-sm py-1 rounded-full ${statusConfig.bgColor} mb-4`}
              >
                <span className={statusConfig.textColor}>
                  {statusConfig.label}
                </span>
              </div>

              <div className='flex gap-4 mb-4 border-b pb-4'>
                <img
                  src={
                    order?.items[0]?.photoItem || `/product/first-product.png`
                  }
                  alt={order?.items[0]?.name || 'Product Image'}
                  className='w-24 h-24 object-contain rounded-lg bg-gray-100'
                />
                <div className='flex flex-col justify-between'>
                  <h3 className='text-base font-medium line-clamp-2'>
                    {order?.items[0]?.name}
                  </h3>
                  <p className='text-xl font-semibold'>
                    {total.toLocaleString()} ₸
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  scrollPositionRef.current = window.scrollY;
                  setSelectedOrder(order);
                }}
                className='w-full bg-gray-100 py-3 rounded-xl'
              >
                Детали заказа
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
