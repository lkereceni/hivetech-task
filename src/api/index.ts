import axios from "axios";
import {
  CityFindInterface,
  CurrentWeatherInterface,
  DailyForecastInterface,
  HistoricalWeatherInterface,
  HourlyForecastInterface,
  UVIndexInterface,
  WeatherAlertInterface,
} from "../types/api";
import { CityCoord } from "../types";
import { getISODateFormat, getPastDays } from "../utils";

export const fetchCurrentForecast = async (
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
  coord: CityCoord
): Promise<UVIndexInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}uvi?lat=${coord.lat}&lon=${
      coord.lon
    }&appid=${import.meta.env.VITE_API_KEY}`
  );

  return data;
};

export const fetchHourlyForecast = async (
  coord: CityCoord
): Promise<HourlyForecastInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_WEATHERBIT_BASE_API_URL}forecast/hourly?lat=${
      coord.lat
    }&lon=${coord.lon}&hours=24&units=M&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};

export const fetchDailyForecast = async (
  coord: CityCoord
): Promise<DailyForecastInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_WEATHERBIT_BASE_API_URL}forecast/daily?lat=${
      coord.lat
    }&lon=${coord.lon}&days=10&units=M&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};

export const fetchCityFind = async (
  city: string
): Promise<CityFindInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API_URL}find?q=${city}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return data;
};

export const fetchWeatherAlert = async (
  coord: CityCoord
): Promise<WeatherAlertInterface> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_WEATHERBIT_BASE_API_URL}alerts?lat=${
      coord.lat
    }&lon=${coord.lon}&days=10&units=M&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};

export const fetchHistoricalWeather = async (
  coord: CityCoord
): Promise<HistoricalWeatherInterface> => {
  const startDate = getPastDays(10);
  const endDate = getISODateFormat(new Date());

  const { data } = await axios.get(
    `${import.meta.env.VITE_WEATHERBIT_BASE_API_URL}history/daily?lat=${
      coord.lat
    }&lon=${coord.lon}&start_date=${startDate}&end_date=${endDate}&key=${
      import.meta.env.VITE_WEATHERBIT_API_KEY
    }`
  );

  return data;
};
