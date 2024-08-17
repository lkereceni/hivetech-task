import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { DailyForecast } from "../types";
import { fetchDailyForecast } from "../api";
import { getErrorMessage, getShortDayName } from "../utilities";

export const useDailyForecastData = () => {
  const city = useSelector((state: RootState) => state.search.selectedCity);

  const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setDailyForecast(null);
    setError("");
    setLoading(true);

    const fetchDailyForecastData = async () => {
      try {
        const dailyForecastData = await fetchDailyForecast(city);

        const dailyForecast: DailyForecast[] = dailyForecastData.data.map(
          (entry): DailyForecast => ({
            maxTemperature: Math.round(entry.app_max_temp),
            minTemperature: Math.round(entry.app_min_temp),
            day: getShortDayName(entry.datetime),
            icon: entry.weather.icon,
          })
        );

        setDailyForecast(dailyForecast);
      } catch (error) {
        setError(getErrorMessage(error));
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyForecastData();
  }, [city]);

  return { dailyForecast, loading, error };
};
