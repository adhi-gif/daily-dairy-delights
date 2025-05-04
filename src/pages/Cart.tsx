
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      return;
    }
    
    toast.success("Order placed successfully!");
    clearCart();
    // In a real app, this would redirect to a checkout page or process the order
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="dairy-container py-8">
          <h1 className="text-3xl font-bold mb-8 text-dairy-dark">Your Cart</h1>
          
          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="mt-4 w-full sm:w-auto"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items):</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>$2.00</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${(totalPrice + 2).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-dairy-accent hover:bg-dairy-accent/90"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-sm text-red-500 mt-2">
                      Please <Link to="/login" className="underline">login</Link> to complete your order.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
