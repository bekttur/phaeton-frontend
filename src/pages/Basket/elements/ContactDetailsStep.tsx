import { useState, useEffect } from 'react';
import { useRegisterUser } from '../../../hooks/useData';
import { CONTACT_STORAGE_KEY } from '../constants/storage';
import type { ContactDetails } from '../../../api/services/register';
import { useCity } from '../../../context/CityContext';

interface ContactDetailsStepProps {
  data: ContactDetails;
  onUpdate: (data: ContactDetails) => void;
  onNext: () => void;
  isExpanded: boolean;
}

export default function ContactDetailsStep({
  data,
  onUpdate,
  onNext,
  isExpanded,
}: ContactDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  // @ts-ignore
  const { mutateAsync: registerUser, isLoading } = useRegisterUser();

  const isValid = !!data.fullName && !!data.email && !!data.phone;

  const { city } = useCity();

  const handleChange = (field: keyof ContactDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateAndSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) newErrors.fullName = 'Введите ФИО';
    if (!data.email.trim() || !data.email.includes('@'))
      newErrors.email = 'Введите корректный email';
    if (!data.phone.trim() || data.phone.length < 10)
      newErrors.phone = 'Введите корректный номер телефона';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data));

    try {
      const users = await registerUser(data);
      // @ts-ignore
      const newUser = users[0];

      if (newUser?.User1CGuid && newUser?.Contragent1CGuid) {
        onNext();
      } else {
        throw new Error('Не удалось получить данные пользователя');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при регистрации пользователя');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.fullName !== data.fullName ||
          parsed.email !== data.email ||
          parsed.phone !== data.phone
        ) {
          onUpdate(parsed);
        }
      } catch {
        localStorage.removeItem(CONTACT_STORAGE_KEY);
      }
    }
  }, []);

  if (!isExpanded) {
    return (
      <div className='bg-white rounded-2xl p-4'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm'>
            1
          </div>
          <h3 className='text-lg font-semibold'>Контактные данные</h3>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl p-4 relative'>
      {isLoading && (
        <div className='absolute inset-0 bg-black/30 flex items-center justify-center z-50'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 384 384'
            className='w-16 h-16 animate-spin'
          >
            <circle
              r='176'
              cy='192'
              cx='192'
              strokeWidth='32'
              fill='transparent'
              pathLength='360'
              className='stroke-white opacity-25'
            ></circle>
            <circle
              r='176'
              cy='192'
              cx='192'
              strokeWidth='32'
              fill='transparent'
              pathLength='360'
              className='stroke-white'
            ></circle>
          </svg>
        </div>
      )}

      <div className='flex items-center gap-3 mb-4'>
        <div className='w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm'>
          1
        </div>
        <h3 className='text-lg font-semibold'>Контактные данные</h3>
      </div>

      <div className='space-y-3 mb-4'>
        <input
          type='text'
          placeholder='Ваше ФИО'
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
            errors.fullName ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.fullName && (
          <p className='text-red-500 text-xs mt-1'>{errors.fullName}</p>
        )}

        <input
          type='email'
          placeholder='Ваш E-mail адрес'
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
            errors.email ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.email && (
          <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
        )}

        <input
          type='tel'
          placeholder='Номер телефона'
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
            errors.phone ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.phone && (
          <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
        )}
      </div>

      <button
        onClick={validateAndSubmit}
        disabled={!isValid || isLoading}
        className='w-full bg-[#4EBC73] hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors'
      >
        Продолжить
      </button>
    </div>
  );
}
