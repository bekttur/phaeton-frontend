import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PhoneInputProps {
  onSubmit: (phone: string) => void;
  onBack: () => void;
}

function PhoneInput({ onSubmit, onBack }: PhoneInputProps) {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 10);

    setPhone(digits);
  };

  const handleSubmit = () => {
    const cleanPhone = phone.replace(/\D/g, '');

    onSubmit(cleanPhone);
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
      <div className='max-w-2xl mx-auto'>
        <button
          onClick={onBack}
          className='mb-4 hover:bg-gray-100 rounded-lg transition-colors'
        >
          <ArrowLeft className='w-6 h-6' />
        </button>

        <h1 className='text-2xl font-bold mb-4'>Вход или Регистрация</h1>

        <div className='mb-6'>
          <input
            type='tel'
            value={`+7${phone}`}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className='w-full px-6 py-3 bg-[#EAECED] rounded-[10px] text-lg outline-none focus:ring-2 focus:ring-green-500 transition-shadow'
          />
        </div>

        <p className='text-[#636366] text-[15px] mb-4'>
          Мы отправим код подтверждения на указанный номер
        </p>

        <p className='text-[#636366] text-sm mb-8'>
          Продолжая, вы соглашаетесь с условиями использования и политикой
          конфиденциальности.
        </p>

        <button
          onClick={handleSubmit}
          className='w-full bg-[#4EBC73] hover:bg-green-700 text-white font-semibold py-3 rounded-[10px] transition-colors'
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default PhoneInput;
