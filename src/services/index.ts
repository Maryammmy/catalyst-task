import axios from "axios";

// import baseURL
export const baseURL = import.meta.env.VITE_API_BASE_URL;

// create an instance of the axios server
export const baseAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
