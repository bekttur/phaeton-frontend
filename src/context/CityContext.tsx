import { createContext, useContext, useState, type ReactNode } from 'react';

interface CityContextType {
  city: string | null;
  setCity: (city: string | null) => void;
}

const STORAGE_KEY = 'fra:selected_city';

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCityState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  const setCity = (newCity: string | null) => {
    setCityState(newCity);

    if (newCity) {
      localStorage.setItem(STORAGE_KEY, newCity);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) throw new Error('useCity must be used within CityProvider');
  return context;
};
