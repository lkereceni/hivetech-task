import axios from "axios";
import { auth } from "../firebase";

const user = auth.currentUser;

const openWeatherMapInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const weatherbitInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHERBIT_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

openWeatherMapInstance.interceptors.request.use(
  async (config) => {
    const token = await user?.getIdToken(true);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

openWeatherMapInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(error.response.data.message || error.message)
      );
    }

    return Promise.reject(new Error("Network error, please try again later."));
  }
);

weatherbitInstance.interceptors.request.use(
  async (config) => {
    const token = await user?.getIdToken(true);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

weatherbitInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(
        new Error(error.response.data.message || error.message)
      );
    }

    return Promise.reject(new Error("Network error, please try again later."));
  }
);

export { openWeatherMapInstance, weatherbitInstance };
