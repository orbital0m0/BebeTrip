import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types/index';
import api from '../services/api';
import { mockUser } from '../services/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      // Mock 모드에서는 자동으로 로그인 상태로 설정
      setUser(mockUser);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    if (USE_MOCK) {
      setUser(mockUser);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string) => {
    if (USE_MOCK) {
      setUser(mockUser);
      return;
    }
    localStorage.setItem('token', token);
    fetchUser();
  };

  const logout = () => {
    if (USE_MOCK) {
      setUser(null);
      return;
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
