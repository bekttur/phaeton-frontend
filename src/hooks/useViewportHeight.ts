import { useEffect, useState } from 'react';

export const useViewportHeight = () => {
  const [height, setHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener('resize', updateHeight);
    window.visualViewport?.addEventListener('scroll', updateHeight);

    updateHeight();

    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight);
      window.visualViewport?.removeEventListener('scroll', updateHeight);
    };
  }, []);

  return height;
};
