import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  getSessionUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../lib/auth';
import type { AuthResult, AuthUser } from '../lib/auth';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
    confirm: string,
  ) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Состояние авторизации: сессия читается из localStorage при старте */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.ok) setUser(result.user);
    return result;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, confirm: string) => {
      const result = await registerUser(name, email, password, confirm);
      if (result.ok) setUser(result.user);
      return result;
    },
    [],
  );

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
