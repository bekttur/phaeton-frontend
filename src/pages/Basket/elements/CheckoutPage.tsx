import { useEffect, useState } from 'react';
import ContactDetailsStep from './ContactDetailsStep';
import DeliveryMethodStep from './DeliveryMethodStep';
import PaymentStep from './PaymentStep';
import { CONTACT_STORAGE_KEY } from '../constants/storage';
import { useCart } from '../../../context/CartContext';
import type { ContactDetails } from '../../../api/services/register';
import { useAuth } from '../../../context/AccessTokenContext';
import { useNavigate } from 'react-router-dom';

type Step = 'contact' | 'delivery' | 'payment';

export interface DeliveryData {
  method: 'courier' | 'pickup' | 'mailbox' | '';
  address: string;

  building: string;
  entrance: string;
  floor: string;
  comments: string;

  lat?: string;
  lng?: string;

  // (PVZ)
  pickupId?: string;
  pickupName?: string;
  pickupLat?: string;
  pickupLng?: string;
}

interface PaymentData {
  promoCode: string;
  expressDelivery: boolean;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('contact');
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);

  const { token, user } = useAuth();
  const { items, fetchCart } = useCart();

  const defaultContact: ContactDetails = {
    fullName: '',
    email: '',
    phone: '',
    userGuid: '',
    contragentGuid: '',
  };

  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (token && user) {
      const userData: ContactDetails = {
        fullName: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        userGuid: user.user1CGuid ?? '',
        contragentGuid: user.contragent1CGuid ?? '',
      };

      setContact(userData);
    }
  }, [token, user]);

  useEffect(() => {
    if (!token) {
      const saved = localStorage.getItem(CONTACT_STORAGE_KEY);

      if (saved) {
        try {
          setContact(JSON.parse(saved));
        } catch {
          localStorage.removeItem(CONTACT_STORAGE_KEY);
        }
      } else {
        setContact(defaultContact);
      }
    }
  }, [token]);

  const [delivery, setDelivery] = useState<DeliveryData>({
    method: '',
    address: '',
    building: '',
    entrance: '',
    floor: '',
    comments: '',
  });

  const [payment, setPayment] = useState<PaymentData>({
    promoCode: '',
    expressDelivery: false,
  });

  const handleContactNext = () => {
    setCurrentStep('delivery');
  };

  const handleDeliveryNext = () => {
    setCurrentStep('payment');
    setDeliveryCompleted(true);
  };

  const goToContact = () => {
    setCurrentStep('contact');
  };

  const goToDelivery = () => {
    if (currentStep === 'payment' || currentStep === 'delivery') {
      setCurrentStep('delivery');
    }
  };

  const updateContact = (data: ContactDetails) => {
    setContact(data);

    if (!token) {
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data));
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0,
  );

  return (
    <div className='bg-gray-100 py-20 lg:py-0'>
      <div className='max-w-2xl mx-auto px-4 flex flex-col gap-4'>
        {/* <Basket /> */}

        <div className='w-full flex items-center justify-between'>
          {' '}
          <span className='text-lg font-semibold'>Оформление заказа</span>{' '}
          <button
            onClick={() => navigate(-1)}
            className='text-base text-[#4EBC73]'
          >
            {' '}
            назад{' '}
          </button>{' '}
        </div>

        <div className='w-full p-4 bg-white flex flex-col rounded-2xl shadow-sm divide-y divide-[#EAECED]'>
          {items.map((item, idx) => (
            <div key={idx} className='w-full h-full flex items-start gap-4 py-4'>
              <img
                src={
                  item.PhotoItem ||
                  `${import.meta.env.BASE_URL}product/first-product.png`
                }
                alt={item.Name}
                className='w-20 h-20 object-contain rounded-lg bg-[#F1F2F2] p-2'
              />
              <div className='flex flex-col justify-between'>
                <p className='font-medium line-clamp-2 mb-2'>{item.Name}</p>
                <div className='flex items-center justify-between'>
                  <p className='font-bold text-lg'>
                    {item.Price.toLocaleString('ru-RU')} ₸
                  </p>
                  <p className='text-base font-medium text-[#8E8E93]'>
                    {item.quantity} шт
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className='w-full flex items-center justify-between pt-4'>
            <p className='font-medium text-right text-lg'>Товаров на сумму</p>
            <p className='font-bold text-xl text-right'>
              {total.toLocaleString('ru-RU')} ₸
            </p>
          </div>
        </div>

        <ContactDetailsStep
          data={contact}
          onUpdate={updateContact}
          onNext={handleContactNext}
          isExpanded={currentStep === 'contact'}
          onHeaderClick={goToContact}
        />

        <DeliveryMethodStep
          data={delivery}
          onUpdate={setDelivery}
          completed={deliveryCompleted}
          onNext={handleDeliveryNext}
          isExpanded={currentStep === 'delivery'}
          onHeaderClick={goToDelivery}
          expressDelivery={payment.expressDelivery}
          onExpressChange={(value) =>
            setPayment((prev) => ({ ...prev, expressDelivery: value }))
          }
        />

        {/* {currentStep === 'payment' && ( */}
        <PaymentStep
          data={payment}
          onUpdate={setPayment}
          isExpanded={currentStep === 'payment'}
          contact={contact}
          delivery={delivery}
        />

        {/* )} */}
      </div>
    </div>
  );
}
