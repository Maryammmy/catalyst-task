import { baseAPI } from ".";

export const deleteAPI = (url: string) => {
  const response = baseAPI.delete(url);
  return response;
};
