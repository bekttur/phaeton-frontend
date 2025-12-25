import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import YandexMap from './YandexMap';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  city?: string | null;
  onSelect: (address: string) => void;
};
const CITY_COORDS: Record<string, [number, number]> = {
  Алматы: [43.238949, 76.889709],
  Астана: [51.169392, 71.449074],
  Шымкент: [42.315514, 69.586907],
  Актобе: [50.283937, 57.166978],
};


const ShowInCartModal = ({ isOpen, onClose, city, onSelect }: Props) => {
  const [address, setAddress] = useState('');
  const cityCenter = city && CITY_COORDS[city] ? CITY_COORDS[city] : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className='fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 h-[80vh] flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className='p-4 border-b flex justify-between'>
              <h2 className='text-xl font-semibold'>Укажите адрес на карте</h2>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* map */}
            <div className='p-4'>
              <YandexMap
                mode='click'
                center={cityCenter}
                zoom={12}
                onAddressSelect={(addr) => {
                  setAddress(addr);
                }}
              />
            </div>

            {/* selected address */}
            <div className='p-4 border-t text-sm font-medium'>
              {(address && (
                <div className='flex items-center gap-2'>
                  <img src='icon/mobile-menu/location_on.svg' />
                  <span className='font-semibold text-base text-black'>
                    {address}
                  </span>
                </div>
              )) ||
                'Кликните по карте'}
            </div>

            {/* confirm */}
            <div className='px-4 pb-4'>
              <button
                disabled={!address}
                onClick={() => {
                  onSelect(address);
                  onClose();
                }}
                className='w-full bg-[#4EBC73] text-white py-3 rounded-xl disabled:bg-gray-300'
              >
                Выбрать
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShowInCartModal;
