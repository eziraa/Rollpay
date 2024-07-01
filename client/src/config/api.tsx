import axios from "axios";
import { ACCESS_TOKEN } from "../constants/token-constants";
export const baseURL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "";
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
