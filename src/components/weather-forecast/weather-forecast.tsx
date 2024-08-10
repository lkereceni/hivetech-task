import { useWeatherForecastData } from "../../hooks/use-weather-data";

export const WeatherForecast = () => {
  const { weatherForecast, isLoading } = useWeatherForecastData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (weatherForecast) {
    return (
      <>
        <h1>{weatherForecast.city}</h1>
        <h1>{weatherForecast.temperature}°C</h1>
        <p>{weatherForecast.description}</p>
        <hr />
        <h3>UV Index</h3>
        <p>{weatherForecast.uvIndex}</p>
        <h3>Visibility</h3>
        <p>{weatherForecast.visibility}m</p>
      </>
    );
  }
};
