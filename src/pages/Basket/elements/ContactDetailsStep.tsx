import { useState, useEffect } from 'react';
import {
  useLoginUser,
  useRegisterUser,
  useRetailCity,
} from '../../../hooks/useData';
import { CONTACT_STORAGE_KEY } from '../constants/storage';
import type { ContactDetails } from '../../../api/services/register';
import { useCity } from '../../../context/CityContext';
import type { ICity } from '../../../components/Header/MobileCitySelect';
import { useAuth } from '../../../context/AccessTokenContext';
import { useLoader } from '../../../context/LoaderContext';


interface ContactDetailsStepProps {
  data: ContactDetails;
  onUpdate: (data: ContactDetails) => void;
  onNext: () => void;
  isExpanded: boolean;
  onHeaderClick?: () => void;
}

export default function ContactDetailsStep({
  data,
  onUpdate,
  onNext,
  isExpanded,
  onHeaderClick,
}: ContactDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { startRequest, finishRequest, loading } = useLoader();

const { mutateAsync: registerUser } = useRegisterUser();
const { mutateAsync: loginUser } = useLoginUser();

  const { city } = useCity();
  const { data: cities = [] } = useRetailCity();

  const { setToken } = useAuth();

  const isValid = !!data.fullName && !!data.email && !!data.phone;


  const handleChange = (field: keyof ContactDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateAndSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) newErrors.fullName = 'Введите ФИО';
    if (!data.email.trim() || !data.email.includes('@'))
      newErrors.email = 'Введите корректный email';
    if (data.phone.length < 10)
      newErrors.phone = 'Введите корректный номер телефона';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data));

    startRequest();

    try {
      const cityObj = cities.find((c: ICity) => c.name === city);
      const cityId = cityObj?.id ?? 1;

      const registeredUser = await registerUser({
        ...data,
        cityId,
      });

      if (!registeredUser) {
        throw new Error('Register failed');
      }

      onUpdate({
        ...data,
        userGuid: registeredUser.user1CGuid,
        contragentGuid: registeredUser.contragent1CGuid,
      });

      const token = await loginUser({ ...data });

      if (!token) {
        throw new Error('Login failed');
      }

      setToken(token);
      onNext();
    } catch (err) {
      console.error(err);
      alert('Ошибка при регистрации пользователя');
    } finally {
      finishRequest();
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
      <div
        className='bg-white rounded-2xl p-4 cursor-pointer'
        onClick={onHeaderClick}
      >
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
    <div className='bg-white rounded-2xl p-4'>
      {!!loading && (
        <div className='fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center'>
          <div className='w-12 h-12 p-1 bg-white rounded-full'>
            <div className='w-10 h-10 border-[3px] border-t-[#4EBC73] border-l-[#4EBC73] border-b-[#4EBC73] border-white rounded-full animate-spin'></div>
          </div>
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
          placeholder='+7'
          value={data.phone ? `+${data.phone}` : '+7'}
          onChange={(e) => {
            let value = e.target.value;

            value = value.replace(/\D/g, '');

            if (value === '7') {
              handleChange('phone', '');
              return;
            }

            value = value.slice(0, 11);

            handleChange('phone', value);
          }}
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
        disabled={!isValid || loading}
        className='w-full bg-[#4EBC73] hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors'
      >
        Продолжить
      </button>
    </div>
  );
}
