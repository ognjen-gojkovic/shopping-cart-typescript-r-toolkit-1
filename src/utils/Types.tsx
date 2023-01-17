export type Product = {
  brand: string;
  category: string;
  description: string;
  discountPrecentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export type CartItem = {
  brand: string;
  category: string;
  description: string;
  discountPrecentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  qty: number;
};
