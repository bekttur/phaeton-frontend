import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

import YandexMap from './YandexMap';
import { type PickupPoint } from '../constants/pickupPoints';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  points: PickupPoint[];
  onSelect: (address: string) => void;
};


export default function ShowInCartModalWithList({
  isOpen,
  onClose,
  points,
  onSelect,
}: Props) {
  const [mode, setMode] = useState<'list' | 'map'>('list');
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={onClose}
          />

          <motion.div
            className='fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl z-50 min-h-[80vh] flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className='p-4 flex justify-between items-center'>
              <h2 className='text-xl font-semibold'>Пункт выдачи</h2>
              <X onClick={onClose} className='cursor-pointer' />
            </div>

            {/* switch */}
            <div className='flex gap-2 px-4'>
              <button
                onClick={() => setMode('list')}
                className={`w-1/2 py-3 rounded ${
                  mode === 'list' ? 'bg-[#4EBC73] text-white' : 'bg-[#E3E5E6]'
                }`}
              >
                Списком
              </button>
              <button
                onClick={() => setMode('map')}
                className={`w-1/2 py-3 rounded ${
                  mode === 'map' ? 'bg-[#4EBC73] text-white' : 'bg-[#E3E5E6]'
                }`}
              >
                На карте
              </button>
            </div>

            {/* content */}
            <div className='flex-1 overflow-y-auto px-3 mt-3'>
              {mode === 'list' && (
                <div className='p-2 space-y-3 bg-white rounded-[10px]'>
                  {points.map((point) => (
                    <div
                      key={point.id}
                      onClick={() => setSelectedPoint(point)}
                      className={`p-3 rounded border cursor-pointer ${
                        selectedPoint?.id === point.id
                          ? 'border-[#4EBC73] bg-green-50 border-b-[#4EBC73]'
                          : 'border-white border-b border-b-[#EAECED]'
                      }`}
                    >
                      <div className='rounded-[10px] flex items-center gap-2'>
                        <img src='icon/mobile-menu/location_on.svg' />
                        <span className='text-lg font-medium text-black'>
                          {point.address}
                        </span>
                      </div>
                      <p className='text-sm text-gray-500'>
                        Режим работы: {point.workTime}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {mode === 'map' && (
                <YandexMap
                  mode='points'
                  points={points}
                  onPointSelect={setSelectedPoint}
                />
              )}
            </div>

            {/* footer */}
            {selectedPoint && (
              <div className='p-4 border-t bg-white'>
                <button
                  onClick={() => {
                    onSelect(selectedPoint.address);
                    onClose();
                  }}
                  className='w-full bg-[#4EBC73] text-white py-3 rounded-xl'
                >
                  Выбрать пункт выдачи
                  <div className='text-sm opacity-90'>
                    {selectedPoint.address}
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
