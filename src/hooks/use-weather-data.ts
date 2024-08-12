import { useQueries } from "@tanstack/react-query";
import { fetchCurrentWeather, fetchUVIndex } from "../api";
import { WeatherForecast } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useWeatherForecastData = (): {
  weatherForecast: WeatherForecast | null;
  isLoading: boolean;
} => {
  const city = useSelector((state: RootState) => state.search.city);
  const [currentWeatherData, uvIndexData] = useQueries({
    queries: [
      {
        queryKey: ["currentWeather", city],
        queryFn: () => fetchCurrentWeather(city),
      },
      { queryKey: ["UVIndex"], queryFn: fetchUVIndex },
    ],
  });

  const isLoading = currentWeatherData.isLoading || uvIndexData.isLoading;
  const isSuccess = currentWeatherData.isSuccess && uvIndexData.isSuccess; // ! Refactor this

  let weatherForecast: WeatherForecast | null = null;

  if (isSuccess) {
    weatherForecast = {
      city: currentWeatherData.data.name,
      temperature: Math.round(currentWeatherData.data.main.temp),
      description: currentWeatherData.data.weather[0].description,
      uvIndex: Math.round(uvIndexData.data.value),
      visibility: currentWeatherData.data.visibility,
    };
  }

  return { weatherForecast, isLoading };
};
