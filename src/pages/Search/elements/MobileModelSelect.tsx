import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import AuthStep from './AuthStep';
import BrandStep from './BrandStep';
import SeriesStep from './SeriesStep';
import KTypesStep from './KTypesStep';
import { GlobalBottomSheet } from '../../../components/ui/GlobalBottomSheet/GlobalBottomSheet';

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
    <GlobalBottomSheet isOpen={isOpen} onClose={onClose}>
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
    </GlobalBottomSheet>
  );
};

export default MobileModelSelect;
