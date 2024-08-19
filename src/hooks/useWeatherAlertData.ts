import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { WeatherAlert } from "../types";
import { fetchWeatherAlert } from "../api";
import { getErrorMessage } from "../utils";

export const useWeatherAlertData = () => {
  const city = useSelector((state: RootState) => state.search.selectedCity);

  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setWeatherAlerts(null);
    setError("");
    setLoading(true);

    const fetchWeatherAlertData = async () => {
      try {
        const weatherAlertData = await fetchWeatherAlert(city.coord);

        const weatherAlerts: WeatherAlert = weatherAlertData.alerts[0];

        setWeatherAlerts(weatherAlerts);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherAlertData();
  }, [city]);

  return { weatherAlerts, loading, error };
};
