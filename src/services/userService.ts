import { baseAPIForm } from ".";

export const updateUserAPI = (url: string, payload: FormData) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
export const createNewUserAPI = (url: string, payload: FormData) => {
  const response = baseAPIForm.post(url, payload);
  return response;
};
