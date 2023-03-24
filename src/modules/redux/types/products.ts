export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type TSortByInt = 'id' | 'price' | 'rating' | 'stock';

export enum IntSortKeys {
  id = 'id',
  price = 'price',
  rating = 'rating',
  stock = 'stock',
}
