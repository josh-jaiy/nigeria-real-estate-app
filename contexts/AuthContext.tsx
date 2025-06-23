'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'buyer' | 'landlord' | 'manager' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  isVerified: boolean;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  address?: string;
  city?: string;
  state?: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      const { access_token, user: userData } = response.data;

      // Store in localStorage
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update state
      setToken(access_token);
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authApi.register(userData);
      const { access_token, user: newUser } = response.data;

      // Store in localStorage
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Update state
      setToken(access_token);
      setUser(newUser);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    // Clear state
    setToken(null);
    setUser(null);

    // Redirect to login page
    window.location.href = '/auth/login';
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    try {
      if (!token) return;
      
      const response = await authApi.getProfile();
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error refreshing user:', error);
      // If refresh fails, logout user
      logout();
    }
  };

  // Computed values
  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();

    // Show loading spinner while checking auth
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return null;
    }

    // Check role permissions
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Hook for role-based access
export function useRole() {
  const { user } = useAuth();
  
  return {
    role: user?.role,
    isBuyer: user?.role === 'buyer',
    isLandlord: user?.role === 'landlord',
    isManager: user?.role === 'manager',
    isAdmin: user?.role === 'admin',
    hasRole: (roles: string[]) => user ? roles.includes(user.role) : false,
  };
}
