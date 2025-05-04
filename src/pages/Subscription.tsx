
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { subscriptionPlans, products } from '@/utils/data';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import { toast } from "sonner";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1].id); // Default to weekly
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    if (!isAuthenticated) {
      toast.error("Please login to subscribe");
      navigate('/login');
      return;
    }
    
    toast.success(`Successfully subscribed to ${subscriptionPlans.find(p => p.id === selectedPlan)?.name}`);
    // In a real app, this would process the subscription
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-8">
          <h1 className="text-3xl font-bold mb-2 text-dairy-dark">Dairy Subscription Plans</h1>
          <p className="text-gray-600 mb-8">Get fresh dairy products delivered to your doorstep on a regular schedule.</p>
          
          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`overflow-hidden ${selectedPlan === plan.id ? 'ring-2 ring-dairy-accent' : ''}`}
              >
                <CardHeader className={`${plan.id === 'weekly' ? 'bg-dairy-accent text-white' : 'bg-dairy-cream'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription className={plan.id === 'weekly' ? 'text-white/90' : ''}>
                        {plan.duration.charAt(0).toUpperCase() + plan.duration.slice(1)} Delivery
                      </CardDescription>
                    </div>
                    {selectedPlan === plan.id && <CheckCircle className="text-dairy-accent" />}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                    <span className="text-gray-500">
                      /{plan.duration === 'daily' ? 'day' : plan.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>Free delivery</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>Cancel anytime</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      <span>Quality guarantee</span>
                    </li>
                    {plan.id !== 'daily' && (
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>10% discount on regular prices</span>
                      </li>
                    )}
                    {plan.id === 'monthly' && (
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>Free specialty product each month</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      selectedPlan === plan.id ? 'bg-dairy-accent' : 'bg-gray-200 text-gray-700'
                    }`}
                    variant={selectedPlan === plan.id ? 'default' : 'secondary'}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Subscription Options */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6">Customize Your Subscription</h2>
            
            <Tabs defaultValue="products">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <div className="space-y-6">
                  <p className="text-gray-600">Select the products you'd like to include in your subscription:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.slice(0, 6).map((product) => (
                      <div 
                        key={product.id}
                        className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          className="h-4 w-4 text-dairy-accent rounded"
                        />
                        <div className="w-12 h-12 flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <label htmlFor={`product-${product.id}`} className="cursor-pointer flex-grow">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule">
                <div className="space-y-6">
                  <p className="text-gray-600">Choose your preferred delivery schedule:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-dairy-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">Delivery Days</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                              <Button 
                                key={day} 
                                variant="outline"
                                className="h-9 px-3"
                              >
                                {day}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-dairy-accent mt-0.5" />
                        <div>
                          <h3 className="font-medium">Delivery Time</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {['6-8 AM', '8-10 AM', '10-12 PM', '12-2 PM', '2-4 PM'].map((time) => (
                              <Button 
                                key={time} 
                                variant="outline"
                                className="h-9"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="delivery">
                <div className="space-y-6">
                  <p className="text-gray-600">Enter your delivery details:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Enter your full address"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Any special instructions for delivery"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={handleSubscribe}
              className="bg-dairy-accent hover:bg-dairy-accent/90 px-8 py-6 text-lg"
            >
              Subscribe Now
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              You can modify or cancel your subscription at any time.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
