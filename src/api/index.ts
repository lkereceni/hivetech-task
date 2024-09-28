import { CityCoord } from "../types";
import { getISODateFormat, getPastDays } from "../utils";
import { openWeatherMapInstance, weatherbitInstance } from "./axiosInstances";

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_API_KEY;
const WEATHERBIT_API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;

export const fetchCurrentForecast = (city: string) =>
  openWeatherMapInstance.get(
    `weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
  );

export const fetchUVIndex = (coord: CityCoord) =>
  openWeatherMapInstance.get(
    `uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${OPENWEATHERMAP_API_KEY}`
  );
export const fetchHourlyForecast = (coord: CityCoord) =>
  weatherbitInstance.get(
    `forecast/hourly?lat=${coord.lat}&lon=${coord.lon}&hours=24&units=M&key=${WEATHERBIT_API_KEY}`
  );

export const fetchDailyForecast = (coord: CityCoord) =>
  weatherbitInstance.get(
    `forecast/daily?lat=${coord.lat}&lon=${coord.lon}&days=10&units=M&key=${WEATHERBIT_API_KEY}`
  );

export const fetchCityFind = (city: string) =>
  openWeatherMapInstance.get(`find?q=${city}&appid=${OPENWEATHERMAP_API_KEY}`);

export const fetchWeatherAlert = (coord: CityCoord) =>
  weatherbitInstance.get(
    `alerts?lat=${coord.lat}&lon=${coord.lon}&days=10&units=M&key=${WEATHERBIT_API_KEY}`
  );

export const fetchHistoricalWeather = (coord: CityCoord) => {
  const startDate = getPastDays(30);
  const endDate = getISODateFormat(new Date());

  return weatherbitInstance.get(
    `history/daily?lat=${coord.lat}&lon=${coord.lon}&start_date=${startDate}&end_date=${endDate}&key=${WEATHERBIT_API_KEY}`
  );
};
