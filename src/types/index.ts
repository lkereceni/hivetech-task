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
