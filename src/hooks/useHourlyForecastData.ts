import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { HourlyForecast } from "../types";
import { fetchHourlyForecast } from "../api";
import { getErrorMessage, getHours } from "../utils";

export const useHourlyForecastData = () => {
  const city = useSelector((state: RootState) => state.search.selectedCity);

  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setHourlyForecast(null);
    setError("");
    setLoading(true);

    const fetchHourlyForecastData = async () => {
      try {
        const hourlyForecastData = await fetchHourlyForecast(city.coord);

        const hourlyForecast: HourlyForecast[] = hourlyForecastData.data.map(
          (entry): HourlyForecast => ({
            temperature: Math.round(entry.app_temp),
            time: getHours(entry.timestamp_local),
            icon: entry.weather.icon,
          })
        );

        setHourlyForecast(hourlyForecast);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyForecastData();
  }, [city]);

  return { hourlyForecast, loading, error };
};
