
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/utils/data';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { ArrowLeft, Minus, Plus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow dairy-container py-8">
          <div className="text-center p-12">
            <p className="text-xl">Product not found</p>
            <Button className="mt-4">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-8">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/products" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Link>
          </Button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-80 object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-6">
                <div className="mb-4">
                  <span className="inline-block bg-dairy-green/40 px-3 py-1 text-sm rounded-full mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-2xl font-bold text-dairy-dark">{product.name}</h1>
                  <p className="text-xl font-semibold text-dairy-accent mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Quantity</h2>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity === 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity}>
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-dairy-accent hover:bg-dairy-accent/90 mb-4"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Nutrition Information */}
            <div className="border-t p-6">
              <h2 className="text-xl font-semibold mb-4">Nutritional Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dairy-cream p-4 rounded-lg text-center">
                  <span className="block font-semibold">Calories</span>
                  <span className="text-xl">{product.nutrition.calories}</span>
                  <span className="text-sm block text-gray-500">kcal</span>
                </div>
                <div className="bg-dairy-green p-4 rounded-lg text-center">
                  <span className="block font-semibold">Protein</span>
                  <span className="text-xl">{product.nutrition.protein}g</span>
                </div>
                <div className="bg-dairy-blue p-4 rounded-lg text-center">
                  <span className="block font-semibold">Fat</span>
                  <span className="text-xl">{product.nutrition.fat}g</span>
                </div>
                <div className="bg-dairy-cream p-4 rounded-lg text-center">
                  <span className="block font-semibold">Carbs</span>
                  <span className="text-xl">{product.nutrition.carbs}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
