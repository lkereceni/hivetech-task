import { useSelector } from "react-redux";
import { DailyForecast, ForecastOption, HourlyForecast } from "../types";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { Forecast } from "../enums";
import { fetchDailyForecast, fetchHourlyForecast } from "../api";
import { getErrorMessage, getHours, getShortDayName } from "../utils";

export const useForecastData = (type: ForecastOption) => {
  const city = useSelector((state: RootState) => state.search.selectedCity);

  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[] | null>(
    null
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setHourlyForecast(null);
    setDailyForecast(null);
    setError("");
    setLoading(true);

    const fetchForecastData = async () => {
      try {
        switch (type) {
          case Forecast.Hourly:
            const hourlyForecastData = await fetchHourlyForecast(city.coord);

            const hourlyForecast: HourlyForecast[] =
              hourlyForecastData.data.map(
                (entry): HourlyForecast => ({
                  temperature: Math.round(entry.app_temp),
                  time: getHours(entry.timestamp_local),
                  icon: entry.weather.icon,
                })
              );
            setHourlyForecast(hourlyForecast);
            break;

          case Forecast.Daily:
            const dailyForecastData = await fetchDailyForecast(city.coord);

            const dailyForecast: DailyForecast[] = dailyForecastData.data.map(
              (entry): DailyForecast => ({
                maxTemperature: Math.round(entry.app_max_temp),
                minTemperature: Math.round(entry.app_min_temp),
                day: getShortDayName(entry.datetime),
                icon: entry.weather.icon,
              })
            );
            setDailyForecast(dailyForecast);
            break;

          default:
            return null;
        }
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [city]);

  return { dailyForecast, hourlyForecast, loading, error };
};
