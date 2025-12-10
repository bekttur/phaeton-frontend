import { createContext, useContext, useState } from 'react';

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
  const [loadingCount, setLoadingCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  let interval: any = null;

  const startRequest = () => {
    setLoadingCount((prev) => prev + 1);

    if (!loading) {
      setLoading(true);
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 200);
    }
  };

  const finishRequest = () => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));

    if (loadingCount <= 1) {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setLoading(false);
      }, 200);
    }
  };

  return (
    <LoaderContext.Provider value={{ startRequest, finishRequest, progress, loading }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
          <div
            className="h-1 bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};
