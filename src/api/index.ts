import axios from "axios";

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
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return data;
};

export const fetchUVIndex = async (
  lat: number,
  lon: number
): Promise<UVIndexInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}uvi?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return data;
};
