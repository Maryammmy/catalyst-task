export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile_image: string;
  intro_video: string;
}
export interface IProperty {
  description: string;
  id: number;
  images: string;
  location: string;
  name: string;
  price: string;
  user: { name: string };
  video: string;
}
