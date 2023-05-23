export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Theme: undefined;
  Brands: undefined;
  Items: { brandId: number };
  Basket: { brandName: string };
  Order: undefined;
  Reviews: { brandId: number; brandName: string | undefined };
};

export type Brand = {
  id: number;
  name: string;
  logoUrl: string;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: Brand;
};

export type Review = {
  id: string;
  userId: string;
  username: string;
  brandId: number;
  content: string;
  createdAt: Date;
};
