import React, { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const phoneLogin = async (phone: string) => {
    const verifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    }, auth);

    try {
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(result);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const verifyOtp = async (otp: string) => {
    if (!confirmationResult) return false;
    try {
      await confirmationResult.confirm(otp);
      setIsAuthenticated(true);  // Set the user as authenticated after successful OTP verification
      return true;
    } catch (error) {
      console.error('OTP verification failed', error);
      return false;
    }
  };

  const login = () => {
    setIsAuthenticated(true);  // Log in user by setting the authentication state to true
  };

  const logout = () => {
    setIsAuthenticated(false); // Log out by resetting the authentication state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, phoneLogin, verifyOtp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
