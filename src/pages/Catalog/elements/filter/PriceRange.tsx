import { useState, useRef, useEffect } from 'react';

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  min?: number;
  max?: number;
}

function PriceRange({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 100000,
}: PriceRangeProps) {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleMouseDown = (type: 'min' | 'max') => {
    setIsDragging(type);
  };

  const updateValueByClientX = (clientX: number) => {
    if (!isDragging || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const value = Math.round((percentage / 100) * (max - min) + min);

    if (isDragging === 'min' && value < maxPrice) {
      onMinChange(value);
    } else if (isDragging === 'max' && value > minPrice) {
      onMaxChange(value);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateValueByClientX(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minPrice, maxPrice]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      updateValueByClientX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, minPrice, maxPrice]);

  const minPercentage = getPercentage(minPrice);
  const maxPercentage = getPercentage(maxPrice);

  return (
    <div className='space-y-6'>
      <div className='flex gap-3'>
        <div className='flex-1 px-4 py-3 bg-[#EAECED] rounded-[10px] text-black font-medium'>
          {minPrice.toLocaleString('ru-RU')} ₸
        </div>
        <div className='flex-1 px-4 py-3 bg-[#EAECED] rounded-[10px] text-black font-medium'>
          {maxPrice.toLocaleString('ru-RU')} ₸
        </div>
      </div>

      <div className='relative pt-2 pb-2'>
        <div ref={trackRef} className='relative h-1 bg-[#EAECED] rounded-full'>
          <div
            className='absolute h-1 bg-[#B8E4C7] rounded-full'
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`,
            }}
          />
        </div>

        <button
          className='absolute w-7 h-7 bg-[#4EBC73] rounded-full -mt-4 cursor-pointer shadow-lg hover:scale-110 transition-transform'
          style={{ left: `${minPercentage}%`, transform: 'translateX(-50%)' }}
          onMouseDown={() => handleMouseDown('min')}
          onTouchStart={() => handleMouseDown('min')}
        />

        <button
          className='absolute w-7 h-7 bg-[#4EBC73] rounded-full -mt-4 cursor-pointer shadow-lg hover:scale-110 transition-transform'
          style={{ left: `${maxPercentage}%`, transform: 'translateX(-50%)' }}
          onMouseDown={() => handleMouseDown('max')}
          onTouchStart={() => handleMouseDown('max')}
        />
      </div>
    </div>
  );
}

export default PriceRange;
