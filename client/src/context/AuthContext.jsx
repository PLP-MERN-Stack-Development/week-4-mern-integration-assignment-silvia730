import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getCurrentUser());

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsAuthenticated(!!authService.getCurrentUser());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
