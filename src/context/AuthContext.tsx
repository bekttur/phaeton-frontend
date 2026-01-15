import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  TECDOC_TOKEN_KEY,
  TECDOC_EXPIRES_KEY,
} from '../api/constants/auth';

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(TECDOC_TOKEN_KEY)
  );

  const [expiresAt, setExpiresAt] = useState<string | null>(
    localStorage.getItem(TECDOC_EXPIRES_KEY)
  );

  const isAuthenticated = useMemo(() => {
    if (!accessToken || !expiresAt) return false;
    return new Date(expiresAt).getTime() > Date.now();
  }, [accessToken, expiresAt]);

  // ❌ logout при истёкшем токене
  useEffect(() => {
    if (!expiresAt) return;

    const timeout = setTimeout(() => {
      logout();
    }, new Date(expiresAt).getTime() - Date.now());

    return () => clearTimeout(timeout);
  }, [expiresAt]);

  const loginMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const { data } = await axios.post(
        'https://api-tecdoc.phaeton.kz/auth/login',
        { username, password }
      );
      return data;
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setExpiresAt(data.expiresAtUtc);

      localStorage.setItem(TECDOC_TOKEN_KEY, data.accessToken);
      localStorage.setItem(TECDOC_EXPIRES_KEY, data.expiresAtUtc);
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = () => {
    setAccessToken(null);
    setExpiresAt(null);
    localStorage.removeItem(TECDOC_TOKEN_KEY);
    localStorage.removeItem(TECDOC_EXPIRES_KEY);
  };

  // 🔑 Авто-логин при старте приложения, если токена нет или просрочен
  useEffect(() => {
    if (!isAuthenticated) {
      login('admin', '1234').catch(console.error);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
