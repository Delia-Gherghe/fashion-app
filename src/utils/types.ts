export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Theme: undefined;
  Brands: undefined;
  Items: { brandId: number };
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
