import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const baseURL = "https://ta7wela-api.in-general.net/";

const api: AxiosInstance = axios.create({
  // withCredentials: true,
  baseURL: baseURL + "website",
  timeout: 200000,
});

api.interceptors.request.use(
  (config) => {
    // Modify the request config if needed
    const token = getCookie("token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Define custom response and request interceptors, if needed
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Custom response handling logic
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status == 401) {
      deleteCookie("token");
      // window.location.reload();
      return;
    }
    // Custom error handling logic
    return Promise.reject(error);
  },
);

export default api;