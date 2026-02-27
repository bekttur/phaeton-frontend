import { useState, useEffect } from 'react';
import YandexMap from './YandexMap';

type AddressData = {
  address: string;
  lat: string;
  lng: string;
};

type Props = {
  data: AddressData | null;
  onClose: () => void;
  onConfirm: (data: AddressData) => void;
};

export default function MapConfirmModal({ data, onClose, onConfirm }: Props) {
  const [selected, setSelected] = useState<AddressData | null>(data);

  useEffect(() => {
    setSelected(data);
  }, [data]);

  if (!selected) return null;

  return (
    <div className='fixed inset-0 bg-white z-[9999]'>
      <YandexMap
        mode='confirm'
        center={[Number(selected.lat), Number(selected.lng)]}
        zoom={16}
        height={900}
        selectedPoint={selected}
        onAddressSelect={(addr) => {
          setSelected(addr);
        }}
      />

      <div className='absolute bottom-0 w-full p-4 bg-white shadow space-y-3'>
        <div className='flex items-start gap-2'>
          <img src='icon/mobile-menu/location_on.svg' className='mt-0.5' />
          <p className='font-medium'>{selected.address}</p>
        </div>

        <button
          onClick={() => onConfirm(selected)}
          className='w-full bg-[#4EBC73] text-white p-3 rounded-[10px] font-medium'
        >
          Подтвердить адрес
        </button>

        <button
          onClick={onClose}
          className='w-full bg-[#F5F5F5] p-3 text-[#343434] rounded-[10px] font-medium'
        >
          Назад
        </button>
      </div>
    </div>
  );
}
