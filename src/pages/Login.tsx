
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Authentication states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [name, setName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  
  // Dairy logo uploaded by the user
  const logoPath = '/lovable-uploads/4dd7c2a4-5185-40cc-86ba-30e08b9dfd7c.png';
  
  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to send OTP
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setShowOtpInput(true);
      toast.success('OTP sent to your phone');
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error('Please enter a valid OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock OTP verification (in real app, this would be an API call)
      // For demo, we'll accept any 6-digit code
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful login
      await login('test@example.com', 'password');
      navigate('/');
    } catch (error) {
      toast.error('OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateAccount(true);
  };
  
  const registerAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !registerPhone || registerPhone.length < 10) {
      toast.error('Please fill in all fields correctly');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would register the user via API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Show OTP input for verification
      setPhoneNumber(registerPhone);
      setShowOtpInput(true);
      setShowCreateAccount(false);
      toast.success('OTP sent to your phone');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#1e90ff] relative overflow-hidden">
      {/* Logo */}
      <img 
        src={logoPath} 
        alt="Dairy Products Logo" 
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-36 h-36 z-10 rounded-full border-3 border-black object-contain bg-white p-1"
      />
      
      {/* Bottom content box */}
      <div className="absolute bottom-0 bg-white w-full rounded-t-[40px] pt-16 pb-12 px-6 text-center shadow-[0_-4px_10px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-bold">
          <span className="text-[#1e90ff]">Dairy</span> Products
        </h1>
        <p className="text-xs tracking-wider mt-1 text-gray-700">DAILY DAIRY DELIVERY</p>
        
        <p className="text-gray-600 my-6 text-sm">
          "Wholesome taste, straight from the source". "Feel the freshness of farm-made dairy" 
          <br />
          <span className="font-bold">Get express delivery to your doorstep</span>
        </p>
        
        {!showOtpInput && !showCreateAccount ? (
          <div className="space-y-4">
            <Button 
              className="w-[90%] bg-[#1e90ff] hover:bg-[#0b75d1] text-white rounded-full py-6"
              onClick={() => setShowOtpInput(true)}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-[90%] border-2 border-[#1e90ff] text-[#1e90ff] hover:bg-[#e6f2ff] rounded-full py-6"
              onClick={handleCreateAccount}
            >
              Create an Account
            </Button>
          </div>
        ) : showCreateAccount ? (
          <form onSubmit={registerAccount} className="mt-6 space-y-4">
            <div className="text-left">
              <Label htmlFor="name" className="text-gray-700">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1"
                autoComplete="name"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="register-phone" className="text-gray-700">Phone Number</Label>
              <div className="flex items-center mt-1">
                <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-input">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <Input 
                  id="register-phone" 
                  type="tel" 
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="rounded-l-none"
                  autoComplete="tel"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-[#1e90ff] hover:bg-[#0b75d1] text-white rounded-full py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Register & Get OTP'}
              </Button>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              className="mt-4 text-gray-600"
              onClick={() => setShowCreateAccount(false)}
            >
              Back to Login
            </Button>
          </form>
        ) : (
          <>
            {!otpValue ? (
              <form onSubmit={requestOtp} className="mt-6 space-y-4">
                <div className="text-left">
                  <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                  <div className="flex items-center mt-1">
                    <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-input">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="rounded-l-none"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1e90ff] hover:bg-[#0b75d1] text-white rounded-full py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Get OTP'}
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-4 text-gray-600"
                  onClick={() => setShowOtpInput(false)}
                >
                  Back
                </Button>
              </form>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="text-left">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Enter OTP</Label>
                    <Button variant="link" className="text-[#1e90ff] p-0" onClick={requestOtp}>
                      Resend OTP
                    </Button>
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <InputOTP 
                      maxLength={6} 
                      value={otpValue} 
                      onChange={setOtpValue}
                      className="gap-2"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    A 6-digit code has been sent to {phoneNumber}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="button" 
                    className="w-full bg-[#1e90ff] hover:bg-[#0b75d1] text-white rounded-full py-6"
                    onClick={verifyOtp}
                    disabled={isLoading || otpValue.length !== 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-4 text-gray-600"
                  onClick={() => {
                    setOtpValue('');
                    setShowOtpInput(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
