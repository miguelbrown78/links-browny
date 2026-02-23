import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, UserSession } from '../lib/login';
import { deleteItem, getItem, saveItem } from '../lib/storage';

const SESSION_KEY = 'user_session';

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const stored = await getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // sesión inválida, ignorar
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const session = await loginUser(email, password);
    await saveItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
  }

  async function logout() {
    await deleteItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}