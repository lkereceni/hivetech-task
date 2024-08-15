import { useEffect, useState } from "react";
import { CityCoord, WeatherForecast } from "../types";
import { fetchCurrentWeather, fetchUVIndex } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getKph, getErrorMessage } from "../utilities";

export const useWeatherForecastData = () => {
  const city = useSelector((state: RootState) => state.search.city);

  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setWeatherForecast(null);
    setError("");
    setLoading(true);

    const fetchWeatherData = async () => {
      try {
        const data = await fetchCurrentWeather(city);
        const coord: CityCoord = {
          lat: data.coord.lat,
          lon: data.coord.lon,
        };

        const uvData = await fetchUVIndex(coord.lat, coord.lon);

        setWeatherForecast({
          city: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          uvIndex: Math.round(uvData.value),
          visibility: data.visibility,
          humidity: data.main.humidity,
          windSpeed: getKph(data.wind.speed),
          feelsLikeTemperature: Math.round(data.main.feels_like),
          pressure: data.main.pressure,
        });
      } catch (error) {
        setError(getErrorMessage(error));
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return { weatherForecast, loading, error };
};
