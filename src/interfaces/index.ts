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
  video: string;
}
export interface IBooking {
  id: number;
  user_id: number;
  property_id: number;
  start_date: string;
  end_date: string;
  status: string;
  property: IProperty;
}
