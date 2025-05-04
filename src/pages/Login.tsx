
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register(registerName, registerEmail, registerPassword);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-dairy-dark">Welcome to Daily Dairy</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <Tabs defaultValue="login">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="Enter your email"
                          autoComplete="email"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link to="/forgot-password" className="text-sm text-dairy-accent hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-dairy-accent hover:bg-dairy-accent/90"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Login'}
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500">
                        <p>
                          For demo, use: <br />
                          Email: test@example.com <br />
                          Password: password
                        </p>
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          placeholder="Enter your full name"
                          autoComplete="name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          placeholder="Enter your email"
                          autoComplete="email"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          placeholder="Create a password"
                          autoComplete="new-password"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-dairy-accent hover:bg-dairy-accent/90"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Registering...' : 'Register'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
