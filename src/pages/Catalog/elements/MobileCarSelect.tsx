import { X, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface CarSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: {
    brand: string;
    model: string;
    year: string;
    modification: string;
  }) => void;
}

const BRANDS = [
  'Abarth',
  'Audi',
  'BMW',
  'Chevrolet',
  'Dodge',
  'Ferrari',
  'Ford',
  'Honda',
  'Hyundai',
  'Jaguar',
  'Kia',
  'Lexus',
  'Mazda',
  'Mercedes',
  'Nissan',
  'Peugeot',
  'Renault',
  'Subaru',
  'Toyota',
  'Volkswagen',
];

const MODELS: Record<string, string[]> = {
  Audi: ['RS 6', 'RS 5', 'A4', 'A6'],
  BMW: ['M3', 'X5', 'X6'],
  Toyota: ['Corolla', 'Camry', '4Runner'],
};

const YEARS: Record<string, string[]> = {
  'RS 6': ['2019', '2020', '2021'],
  M3: ['2018', '2019', '2020'],
  Corolla: ['2017', '2018', '2019'],
};

const MODIFICATIONS: Record<string, string[]> = {
  '2019': ['1.4 V6 Turbo', '1.8 V6 Turbo'],
  '2020': ['2.0 V6 Turbo'],
};

// кастомная RADIO кнопка
const Radio = ({ active }: { active: boolean }) => (
  <div
    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      active ? 'border-[#4EBC73]' : 'border-gray-400'
    }`}
  >
    {active && <div className="w-3 h-3 rounded-full bg-[#4EBC73]" />}
  </div>
);

const MobileCarSelect = ({ isOpen, onClose, onConfirm }: CarSelectProps) => {
  const [step, setStep] = useState<'brand' | 'model' | 'year' | 'modification'>(
    'brand'
  );

  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedModification, setSelectedModification] = useState('');

  // блокировка скролла
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredBrands = useMemo(() => {
    if (!query.trim()) return BRANDS;
    return BRANDS.filter((b) => b.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredModels = useMemo(() => {
    if (!selectedBrand) return [];
    const models = MODELS[selectedBrand] || [];
    if (!query.trim()) return models;
    return models.filter((m) => m.toLowerCase().includes(query.toLowerCase()));
  }, [selectedBrand, query]);

  const filteredYears = useMemo(() => {
    if (!selectedModel) return [];
    const years = YEARS[selectedModel] || [];
    if (!query.trim()) return years;
    return years.filter((y) => y.includes(query));
  }, [selectedModel, query]);

  const filteredMods = useMemo(() => {
    if (!selectedYear) return [];
    const mods = MODIFICATIONS[selectedYear] || [];
    if (!query.trim()) return mods;
    return mods.filter((m) => m.toLowerCase().includes(query.toLowerCase()));
  }, [selectedYear, query]);

  const handleSelect = (value: string) => {
    if (step === 'brand') {
      setSelectedBrand(value);
    } else if (step === 'model') {
      setSelectedModel(value);
    } else if (step === 'year') {
      setSelectedYear(value);
    } else if (step === 'modification') {
      setSelectedModification(value);
    }
  };

  // кнопка "Выбрать" → переход по шагам
  const handleNext = () => {
    if (step === 'brand') setStep('model');
    else if (step === 'model') setStep('year');
    else if (step === 'year') setStep('modification');
    else handleConfirm(); // последний шаг → финальное подтверждение

    setQuery('');
  };

  const handleConfirm = () => {
    onConfirm({
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      modification: selectedModification,
    });

    // сброс состояния
    setStep('brand');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedModification('');
    setQuery('');
    onClose();
  };

  const isStepReady =
    (step === 'brand' && selectedBrand) ||
    (step === 'model' && selectedModel) ||
    (step === 'year' && selectedYear) ||
    (step === 'modification' && selectedModification);

  // данные для текущего шага
  let items: string[] = [];
  if (step === 'brand') items = filteredBrands;
  else if (step === 'model') items = filteredModels;
  else if (step === 'year') items = filteredYears;
  else if (step === 'modification') items = filteredMods;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-0" onClick={onClose} />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F6F6F6] rounded-t-3xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ minHeight: '85vh' }}
      >
        {/* шапка */}
        <div className="sticky top-0 z-10 pb-3 px-4 pt-5 flex flex-col gap-5 bg-[#F6F6F6]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {step === 'brand'
                ? 'Выбор марки'
                : step === 'model'
                ? 'Выбор модели'
                : step === 'year'
                ? 'Выбор года'
                : 'Выбор модификации'}
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8] hover:bg-gray-100"
            >
              <X width={16} height={16} color="#8C8C8C" />
            </button>
          </div>

          {/* поиск */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width={18}
              height={18}
              color="#AEAEB2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-[42px] pl-10 pr-3 bg-[#EAECED] rounded-[10px] text-sm focus:outline-none"
              placeholder="Поиск..."
            />
          </div>
        </div>

        {/* список */}
        <div
          className="overflow-y-auto px-4 pb-10 pt-5 flex flex-col gap-2"
          style={{ maxHeight: '70vh' }}
        >
          {items.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-2 py-3 border-b last:border-none flex items-center justify-between"
            >
              <div
                className={`text-base ${
                  (step === 'brand' && selectedBrand === item) ||
                  (step === 'model' && selectedModel === item) ||
                  (step === 'year' && selectedYear === item) ||
                  (step === 'modification' && selectedModification === item)
                    ? 'text-[#4EBC73] font-medium'
                    : 'text-gray-900'
                }`}
              >
                {item}
              </div>

              <Radio
                active={
                  (step === 'brand' && selectedBrand === item) ||
                  (step === 'model' && selectedModel === item) ||
                  (step === 'year' && selectedYear === item) ||
                  (step === 'modification' && selectedModification === item)
                }
              />
            </button>
          ))}
        </div>

        {/* кнопка выбрать */}
        {isStepReady && (
          <div className="absolute bottom-2 w-full px-4 pb-6">
            <button
              onClick={handleNext}
              className="w-full h-12 rounded-xl bg-[#4EBC73] text-white text-base font-semibold"
            >
              Выбрать
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileCarSelect;
