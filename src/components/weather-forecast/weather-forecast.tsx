import { useWeatherForecastData } from "../../hooks/use-weather-forecast-data";

export const WeatherForecast = () => {
  const { weatherForecast, loading, error } = useWeatherForecastData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!weatherForecast) {
    return null;
  }

  return (
    <>
      <h1>{weatherForecast.city}</h1>
      <h2>{weatherForecast.temperature}°C</h2>
      <p>{weatherForecast.description}</p>
      <hr />
      <h3>UV Index</h3>
      <p>{weatherForecast.uvIndex}</p>
      <h3>Visibility</h3>
      <p>{weatherForecast.visibility}m</p>
    </>
  );
};
