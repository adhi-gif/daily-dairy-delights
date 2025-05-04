
import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card flex flex-col h-full">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.isPopular && (
          <Badge className="absolute top-2 right-2 bg-dairy-accent">
            Popular
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="font-bold text-dairy-accent">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <Button 
            variant="outline"
            className="text-sm"
            asChild
          >
            <Link to={`/product/${product.id}`}>Details</Link>
          </Button>
          <Button 
            onClick={() => addToCart(product, 1)}
            className="bg-dairy-accent hover:bg-dairy-accent/90 text-sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
