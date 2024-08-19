import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useWeatherForecastData } from "../../hooks/useWeatherForecastData";
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
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CityFind } from "../../types";
import { LocalStorage } from "../../enums";

export const WeatherForecast = () => {
  const { weatherForecast, loading, error } = useWeatherForecastData();

  const selectedCity = useSelector(
    (state: RootState) => state.search.selectedCity
  );

  const [favoriteIconState, setFavoriteIconState] = useState(false);
  const {
    storageItems: favorites,
    addStorageItem,
    removeStorageItem,
  } = useLocalStorage<CityFind>(LocalStorage.Favorites);

  const handleAddFavorite = () => {
    if (selectedCity && !favorites.includes(selectedCity)) {
      addStorageItem(selectedCity);
    }
  };

  const handleRemoveFavorite = () => {
    removeStorageItem(selectedCity);
  };

  const handleOnClickFavorite = () => {
    !favoriteIconState ? handleAddFavorite() : handleRemoveFavorite();

    setFavoriteIconState((prev) => !prev);
  };

  useEffect(() => {
    const favState: boolean = favorites.some(
      (obj) => obj.id === selectedCity.id
    );
    setFavoriteIconState(favState);
  }, [selectedCity]);

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

  const weatherInfo: { label: string; value: string | number }[] = [
    {
      label: "UV INDEX",
      value: weatherForecast.uvIndex,
    },
    {
      label: "VISIBILITY",
      value: weatherForecast.visibility + "m",
    },
    {
      label: "WIND",
      value: weatherForecast.windSpeed.toFixed(2) + "km/h",
    },
    {
      label: "HUMIDITY",
      value: weatherForecast.humidity + "%",
    },
    {
      label: "PRESSURE",
      value: weatherForecast.pressure + "hPa",
    },
  ];

  return (
    <>
      <Stack direction="column" spacing={1} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h1" sx={weatherForecastCityStyles}>
            {weatherForecast.city}
          </Typography>
          <IconButton onClick={handleOnClickFavorite}>
            {!favoriteIconState ? (
              <FavoriteBorder sx={favoriteIconStyles} />
            ) : (
              <Favorite sx={favoriteIconStyles} />
            )}
          </IconButton>
        </Stack>
        <Typography variant="body1" sx={weatherForecastDescriptionStyles}>
          {weatherForecast.description}
        </Typography>
      </Stack>
      <Typography variant="body1" sx={weatherForecastTemperatureStyles}>
        {weatherForecast.temperature}°C
      </Typography>
      <Typography variant="body1">
        {`Feels like ${weatherForecast.feelsLikeTemperature}°C`}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={4}
        marginTop={10}
      >
        {weatherInfo.map((info, index) => (
          <WeatherInfoCard key={index} label={info.label} value={info.value} />
        ))}
      </Stack>
    </>
  );
};
