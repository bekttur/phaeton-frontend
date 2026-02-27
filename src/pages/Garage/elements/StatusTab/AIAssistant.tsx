import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const rawText = [
  'BMX X5 2024 в отличной форме 💪',
  'Через 1800 км пора поменять масло — я подскажу, где лучше',
  'Для вашей машины сейчас часто берут масло Liqui Moly 5W-30',
];

export function AIAssistant() {
  const [thinking, setThinking] = useState(true);
  const [sentences, setSentences] = useState<string[][]>([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    if (thinking) {
      const timer = setTimeout(() => {
        setThinking(false);
        setSentences(rawText.map(() => []));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [thinking]);

  useEffect(() => {
    if (thinking) return;
    if (currentSentence >= rawText.length) return;

    const words = rawText[currentSentence].split(' ');

    if (currentWord >= words.length) {
      setCurrentSentence(prev => prev + 1);
      setCurrentWord(0);
      return;
    }

    const timeout = setTimeout(() => {
      setSentences(prev => {
        const updated = [...prev];
        updated[currentSentence] = [
          ...updated[currentSentence],
          words[currentWord],
        ];
        return updated;
      });

      setCurrentWord(prev => prev + 1);
    }, 180);

    return () => clearTimeout(timeout);
  }, [thinking, currentSentence, currentWord]);

  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center'>
          <img
            className='w-6 h-6'
            src={`${import.meta.env.BASE_URL}icon/assistent.svg`}
            alt=''
          />
        </div>
        <div>
          <h3 className='font-semibold text-[#303A45] mb-[-3px]'>Freedom AI</h3>
          <p className='text-sm text-[#636366]'>ваш умный ассистент</p>
        </div>
      </div>

      <div className='space-y-3 mb-4 bg-[#F7F7F7] p-3 rounded-[10px] min-h-[80px]'>
        {thinking ? (
          <div className='flex items-center gap-2 text-[#242424] font-medium'>
            <div className='loader-wrapper'>
              <span className='loader-letter'>С</span>
              <span className='loader-letter'>о</span>
              <span className='loader-letter'>б</span>
              <span className='loader-letter'>и</span>
              <span className='loader-letter'>р</span>
              <span className='loader-letter'>а</span>
              <span className='loader-letter'>ю</span>
              {' '}
              <span className='loader-letter'>д</span>
              <span className='loader-letter'>а</span>
              <span className='loader-letter'>н</span>
              <span className='loader-letter'>н</span>
              <span className='loader-letter'>ы</span>
              <span className='loader-letter'>е</span>
              <span className='loader-letter'>.</span>
              <span className='loader-letter'>.</span>
              <span className='loader-letter'>.</span>
              <div className='loader-circle'></div>
            </div>
          </div>
        ) : (
          sentences.map((sentence, i) => (
            <p key={i} className='text-base text-[#242424]'>
              {sentence.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {word + ' '}
                </motion.span>
              ))}
            </p>
          ))
        )}
      </div>

      <button className='w-full py-3 bg-[#EAECED] rounded-2xl text-[#636366] font-medium'>
        Посмотреть
      </button>
    </div>
  );
}