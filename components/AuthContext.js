import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Aqui você pode verificar se o token de sessão existe
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Ou use cookies
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const login = async (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/'); // Redireciona para página inicial após logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
}
