import { DailyForecast, SearchForm, WeatherForecast } from "./components";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import { primaryGridStyles, secondaryGridStyles } from "./styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useState } from "react";
import { ForecastOption, ForecastViewOption } from "./types";
import { Forecast } from "./enums";
import { HistoricalWeather } from "./components/historical-weather/historical-weather";
import { Toolbar } from "./components/toolbar/toolbar";
import { theme } from "./theme";

function App() {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const [forecastTabValue, setForecastTabValue] =
    useState<ForecastOption>("hourly");
  const [toggleButtonValue, setToggleButtonValue] =
    useState<ForecastViewOption>("card");

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
        paddingTop={{ xs: "32px", sm: "32px", md: "64px", lg: "64px" }}
        paddingBottom="32px"
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
        {!sm ? <HistoricalWeather /> : null}
      </Grid>
    </Stack>
  );
}

export default App;
