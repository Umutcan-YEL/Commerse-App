export type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
};
