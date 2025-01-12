export interface IProperty {
  description: string;
  id: number;
  images: string | string[];
  location: string;
  name: string;
  price: string;
  video: string;
  user_id: number;
}

export interface Property {
  description: string;
  images: string | string[];
  location: string;
  name: string;
  price: string;
  video: string;
  user_id?: number;
}
