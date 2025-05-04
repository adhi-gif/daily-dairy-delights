
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";
import { User, MapPin, Phone, Package, Calendar } from 'lucide-react';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-8">
          <h1 className="text-3xl font-bold mb-6 text-dairy-dark">My Profile</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar / User Info */}
            <div className="md:w-1/3 lg:w-1/4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <User size={32} className="text-gray-500" />
                    </div>
                    <div>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {user.address && (
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin size={16} className="text-dairy-accent" />
                        <span>{user.address}</span>
                      </div>
                    )}
                    
                    {user.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone size={16} className="text-dairy-accent" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="account">
                <TabsList className="mb-6">
                  <TabsTrigger value="account">Account Details</TabsTrigger>
                  <TabsTrigger value="orders">Order History</TabsTrigger>
                  <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your account details and preferences.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form onSubmit={handleSaveChanges}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} className="mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={user.email} className="mt-1" readOnly />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={user.phone || ''} className="mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" defaultValue={user.address || ''} className="mt-1" />
                          </div>
                          
                          <div className="col-span-2">
                            <Button type="submit" className="bg-dairy-accent hover:bg-dairy-accent/90">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        View your past orders and their statuses.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Demo order history */}
                        <div className="bg-gray-50 p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Package size={16} className="text-dairy-accent" />
                              <span className="font-medium">Order #12345</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                Delivered
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Calendar size={14} />
                                <span>May 2, 2025</span>
                              </div>
                              <div>3 items • Total: $24.97</div>
                            </div>
                          </div>
                          <Button variant="ghost" className="mt-2 sm:mt-0">
                            View Details
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Package size={16} className="text-dairy-accent" />
                              <span className="font-medium">Order #12344</span>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                Processing
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Calendar size={14} />
                                <span>May 1, 2025</span>
                              </div>
                              <div>2 items • Total: $15.48</div>
                            </div>
                          </div>
                          <Button variant="ghost" className="mt-2 sm:mt-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="subscriptions">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Subscriptions</CardTitle>
                      <CardDescription>
                        Manage your active subscription plans.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="bg-dairy-cream p-6 rounded-lg text-center">
                        <h3 className="text-lg font-medium mb-2">
                          You don't have any active subscriptions
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Subscribe to get fresh dairy products delivered regularly!
                        </p>
                        <Button className="bg-dairy-accent hover:bg-dairy-accent/90">
                          View Subscription Plans
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
