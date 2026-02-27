import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'kz', label: 'Қазақша' },
];

const LanguageSwitcherSheet = ({
  isOpen,
  onClose,
}: LanguageSwitcherSheetProps) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-[80] transition-opacity'
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-[90] transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='px-4 py-2'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-xl font-semibold text-gray-900'>Язык сайта</h2>
            <button
              onClick={onClose}
              className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition'
            >
              <X width={24} height={24} color='#666' />
            </button>
          </div>

          <div className='space-y-2'>
            {languages.map((lang) => {
              const isSelected = i18n.language === lang.code;

              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className='w-full flex items-center justify-between px-4 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition'
                >
                  <span
                    className={`text-lg font-medium ${
                      isSelected ? 'text-[#4CAF50]' : 'text-gray-900'
                    }`}
                  >
                    {lang.label}
                  </span>
                  {isSelected && (
                    <Check width={24} height={24} color='#4CAF50' />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSwitcherSheet;
