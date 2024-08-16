import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useWeatherForecastData } from "../../hooks/use-weather-forecast-data";
import {
  favoriteIconStyles,
  weatherForecastCityStyles,
  weatherForecastDescriptionStyles,
  weatherForecastTemperatureStyles,
} from "./styles";
import { theme } from "../../theme";
import { WeatherInfoCard } from "../weather-info-card/weather-info-card";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useFavoritesLocalStorage from "../../hooks/use-favorites-local-storage";

export const WeatherForecast = () => {
  const { weatherForecast, loading, error } = useWeatherForecastData();

  const city = weatherForecast?.city ?? "";

  const [favoriteIconState, setFavoriteIconState] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavoritesLocalStorage();

  const handleAddFavorite = () => {
    if (city && !favorites.includes(city)) {
      addFavorite(city);
    }
  };

  const handleRemoveFavorite = () => {
    removeFavorite(city);
  };

  const handleOnClickFavorite = () => {
    !favoriteIconState ? handleAddFavorite() : handleRemoveFavorite();

    setFavoriteIconState((prev) => !prev);
  };

  useEffect(() => {
    const favState: boolean = favorites.includes(city);
    setFavoriteIconState(favState);
  }, [city]);

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
      <Stack direction={"row"} spacing={1} alignItems={"baseline"}>
        <Stack direction={"column"} alignItems={"center"}>
          <Typography variant="h1" sx={weatherForecastCityStyles}>
            {weatherForecast.city}
          </Typography>
          <Typography variant="body1" sx={weatherForecastDescriptionStyles}>
            {weatherForecast.description}
          </Typography>
        </Stack>
        <IconButton onClick={handleOnClickFavorite}>
          {!favoriteIconState ? (
            <FavoriteBorder sx={favoriteIconStyles} />
          ) : (
            <Favorite sx={favoriteIconStyles} />
          )}
        </IconButton>
      </Stack>
      <Typography variant="body1" sx={weatherForecastTemperatureStyles}>
        {weatherForecast.temperature}°C
      </Typography>
      <Typography variant="body1">
        {`Feels like ${weatherForecast.feelsLikeTemperature}°C`}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={4}
        marginTop={10}
      >
        <WeatherInfoCard label="UV INDEX" value={weatherForecast.uvIndex} />
        <WeatherInfoCard
          label="VISIBILITY"
          value={`${weatherForecast.visibility}m`}
        />
        <WeatherInfoCard
          label="WIND"
          value={`${weatherForecast.windSpeed.toFixed(2)}km/h`}
        />
        <WeatherInfoCard
          label="HUMIDITY"
          value={`${weatherForecast.humidity}%`}
        />
        <WeatherInfoCard
          label="PRESSURE"
          value={`${weatherForecast.pressure}hPa`}
        />
      </Stack>
    </>
  );
};
