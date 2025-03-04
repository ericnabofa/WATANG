// src/types/product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: {
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
  }