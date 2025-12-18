import { useEffect, useState } from 'react';
import Basket from '../Basket';
import ContactDetailsStep from './ContactDetailsStep';
import DeliveryMethodStep from './DeliveryMethodStep';
import PaymentStep from './PaymentStep';
import { CONTACT_STORAGE_KEY } from '../constants/storage';

type Step = 'contact' | 'delivery' | 'payment';

interface DeliveryData {
  method: 'courier' | 'pickup' | 'mailbox' | '';
  address: string;
  building: string;
  entrance: string;
  floor: string;
  comments: string;
}

interface PaymentData {
  promoCode: string;
  expressDelivery: boolean;
}

const defaultContact = {
  fullName: '',
  email: '',
  phone: '',
};

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('contact');
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);

  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (saved) {
      try {
        setContact(JSON.parse(saved));
      } catch {
        localStorage.removeItem(CONTACT_STORAGE_KEY);
      }
    }
  }, []);

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

  // if (items.length === 0) {
  //   return (
  //     <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
  //       <div className='text-center'>
  //         <p className='text-xl font-semibold text-gray-700 mb-4'>
  //           Корзина пуста
  //         </p>
  //         <a
  //           href='/catalog'
  //           className='text-[#4EBC73] font-medium hover:underline'
  //         >
  //           Вернуться к покупкам
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

  const handleContactNext = () => {
    setCurrentStep('delivery');
  };

  const handleDeliveryNext = () => {
    setCurrentStep('payment');
    setDeliveryCompleted(true);
  };

  const updateContact = (data: typeof contact) => {
    setContact(data);
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data));
  };

  return (
    <div className='min-h-screen bg-gray-100 pt-4 pb-8'>
      <div className='max-w-2xl mx-auto px-4 flex flex-col gap-4'>
        <Basket />

        <ContactDetailsStep
          data={contact}
          onUpdate={updateContact}
          onNext={handleContactNext}
          isExpanded={currentStep === 'contact'}
        />

        {/* {currentStep !== 'contact' && ( */}
        <DeliveryMethodStep
          data={delivery}
          onUpdate={setDelivery}
          completed={deliveryCompleted}
          onNext={handleDeliveryNext}
          isExpanded={currentStep === 'delivery'}
        />
        {/* )} */}

        {/* {currentStep === 'payment' && ( */}
        <PaymentStep
          data={payment}
          onUpdate={setPayment}
          isExpanded={currentStep === 'payment'}
          contact={contact}
        />
        {/* )} */}
      </div>
    </div>
  );
}
