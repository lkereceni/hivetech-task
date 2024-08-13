import axios, { AxiosError } from "axios";

interface CurrentWeatherInterface {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  visibility: number;
}

interface UVIndexInterface {
  value: number;
}

export const fetchCurrentWeather = async (
  city: string
): Promise<CurrentWeatherInterface> => {
  return await axios
    .get(
      `${
        import.meta.env.VITE_BASE_API_URL
      }weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.message;
    });
};

export const fetchUVIndex = async (
  lat: number,
  lon: number
): Promise<UVIndexInterface> => {
  return await axios
    .get(
      `${import.meta.env.VITE_BASE_API_URL}uvi?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error.message;
    });
};
