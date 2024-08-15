import axios from "axios";

interface CurrentWeatherInterface {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  visibility: number;
  wind: {
    speed: number;
  };
}

interface UVIndexInterface {
  value: number;
}

interface HourlyForecastInterface {
  data: [
    {
      app_temp: number;
      timestamp_local: string;
      weather: {
        icon: string;
      };
    }
  ];
}

interface DailyForecastInterface {
  data: [
    {
      app_max_temp: number;
      app_min_temp: number;
      datetime: string;
      weather: {
        icon: string;
      };
    }
  ];
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

export const fetchHourlyForecast = async (
  city: string
): Promise<HourlyForecastInterface> => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_WEATHERBIT_BASE_API_URL
    }forecast/hourly?city=${city}&hours=24&units=M&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};

export const fetchDailyForecast = async (
  city: string
): Promise<DailyForecastInterface> => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_WEATHERBIT_BASE_API_URL
    }forecast/daily?city=${city}&days=10&units=M&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};
