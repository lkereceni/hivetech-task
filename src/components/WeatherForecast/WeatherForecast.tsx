import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import {
  favoriteIconStyles,
  weatherForecastCityStyles,
  weatherForecastDescriptionStyles,
  weatherForecastTemperatureStyles,
} from "./styles";
import { theme } from "../../theme";
import { WeatherInfoCard } from "../WeatherInfoCard/WeatherInfoCard";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CityFind } from "../../types";
import { LocalStorage } from "../../enums";
import { WeatherAlert } from "../WeatherAlert/WeatherAlert";
import { fetchWeatherAlertData } from "../../redux/weatherAlertSlice";
import { fetchCurrentForecastData } from "../../redux/currentForecastSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export const WeatherForecast = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.search.selectedCity);

  const [user] = useAuthState(auth);

  const {
    data: weatherForecast,
    loading,
    error,
  } = useAppSelector((state) => state.currentForecast);
  const { data: weatherAlert } = useAppSelector((state) => state.weatherAlert);

  const [favoriteIconState, setFavoriteIconState] = useState(false);
  const {
    storageItems: favorites,
    addStorageItem,
    removeStorageItem,
  } = useLocalStorage<CityFind>(LocalStorage.Favorites);

  useEffect(() => {
    dispatch(fetchCurrentForecastData(selectedCity));
    dispatch(fetchWeatherAlertData(selectedCity.coord));
  }, [dispatch, selectedCity.coord]);

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
      {weatherAlert ? (
        <WeatherAlert
          text={weatherAlert.title}
          subText={weatherAlert.regions ? weatherAlert.regions[0] : undefined}
          severity={weatherAlert.severity}
          href={weatherAlert.uri}
        />
      ) : null}
      <Stack direction="row" spacing={2} alignItems="baseline">
        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography variant="h1" sx={weatherForecastCityStyles}>
            {weatherForecast.city}
          </Typography>
          <Typography variant="body1" sx={weatherForecastDescriptionStyles}>
            {weatherForecast.description}
          </Typography>
        </Stack>
        {user ? (
          <IconButton onClick={handleOnClickFavorite}>
            {!favoriteIconState ? (
              <FavoriteBorder sx={favoriteIconStyles} />
            ) : (
              <Favorite sx={favoriteIconStyles} />
            )}
          </IconButton>
        ) : null}
      </Stack>
      <Stack direction="column" spacing={1} alignItems="center">
        <Typography variant="body1" sx={weatherForecastTemperatureStyles}>
          {weatherForecast.temperature}°C
        </Typography>
        <Typography variant="body1">
          {`Feels like ${weatherForecast.feelsLikeTemperature}°C`}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        {weatherInfo.map((info, index) => (
          <WeatherInfoCard key={index} label={info.label} value={info.value} />
        ))}
      </Stack>
    </>
  );
};
