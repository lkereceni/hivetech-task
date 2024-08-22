import axios from "axios";

const openWeatherMapInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const weatherbitInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHERBIT_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* openWeatherMapInstance.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

weatherbitInstance.interceptors.request.use(async (config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}); */

export { openWeatherMapInstance, weatherbitInstance };
