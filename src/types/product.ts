export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'ladies' | 'men' | 'unisex' | 'accessories';
  subcategory: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  featured?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}
