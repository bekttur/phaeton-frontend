import { createContext, useContext, useEffect, useState } from 'react';
import { BACKEND_FRA_TOKEN_KEY } from '../api/constants/auth';
import { removeSessionId } from '../shared/lib/session';
import { useUserMe } from '../hooks/useData';
import { CONTACT_STORAGE_KEY } from '../pages/Basket/constants/storage';

interface AccessTokenContextType {
  token: string | null;
  user: any | null;
  refetchUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined,
);

export const AccessTokenProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setTokenState] = useState<string | null>(null);

  const { data: user, isLoading, refetch: refetchUser } = useUserMe(token);

  useEffect(() => {
    const storedToken = localStorage.getItem(BACKEND_FRA_TOKEN_KEY);
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(BACKEND_FRA_TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(BACKEND_FRA_TOKEN_KEY);
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
    removeSessionId();

    localStorage.removeItem(CONTACT_STORAGE_KEY);
  };

  return (
    <AccessTokenContext.Provider
      value={{
        token,
        user: user ?? null,
        refetchUser,
        isAuthenticated: !!user,
        isLoading,
        setToken,
        logout,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AccessTokenContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
