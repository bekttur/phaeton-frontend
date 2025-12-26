import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';

import YandexMap from './YandexMap';
import { useRetailCity } from '../../../hooks/useData';


type Props = {
  isOpen: boolean;
  onClose: () => void;
  city?: string | null;
  onSelect: (address: string) => void;
};

const parseLatLng = (latLng?: string): [number, number] | undefined => {
  if (!latLng) return undefined;
  const [lat, lng] = latLng.split(',').map(Number);
  return Number.isFinite(lat) && Number.isFinite(lng)
    ? [lat, lng]
    : undefined;
};

const ShowInCartModal = ({ isOpen, onClose, city, onSelect }: Props) => {
  const [address, setAddress] = useState('');

  const { data: cities } = useRetailCity();

  const cityCenter = useMemo(() => {
    if (!city || !cities) return undefined;

    const cityObj = cities.find((c: any) => c.Name === city);
    return parseLatLng(cityObj?.LatLng);
  }, [city, cities]);

  const getCityBounds = (
    center?: [number, number],
    delta = 0.25
  ): [[number, number], [number, number]] | undefined => {
    if (!center) return;

    const [lat, lng] = center;

    return [
      [lat - delta, lng - delta],
      [lat + delta, lng + delta],
    ];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={onClose}
          />

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
                bounds={getCityBounds(cityCenter)}
                onAddressSelect={setAddress}
              />
            </div>

            {/* selected address */}
            <div className='p-4 border-t text-sm font-medium'>
              {address ? (
                <div className='flex items-center gap-2'>
                  <img src='icon/mobile-menu/location_on.svg' />
                  <span className='font-semibold text-base text-black'>
                    {address}
                  </span>
                </div>
              ) : (
                'Кликните по карте'
              )}
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
