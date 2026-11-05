'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'admin' | 'wholesale';
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (email: string, role?: 'customer' | 'admin' | 'wholesale') => void;
  logout: () => void;
  quickAdminLogin: () => void;
  quickCustomerLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tantukala_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to a guest state, or provide a customer session
        // We'll leave user as null until logged in
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (email: string, role: 'customer' | 'admin' | 'wholesale' = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: role === 'admin' ? 'Tantukala Creative Director' : 'Ananya Deshmukh',
      role,
      phone: '+91 98201 44552',
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const quickAdminLogin = () => {
    const adminUser: UserProfile = {
      id: 'admin-master',
      email: 'admin@tantukaladesigns.com',
      fullName: 'Tantukala Curatorial Admin',
      role: 'admin',
      phone: '+91 93199 27100',
    };
    setUser(adminUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
  };

  const quickCustomerLogin = () => {
    const customerUser: UserProfile = {
      id: 'cust-demo',
      email: 'ananya.d@heritage.in',
      fullName: 'Ananya Deshmukh',
      role: 'customer',
      phone: '+91 98201 44552',
    };
    setUser(customerUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(customerUser));
  };

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoggedIn,
        login,
        logout,
        quickAdminLogin,
        quickCustomerLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
