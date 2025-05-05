
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  isPhoneVerified?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: 'daily' | 'weekly' | 'monthly';
}
