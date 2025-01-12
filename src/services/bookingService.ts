import { baseAPIForm } from ".";

export const updateBookingAPI = (url: string, payload: { status: string }) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
export const createNewBookingAPI = (url: string, payload: FormData) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
