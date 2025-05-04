
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuoteDisplay from '@/components/QuoteDisplay';
import { Button } from '@/components/ui/button';
import { products } from '@/utils/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const bannerImages = [
  {
    src: '/placeholder.svg',
    alt: 'Fresh daily milk delivery',
    title: 'Farm Fresh Dairy',
    description: 'Delivered straight to your doorstep daily'
  },
  {
    src: '/placeholder.svg',
    alt: 'Premium organic dairy products',
    title: 'Premium Organic',
    description: 'Sustainably sourced from local farms'
  },
  {
    src: '/placeholder.svg',
    alt: 'Monthly subscription packages',
    title: 'Subscribe & Save',
    description: 'Get regular delivery and exclusive discounts'
  }
];

export default function Index() {
  const [activeBanner, setActiveBanner] = useState(0);
  
  // Filter for popular products
  const popularProducts = products.filter(product => product.isPopular);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner Carousel */}
        <section className="bg-dairy-cream">
          <div className="dairy-container py-8">
            <Carousel 
              className="w-full"
              onSelect={(index) => setActiveBanner(index)}
            >
              <CarouselContent>
                {bannerImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                      <div className="md:w-1/2">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="rounded-lg w-full h-64 object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dairy-dark">
                          {image.title}
                        </h1>
                        <p className="text-lg mb-6 text-gray-700">
                          {image.description}
                        </p>
                        <div className="space-x-4">
                          <Button className="bg-dairy-accent hover:bg-dairy-accent/90">
                            <Link to="/products">Shop Now</Link>
                          </Button>
                          <Button variant="outline">
                            <Link to="/subscription">Subscribe</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </section>
        
        {/* Quick Access Buttons */}
        <section className="bg-white py-8">
          <div className="dairy-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dairy-green rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-3">Shop Now</h2>
                <p className="mb-4 text-gray-600">Explore our full range of fresh dairy products.</p>
                <Button>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
              
              <div className="bg-dairy-blue rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-3">Subscribe</h2>
                <p className="mb-4 text-gray-600">Regular delivery of your favorite dairy items.</p>
                <Button>
                  <Link to="/subscription">View Plans</Link>
                </Button>
              </div>
              
              <div className="bg-dairy-cream rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-3">Categories</h2>
                <p className="mb-4 text-gray-600">Find products by category.</p>
                <Button>
                  <Link to="/products">View Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Products */}
        <section className="bg-gray-50 py-12">
          <div className="dairy-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-dairy-dark">Popular Products</h2>
              <Button variant="link">
                <Link to="/products" className="text-dairy-accent">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="bg-white py-12">
          <div className="dairy-container">
            <QuoteDisplay />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
