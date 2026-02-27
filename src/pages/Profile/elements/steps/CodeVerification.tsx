import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface CodeVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

function CodeVerification({
  phoneNumber,
  onVerified,
  onBack,
  isLoading,
}: CodeVerificationProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      if (newCode.every((digit) => digit !== '')) {
        setTimeout(() => {
          onVerified();
        }, 500);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maskedPhone = phoneNumber.replace(
    /(\d{2})(\*\*\s\*\*\*\s)(\d{2}\s\d{2})/,
    '$1** *** $3',
  );

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
      {isLoading && (
        <div className='fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center'>
          <div className='w-12 h-12 p-1 bg-white rounded-full'>
            <div className='w-10 h-10 border-[3px] border-t-[#4EBC73] border-l-[#4EBC73] border-b-[#4EBC73] border-white rounded-full animate-spin'></div>
          </div>
        </div>
      )}

      <div className='max-w-2xl mx-auto'>
        <button
          onClick={onBack}
          className='mb-4 hover:bg-gray-100 rounded-lg transition-colors'
        >
          <ArrowLeft className='w-6 h-6' />
        </button>

        <h1 className='text-2xl font-bold mb-4'>Подтвердите номер телефона</h1>

        <p className='text-[#636366] mb-2'>
          Код отправлен на номер {maskedPhone}
        </p>

        <button
          onClick={onBack}
          className='text-[#4EBC73] font-semibold mb-6 hover:text-green-700 transition-colors'
        >
          Изменить номер
        </button>

        <div className='flex gap-2 mb-8'>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className='w-16 h-16 text-center text-2xl font-semibold bg-[#EAECED] rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-shadow'
            />
          ))}
        </div>

        <p className='text-[#636366] text-sm'>
          Отправить код повторно через {formatTime(timer)}
        </p>
      </div>
    </div>
  );
}

export default CodeVerification;
