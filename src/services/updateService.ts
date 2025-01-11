import { IUser } from "./../interfaces/index";
import { baseAPIForm } from ".";

export const updateUserAPI = (url: string, data: Partial<IUser>) => {
  const response = baseAPIForm.post(url, data);
  return response;
};
export const createNewUserAPI = (url: string, data: IUser) => {
  const response = baseAPIForm.post(url, data);
  return response;
};
