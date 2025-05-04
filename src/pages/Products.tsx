
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';
import { Slider } from '@/components/ui/slider';
import { Search, Filter } from 'lucide-react';

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Apply filters whenever dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-8">
          <h1 className="text-3xl font-bold mb-8 text-dairy-dark">Our Products</h1>
          
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for dairy products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter size={20} />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded p-2 text-sm"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Filters sidebar - larger screens */}
            <div className={`
              md:w-1/4 lg:w-1/5 
              ${showFilters ? 'block' : 'hidden md:block'} 
              bg-white rounded-lg p-4 shadow-sm h-fit
            `}>
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full justify-start ${
                        selectedCategory === category ? 'bg-dairy-accent' : ''
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, maxPrice]}
                    max={maxPrice}
                    step={0.5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setPriceRange([0, maxPrice]);
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Product Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
