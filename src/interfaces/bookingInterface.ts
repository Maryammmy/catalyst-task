import { IProperty } from "./propertyInterface";

export interface IBooking {
  id: number;
  user_id: number;
  property_id: number;
  start_date: string;
  end_date: string;
  status: string;
  property: IProperty;
}

export interface Booking {
  user_id: number;
  property_id: number;
  start_date: string;
  end_date: string;
  status: string;
}
