import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import AuthStep from './AuthStep';
import BrandStep from './BrandStep';
import SeriesStep from './SeriesStep';
import KTypesStep from './KTypesStep';

type Step = 'brand' | 'series' | 'ktype';

const MobileModelSelect = ({ isOpen, onClose, onConfirm }: any) => {
  const { isAuthenticated } = useAuth();

  const [step, setStep] = useState<Step>('brand');
  const [brand, setBrand] = useState<any | null>(null);
  const [series, setSeries] = useState<any | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('brand');
      setBrand(null);
      setSeries(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-[60] transition-opacity duration-300
          ${
            isOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      />

      {/* BOTTOM SHEET */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl z-[70]
          transform transition-transform duration-300 ease-out min-h-[85vh]
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className='bg-[#F6F6F6] w-full rounded-t-[20px] p-4 flex flex-col max-h-[85vh]'>
          {!isAuthenticated && <AuthStep />}

          {isAuthenticated && step === 'brand' && (
            <BrandStep
              onClose={onClose}
              onSelect={(b) => {
                setBrand(b);
                setStep('series');
              }}
            />
          )}

          {isAuthenticated && step === 'series' && brand && (
            <SeriesStep
              brand={brand}
              onBack={() => setStep('brand')}
              onConfirm={(s) => {
                setSeries(s);
                setStep('ktype');
              }}
              onClose={onClose}
            />
          )}

          {isAuthenticated && step === 'ktype' && brand && series && (
            <KTypesStep
              onClose={onClose}
              brand={brand}
              series={series}
              onBack={() => setStep('series')}
              onConfirm={(ktype) => {
                onConfirm({ brand, series, ktype });
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MobileModelSelect;
