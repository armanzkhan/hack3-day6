// src/types/types.ts
export interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    tags: string[]; // Array of tags
    image: string;
    description: string;
    available: boolean;
  }
  