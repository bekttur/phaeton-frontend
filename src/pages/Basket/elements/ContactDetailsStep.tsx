import { useState } from 'react';

interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
}

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

  const isValid = data.fullName && data.email && data.phone;

  const handleChange = (field: keyof ContactDetails, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateAndSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Введите ФИО';
    }
    if (!data.email.trim() || !data.email.includes('@')) {
      newErrors.email = 'Введите корректный email';
    }
    if (!data.phone.trim() || data.phone.length < 10) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext();
  };

  if (!isExpanded) {
    return (
      <div className="bg-white rounded-2xl p-4">
        <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm">
          1
        </div>
        <h3 className="text-lg font-semibold">Контактные данные</h3>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm">
          1
        </div>
        <h3 className="text-lg font-semibold">Контактные данные</h3>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <input
            type="text"
            placeholder="Ваше ФИО"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
              errors.fullName ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Ваш E-mail адрес"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
              errors.email ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Номер телефона"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-[#EAECED] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
              errors.phone ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-[#636366] mb-4">
        Нажимая на кнопку, я согласаюсь с{' '}
        <span className="text-[#4EBC73] font-medium">публичным договором</span> и
        сбор и обработку моих персональных данных
      </p>

      <button
        onClick={validateAndSubmit}
        disabled={!isValid}
        className="w-full bg-[#4EBC73] hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Продолжить
      </button>
    </div>
  );
}
