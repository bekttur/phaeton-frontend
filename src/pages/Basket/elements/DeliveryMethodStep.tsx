import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface DeliveryData {
  method: 'courier' | 'pickup' | 'mailbox' | '';
  address: string;
  building: string;
  entrance: string;
  floor: string;
  comments: string;
}

interface DeliveryMethodStepProps {
  data: DeliveryData;
  onUpdate: (data: DeliveryData) => void;
  completed: boolean;
  onNext: () => void;
  isExpanded: boolean;
}

export default function DeliveryMethodStep({
  data,
  onUpdate,
  completed,
  onNext,
  isExpanded,
}: DeliveryMethodStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = data.method && data.address;

  const handleMethodChange = (method: 'courier' | 'pickup' | 'mailbox') => {
    onUpdate({
      ...data,
      method,
      address: '',
      building: '',
      entrance: '',
      floor: '',
      comments: '',
    });
  };

  const handleChange = (field: keyof DeliveryData, value: string) => {
    onUpdate({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateAndSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!data.method) {
      newErrors.method = 'Выберите способ получения';
    }
    if (!data.address.trim()) {
      newErrors.address = 'Введите адрес';
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
        <div className={`w-8 h-8 rounded-full ${!!completed ? 'bg-[#4EBC73] text-white' : 'bg-[#EAECED] text-black'}  flex items-center justify-center font-bold text-sm`}>
          2
        </div>
        <h3 className="text-lg font-semibold">Способ получения</h3>
      </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#4EBC73] text-white flex items-center justify-center font-bold text-sm">
          2
        </div>
        <h3 className="text-lg font-semibold">Способ получения</h3>
      </div>

      <div className="flex gap-3 mb-4 text-sm">
        <button
          onClick={() => handleMethodChange('courier')}
          className={`flex-1 px-1 py-3 rounded-[10px] font-medium transition-colors ${
            data.method === 'courier'
              ? 'bg-[#4EBC73] text-white'
              : 'bg-[#EAECED] text-gray-700 hover:bg-gray-300'
          }`}
        >
          Курьером
        </button>
        <button
          onClick={() => handleMethodChange('pickup')}
          className={`flex-1 px-1 py-3 rounded-[10px] font-medium transition-colors ${
            data.method === 'pickup'
              ? 'bg-[#4EBC73] text-white'
              : 'bg-[#EAECED] text-gray-700 hover:bg-gray-300'
          }`}
        >
          Пункт выдачи
        </button>
        <button
          onClick={() => handleMethodChange('mailbox')}
          className={`flex-1 px-1 py-3 rounded-[10px] font-medium transition-colors ${
            data.method === 'mailbox'
              ? 'bg-[#4EBC73] text-white'
              : 'bg-[#EAECED] text-gray-700 hover:bg-gray-300'
          }`}
        >
          Почтомат
        </button>
      </div>

      {data.method === 'courier' && (
        <div className="space-y-3 mb-4">
          <div>
            <input
              type="text"
              placeholder="Адрес"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`w-full px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73] ${
                errors.address ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="кв/дом"
              value={data.building}
              onChange={(e) => handleChange('building', e.target.value)}
              className="w-1/3 px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73]"
            />
            <input
              type="text"
              placeholder="Подъезд"
              value={data.entrance}
              onChange={(e) => handleChange('entrance', e.target.value)}
              className="w-1/3 px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73]"
            />
            <input
              type="text"
              placeholder="Этаж"
              value={data.floor}
              onChange={(e) => handleChange('floor', e.target.value)}
              className="w-1/3 px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73]"
            />
          </div>

          <textarea
            placeholder="Комментарий к заказу"
            value={data.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            className="w-full px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73] resize-none h-20"
          />
        </div>
      )}

      {data.method === 'pickup' && (
        <div className="space-y-3 mb-4">
          <div className="p-3 bg-[#EAECED] rounded-[10px] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#4EBC73]" />
            <span className="text-sm font-medium text-[#4EBC73]">
              Указать на карте
            </span>
          </div>
          <textarea
            placeholder="Комментарий к заказу"
            value={data.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            className="w-full px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73] resize-none h-20"
          />
        </div>
      )}

      {data.method === 'mailbox' && (
        <div className="space-y-3 mb-4">
          <div className="p-3 bg-[#EAECED] rounded-[10px] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#4EBC73]" />
            <span className="text-sm font-medium text-[#4EBC73]">
              Указать на карте
            </span>
          </div>
          <textarea
            placeholder="Комментарий к заказу"
            value={data.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            className="w-full px-4 py-3 bg-[#EAECED] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#4EBC73] resize-none h-20"
          />
        </div>
      )}

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
