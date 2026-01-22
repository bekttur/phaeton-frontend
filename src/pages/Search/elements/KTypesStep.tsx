import { useMemo, useState } from 'react';
import { useKTypes, useShowVehicleByKType } from '../../../hooks/useModel';
import { ChevronLeft, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  brand: any;
  series: any;
  onBack: () => void;
  onConfirm: (ktype: any) => void;
  onClose: () => void;
}

const KTypesStep = ({ brand, series, onBack, onClose }: Props) => {
  const [selected, setSelected] = useState<any | null>(null);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const { data: ktypes, isLoading } = useKTypes(brand.id, series.id, true);
  const showVehicleMutation = useShowVehicleByKType();

  const grouped = useMemo(() => {
    if (!ktypes) return {};

    const normalizedQuery = query.trim().toLowerCase();

    const filtered = !normalizedQuery
      ? ktypes
      : ktypes.filter(
          (item: any) =>
            item.desc?.toLowerCase().includes(normalizedQuery) ||
            item.engine?.type?.toLowerCase().includes(normalizedQuery),
        );

    return filtered.reduce((acc: Record<string, any[]>, item: any) => {
      const key = item.engine?.type || 'Другое';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [ktypes, query]);

  const handleConfirm = async () => {
    if (!selected) return;

    try {
      const data = await showVehicleMutation.mutateAsync(selected.ktype);
      onClose();
      navigate('/catalog', {
        state: {
          vehicle: data,
          brand,
          series,
          ktype: selected,
        },
      });
    } catch (e) {
      console.error('Ошибка получения автомобиля', e);
    }
  };

  {
    !isLoading && Object.keys(grouped).length === 0 && (
      <p className='text-center text-gray-400 mt-10'>Ничего не найдено</p>
    );
  }

  return (
    <>
      <div className='sticky top-0 z-10 py-4 flex flex-col gap-5 bg-[#F6F6F6]'>
        <div className='flex items-center justify-between'>
          <button onClick={onBack}>
            <ChevronLeft size={24} color='#8E8E93' />
          </button>
          <h2 className='text-lg font-semibold'>Модификация</h2>
          <button
            onClick={onClose}
            className='w-6 h-6 flex items-center justify-center rounded-full bg-[#E3E6E8]'
          >
            <X width={16} height={16} color='#8C8C8C' />
          </button>
        </div>

        <div className='relative'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2'
            width={18}
            height={18}
            color='#AEAEB2'
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Поиск комплектации'
            className='w-full h-[42px] pl-10 pr-3 bg-[#EAECED] rounded-[10px] text-base focus:outline-none'
          />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto mb-16'>
        {isLoading && <p>Загрузка...</p>}

        {Object.entries(grouped).map(([type, items]: any) => (
          <div key={type} className='mb-4 bg-white rounded-xl mt-3'>
            <div className='text-base font-semibold text-gray-500 p-3 pb-0'>
              {type}
            </div>

            {items.map((item: any) => {
              const checked = selected?.ktype === item.ktype;

              return (
                <button
                  key={item.ktype}
                  onClick={() => setSelected(item)}
                  className='w-full flex items-center justify-between px-4 py-4 border-b last:border-none'
                >
                  <div className='text-base'>{item.desc}</div>

                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      checked ? 'border-[#4EBC73]' : 'border-gray-300'
                    }`}
                  >
                    {checked && (
                      <span className='w-2.5 h-2.5 rounded-full bg-[#4EBC73]' />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className='absolute bottom-5 left-0 w-full px-4'>
        <button
          disabled={!selected || showVehicleMutation.isPending}
          onClick={handleConfirm}
          className={`w-full py-3 rounded-xl text-white font-semibold ${
            selected ? 'bg-[#4EBC73]' : 'bg-gray-300'
          }`}
        >
          {showVehicleMutation.isPending ? 'Загрузка...' : 'Выбрать'}
        </button>
      </div>
    </>
  );
};

export default KTypesStep;
