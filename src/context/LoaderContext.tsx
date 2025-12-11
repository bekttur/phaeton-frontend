import { createContext, useContext, useState, useRef, useEffect } from 'react';

interface LoaderContextType {
  startRequest: () => void;
  finishRequest: () => void;
  progress: number;
  loading: boolean;
}

const LoaderContext = createContext<LoaderContextType>({
  startRequest: () => {},
  finishRequest: () => {},
  progress: 0,
  loading: false,
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  const [loadingCount, setLoadingCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRequest = () => {
    setLoadingCount((prev) => prev + 1);

    if (!loading) {
      setLoading(true);
      setProgress(0);

      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 200);
    }
  };

  const finishRequest = () => {
    setLoadingCount((prev) => {
      const newCount = Math.max(prev - 1, 0);

      if (newCount === 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setLoading(false);
        }, 300);
      }

      return newCount;
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ startRequest, finishRequest, progress, loading }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-gray-100">
          <div
            className="h-full bg-green-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            style={{
              width: `${progress}%`,
              maskImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,1) 40%, transparent)',
            }}
          />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
