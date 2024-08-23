import { DailyForecast, SearchForm, WeatherForecast } from "./components";
import { Grid, Stack } from "@mui/material";
import { primaryGridStyles, secondaryGridStyles } from "./styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useEffect, useState } from "react";
import { ForecastOption, ForecastViewOption } from "./types";
import { Forecast } from "./enums";
import { HistoricalWeather } from "./components/historical-weather/historical-weather";
import { Toolbar } from "./components/toolbar/toolbar";
import { useAppDispatch } from "./hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { clearCurrentUser, setCurrentUser } from "./redux/auth-slice";

function App() {
  const dispatch = useAppDispatch();

  const [forecastTabValue, setForecastTabValue] =
    useState<ForecastOption>("hourly");
  const [toggleButtonValue, setToggleButtonValue] =
    useState<ForecastViewOption>("card");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user));
      } else {
        dispatch(clearCurrentUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleTabChange = (event: SyntheticEvent, newValue: ForecastOption) => {
    event.preventDefault();
    setForecastTabValue(newValue);
  };

  const handleToggleChange = (
    event: SyntheticEvent,
    newValue: ForecastViewOption
  ) => {
    event.preventDefault();
    setToggleButtonValue(newValue);
  };

  return (
    <Stack
      component="main"
      direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
      height={{ lg: "100vh" }}
    >
      <Grid
        width={{ xs: "100vw", sm: "100vw", lg: "40vw" }}
        sx={primaryGridStyles}
      >
        <SearchForm />
        <WeatherForecast />
      </Grid>
      <Grid
        width={{ xs: "100vw", sm: "100vw", lg: "60vw" }}
        sx={secondaryGridStyles}
      >
        <Toolbar
          forecastTabValue={forecastTabValue}
          toggleButtonValue={toggleButtonValue}
          handleTabChange={handleTabChange}
          handleToggleChange={handleToggleChange}
        />
        {forecastTabValue === Forecast.Hourly ? (
          <HourlyForecast toggleOption={toggleButtonValue} />
        ) : (
          <DailyForecast toggleOption={toggleButtonValue} />
        )}
        <HistoricalWeather />
      </Grid>
    </Stack>
  );
}

export default App;
