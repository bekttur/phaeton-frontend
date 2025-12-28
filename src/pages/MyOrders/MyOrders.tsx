import { useState } from 'react';
import { ChevronLeft, CheckCircle, XCircle, Clock } from 'lucide-react';

type OrderStatus = 'delivered' | 'cancelled' | 'active';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

type TabType = 'all' | 'active' | 'completed' | 'cancelled';

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '000085752257',
    date: '24-12-25, 13:22:16',
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Моточик кавасаки Врум-ВРУМ',
        price: 32000,
        quantity: 1,
        image: 'product/first-product.png',
      },
    ],
    total: 32000,
  },
  {
    id: '2',
    orderNumber: '000085752258',
    date: '23-12-25, 10:15:42',
    status: 'cancelled',
    items: [
      {
        id: '2',
        name: 'Моточик кавасаки Врум-ВРУМ',
        price: 32000,
        quantity: 1,
        image: 'product/first-product.png',
      },
    ],
    total: 32000,
  },
  {
    id: '3',
    orderNumber: '000085752259',
    date: '22-12-25, 15:30:10',
    status: 'active',
    items: [
      {
        id: '3',
        name: 'Моточик кавасаки Врум-ВРУМ',
        price: 32000,
        quantity: 1,
        image: 'product/first-product.png',
      },
    ],
    total: 32000,
  },
];

const MyOrders = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return {
          icon: CheckCircle,
          label: 'Доставлено',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          label: 'Отменено',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
        };
      case 'active':
        return {
          icon: Clock,
          label: 'Активно',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
        };
    }
  };

  const filterOrders = (orders: Order[]) => {
    switch (selectedTab) {
      case 'active':
        return orders.filter((order) => order.status === 'active');
      case 'completed':
        return orders.filter((order) => order.status === 'delivered');
      case 'cancelled':
        return orders.filter((order) => order.status === 'cancelled');
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders(mockOrders);

  if (selectedOrder) {
    const statusConfig = getStatusConfig(selectedOrder.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className='min-h-screen bg-gray-50 relative top-14'>
        <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
          <div className='max-w-2xl mx-auto px-4 py-4 flex items-center justify-between'>
            <button
              onClick={() => setSelectedOrder(null)}
              className='mr-4 text-gray-600 hover:text-gray-900'
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className='text-xl font-semibold'>Мои заказы</h1>
            <div className='ml-4' />
          </div>
        </div>

        <div className='max-w-2xl mx-auto p-4'>
          <div className='bg-white rounded-xl shadow-sm p-6 mb-4'>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} mb-4`}
            >
              <StatusIcon size={18} className={statusConfig.textColor} />
              <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                {statusConfig.label}
              </span>
            </div>

            <div className='flex gap-4 mb-6'>
              <img
                src={`${import.meta.env.BASE_URL}${
                  selectedOrder.items[0].image
                }`}
                alt={selectedOrder.items[0].name}
                className='w-24 h-24 object-contain rounded-lg bg-gray-100'
              />
              <div className='flex-1'>
                <h2 className='text-lg font-semibold mb-2'>
                  {selectedOrder.items[0].name}
                </h2>
                <p className='text-2xl font-bold'>
                  {selectedOrder.total.toLocaleString()} ₸
                </p>
              </div>
            </div>

            <div className='space-y-4 border-t pt-4'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Номер заказа</span>
                <span className='font-medium'>{selectedOrder.orderNumber}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Дата заказа</span>
                <span className='font-medium'>{selectedOrder.date}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Статус</span>
                <span className={`font-medium ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Количество</span>
                <span className='font-medium'>
                  {selectedOrder.items[0].quantity}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Сумма</span>
                <span className='font-bold text-lg'>
                  {selectedOrder.total.toLocaleString()} ₸
                </span>
              </div>
            </div>
          </div>

          <button className='w-full bg-gray-200 text-gray-700 py-4 rounded-[10px] font-medium mb-3 hover:bg-gray-300 transition-colors'>
            Вернуть заказ
          </button>
          <button className='w-full bg-[#4EBC73] text-white py-4 rounded-[10px] font-medium hover:bg-green-600 transition-colors'>
            Повторить заказ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 relative top-14 mb-16'>
      <div className='bg-[#F6F6F6] sticky top-0 z-10'>
        <div className='bg-white max-w-2xl mx-auto px-4 py-4 flex items-center justify-between'>
          <button className='mr-4 text-gray-600 hover:text-gray-900'>
            <ChevronLeft size={24} />
          </button>
          <h1 className='text-xl font-semibold'>Мои заказы</h1>
          <div className='ml-4' />
        </div>

        <div className='max-w-2xl mx-auto px-4 mt-2'>
          <div className='flex gap-2 pb-3 overflow-x-auto'>
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedTab === 'all'
                  ? 'bg-white text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedTab === 'active'
                  ? 'bg-white text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Активные
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedTab === 'completed'
                  ? 'bg-white text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Завершенные
            </button>
            <button
              onClick={() => setSelectedTab('cancelled')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedTab === 'cancelled'
                  ? 'bg-white text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Отмененные
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-2xl mx-auto p-4 space-y-4 bg-[#F6F6F6]'>
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className='bg-white rounded-xl shadow-sm p-4'>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} mb-4`}
              >
                <StatusIcon size={18} className={statusConfig.textColor} />
                <span
                  className={`text-sm font-medium ${statusConfig.textColor}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <div className='flex gap-4 mb-4 border-b border-gray-200 pb-4'>
                <img
                  src={`${import.meta.env.BASE_URL}${order.items[0].image}`}
                  alt={order.items[0].name}
                  className='w-24 h-24 object-contain rounded-lg bg-gray-100'
                />
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold mb-2'>
                    {order.items[0].name}
                  </h3>
                  <p className='text-2xl font-bold'>
                    {order.total.toLocaleString()} ₸
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(order)}
                className='w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors'
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
