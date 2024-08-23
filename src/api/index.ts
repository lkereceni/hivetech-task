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
import { openWeatherMapInstance, weatherbitInstance } from "./axios-instances";

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_API_KEY;
const WEATHERBIT_API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;

export const fetchCurrentForecast = async (
  city: string
): Promise<CurrentWeatherInterface> => {
  const { data } = await openWeatherMapInstance.get(
    `weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
  );

  return data;
};

export const fetchUVIndex = async (
  coord: CityCoord
): Promise<UVIndexInterface> => {
  const { data } = await openWeatherMapInstance.get(
    `uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${OPENWEATHERMAP_API_KEY}`
  );

  return data;
};

export const fetchHourlyForecast = async (
  coord: CityCoord
): Promise<HourlyForecastInterface> => {
  const { data } = await weatherbitInstance.get(
    `forecast/hourly?lat=${coord.lat}&lon=${coord.lon}&hours=24&units=M&key=${WEATHERBIT_API_KEY}`
  );

  return data;
};

export const fetchDailyForecast = async (
  coord: CityCoord
): Promise<DailyForecastInterface> => {
  const { data } = await weatherbitInstance.get(
    `forecast/daily?lat=${coord.lat}&lon=${coord.lon}&days=10&units=M&key=${WEATHERBIT_API_KEY}`
  );

  return data;
};

export const fetchCityFind = async (
  city: string
): Promise<CityFindInterface> => {
  const { data } = await openWeatherMapInstance.get(
    `find?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`
  );

  return data;
};

export const fetchWeatherAlert = async (
  coord: CityCoord
): Promise<WeatherAlertInterface> => {
  const { data } = await weatherbitInstance.get(
    `alerts?lat=${coord.lat}&lon=${coord.lon}&days=10&units=M&key=${WEATHERBIT_API_KEY}`
  );

  return data;
};

export const fetchHistoricalWeather = async (
  coord: CityCoord
): Promise<HistoricalWeatherInterface> => {
  const startDate = getPastDays(30);
  const endDate = getISODateFormat(new Date());

  const { data } = await weatherbitInstance.get(
    `history/daily?lat=${coord.lat}&lon=${coord.lon}&start_date=${startDate}&end_date=${endDate}&key=${WEATHERBIT_API_KEY}`
  );

  return data;
};
