import { Forecast, ForecastView } from "../enums";

// Types
export type WeatherForecast = {
  city: string;
  temperature: number;
  description: string;
  uvIndex: number;
  visibility: number;
  humidity: number;
  windSpeed: number;
  feelsLikeTemperature: number;
  pressure: number;
};

export type CityCoord = {
  lat: number;
  lon: number;
};

export type SearchState = {
  city: string;
};

export type HourlyForecast = {
  temperature: number;
  icon: string;
  time: string;
};

export type DailyForecast = {
  maxTemperature: number;
  minTemperature: number;
  icon: string;
  day: string;
};

export type CityFind = {
  id: number;
  name: string;
  coord: CityCoord;
  country: string;
};

export type ForecastOption = `${Forecast}`;

export type ForecastViewOption = `${ForecastView}`;

export type WeatherAlert = {
  regions: string[];
  severity: string;
  title: string;
  uri: string;
};

export type HistoricalWeather = {
  date: string;
  maxTemperature: number;
  minTemperature: number;
};

// Interfaces
export interface InitialFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string;
}
