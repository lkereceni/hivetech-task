import { Box, CircularProgress, Typography } from "@mui/material";
import { useWeatherForecastData } from "../../hooks/use-weather-forecast-data";
import {
  weatherForecastCityStyles,
  weatherForecastCityTemperatureBoxStyles,
  weatherForecastDescriptionStyles,
  weatherForecastInfoBoxStyles,
  weatherForecastTemperatureStyles,
} from "./styles";
import { theme } from "../../theme";
import { WeatherInfoCard } from "../weather-info-card/weather-info-card";

export const WeatherForecast = () => {
  const { weatherForecast, loading, error } = useWeatherForecastData();

  if (loading) {
    return (
      <CircularProgress
        sx={{ color: theme.palette.secondary.light }}
        size={56}
      />
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!weatherForecast) {
    return null;
  }

  return (
    <>
      <Box sx={weatherForecastCityTemperatureBoxStyles}>
        <Typography variant="h1" sx={weatherForecastCityStyles}>
          {weatherForecast.city}
        </Typography>
        <Typography variant="body1" sx={weatherForecastDescriptionStyles}>
          {weatherForecast.description}
        </Typography>
      </Box>
      <Typography variant="body1" sx={weatherForecastTemperatureStyles}>
        {weatherForecast.temperature}°C
      </Typography>
      <Box sx={weatherForecastInfoBoxStyles}>
        <WeatherInfoCard label="UV INDEX" value={weatherForecast.uvIndex} />
        <WeatherInfoCard
          label="VISIBILITY"
          value={`${weatherForecast.visibility}m`}
        />
      </Box>
    </>
  );
};
