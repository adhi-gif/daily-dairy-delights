
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { useAuth } from '../context/AuthContext';
import { Clock, ShoppingBag, Truck, Repeat } from 'lucide-react';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dairy-cream">
        <div className="dairy-container py-10 sm:py-16">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Daily Dairy Logo" 
                className="h-32 md:h-40"
              />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-dairy-dark text-center mb-4">
              Farm Fresh Dairy
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 text-center mb-8 max-w-2xl">
              Delivering premium dairy products directly to your doorstep. Experience the freshness of farm-to-table dairy every day.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-dairy-accent hover:bg-dairy-accent/90 text-white px-8 py-6 rounded-lg text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              
              <Button variant="outline" className="border-dairy-accent text-dairy-accent hover:bg-dairy-accent/10 px-8 py-6 rounded-lg text-lg">
                <Link to="/subscription">Subscribe & Save</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path 
              fill="#FFFFFF" 
              fillOpacity="1" 
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,197.3C672,224,768,224,864,202.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="dairy-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Choose Daily Dairy?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border-dairy-accent/20 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-dairy-blue rounded-full p-4 mb-4">
                  <Clock className="h-6 w-6 text-dairy-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fresh Daily</h3>
                <p className="text-gray-600">Products delivered fresh from the farm every day</p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="border-dairy-accent/20 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-dairy-cream rounded-full p-4 mb-4">
                  <ShoppingBag className="h-6 w-6 text-dairy-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                <p className="text-gray-600">Premium, organic dairy sourced from local farms</p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="border-dairy-accent/20 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-dairy-green rounded-full p-4 mb-4">
                  <Truck className="h-6 w-6 text-dairy-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Doorstep Delivery</h3>
                <p className="text-gray-600">Contactless delivery right to your doorstep</p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="border-dairy-accent/20 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-dairy-gray rounded-full p-4 mb-4">
                  <Repeat className="h-6 w-6 text-dairy-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Flexible Subscriptions</h3>
                <p className="text-gray-600">Customize your orders and delivery schedule</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-dairy-gray/50">
        <div className="dairy-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Getting fresh dairy delivered is simple and easy with our straightforward process
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-dairy-accent rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Your Products</h3>
              <p className="text-gray-600">Browse our selection of fresh dairy products</p>
            </div>
            
            {/* Step 2 */}
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-dairy-accent rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Select Delivery Schedule</h3>
              <p className="text-gray-600">Choose when and how often you want your deliveries</p>
            </div>
            
            {/* Step 4 */}
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            
            {/* Step 5 */}
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 bg-dairy-accent rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Enjoy Fresh Dairy</h3>
              <p className="text-gray-600">Receive your farm-fresh dairy right at your doorstep</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Banner */}
      <section className="py-12 bg-white">
        <div className="dairy-container">
          <div className="bg-dairy-blue rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Discover Our Premium Products
                </h2>
                <p className="text-gray-600 mb-6">
                  From farm-fresh milk to artisanal cheese, we offer a wide range of quality dairy products for your daily needs.
                </p>
                <div>
                  <Button className="bg-dairy-accent hover:bg-dairy-accent/90">
                    <Link to="/products">View All Products</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg"
                  alt="Dairy products" 
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscription Banner */}
      <section className="py-12 bg-dairy-cream/50">
        <div className="dairy-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Save With Our Subscription Plans
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to regular deliveries and enjoy exclusive discounts, free delivery, and the convenience of never running out of your favorite dairy products.
            </p>
            <Button className="bg-dairy-accent hover:bg-dairy-accent/90">
              <Link to="/subscription">View Subscription Plans</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
