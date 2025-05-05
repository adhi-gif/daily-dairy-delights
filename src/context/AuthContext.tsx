
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  phoneLogin: (phone: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Dairy Lane, Milk City',
  phone: '555-123-4567'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to authenticate the user
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email === 'test@example.com' && password === 'password') {
        setUser(mockUser);
        toast.success('Successfully logged in');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const phoneLogin = async (phone: string): Promise<boolean> => {
    // In a real app, this would send an OTP to the phone number
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, assume OTP was sent successfully
      toast.success('OTP sent to your phone');
      return true;
    } catch (error) {
      toast.error('Failed to send OTP');
      return false;
    }
  };

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    // In a real app, this would verify the OTP with the backend
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, assume any 6-digit OTP is valid
      if (otp.length === 6) {
        const phoneUser: User = {
          ...mockUser,
          phone: phone
        };
        
        setUser(phoneUser);
        toast.success('Successfully logged in');
        return true;
      } else {
        toast.error('Invalid OTP');
        return false;
      }
    } catch (error) {
      toast.error('OTP verification failed');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to register the user
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, just check if email is already used
      if (email === 'test@example.com') {
        toast.error('Email already registered');
        return false;
      }
      
      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      setUser(newUser);
      toast.success('Registration successful');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login, 
        register,
        phoneLogin,
        verifyOtp,
        logout 
      }}
    >
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
