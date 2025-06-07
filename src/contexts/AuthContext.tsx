import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { AuthService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: 'student' | 'teacher') => Promise<void>;
  isLoading: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('projectbloom_theme') as 'light' | 'dark';
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Set up auth state listener
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthService.signIn(email, password);
      // User state will be updated by the auth state listener
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'teacher') => {
    setIsLoading(true);
    try {
      await AuthService.signUp(email, password, name, role);
      // User state will be updated by the auth state listener
    } catch (error: any) {
      setIsLoading(false);
      throw error;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('projectbloom_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};