import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}

function FilterSelect({ value, options, onChange }: FilterSelectProps) {
  return (
    <div className='relative'>
      <button className='w-full px-4 py-3 bg-[#EAECED] rounded-[10px] flex items-center justify-between text-left text-black hover:bg-[#d9dcde] transition-colors'>
        <span>{value}</span>
        <ChevronDown className='w-5 h-5 text-[#8C8C8C]' />
      </button>
    </div>
  );
}

export default FilterSelect;
