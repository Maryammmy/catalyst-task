import { baseAPIForm } from ".";

export const updatePropertyAPI = (url: string, payload: FormData) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
export const createNewPropertyAPI = (url: string, payload: FormData) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
