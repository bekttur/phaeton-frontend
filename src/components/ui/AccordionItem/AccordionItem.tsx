import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='bg-white rounded-md overflow-hidden border border-gray-100'>
      <button
        onClick={() => children && setIsOpen(!isOpen)}
        className='w-full px-4 py-3 flex items-center justify-between text-left transition-colors'
      >
        <span className='text-base text-[#565656] font-semibold'>{title}</span>
        {children && (
          <ChevronDown
            className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </button>

      {children && isOpen && (
        <div className='border-t border-gray-100'>{children}</div>
      )}
    </div>
  );
};
