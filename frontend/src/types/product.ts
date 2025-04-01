// src/types/product.ts
// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  price: string;
  stock?: number;
  category?: {
    id: number;
    name: string;
  };
  brand?: {
    id: number;
    name: string;
  };
  flavor?: {
    id: number;
    name: string;
  };
  volume?: {
    id: number;
    name: string;
  };
  packSize?: {
    id: number;
    name: string;
  };
  image: string; // single image
  images?: string[]; // optional array of images
}


  export interface CartItem extends Product {
    quantity: number;
  }