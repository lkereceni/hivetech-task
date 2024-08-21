import { SearchForm, WeatherForecast } from "./components";
import {
  Box,
  Grid,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { primaryGridStyles, secondaryGridStyles } from "./styles";
import { weatherForecastBoxContainerStyles } from "./components/weather-forecast/styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useState } from "react";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";
import { Favorites } from "./components/favorites/favorites";
import { ForecastOption, ForecastViewOption } from "./types";
import { Forecast, ForecastView } from "./enums";
import { ShowChart, ViewModule } from "@mui/icons-material";

function App() {
  const [tabValue, setTabValue] = useState<ForecastOption>("hourly");
  const [toggleButtonValue, setToggleButtonValue] =
    useState<ForecastViewOption>("card");

  const handleTabChange = (event: SyntheticEvent, newValue: ForecastOption) => {
    event.preventDefault();

    setTabValue(newValue);
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
      sx={{
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Grid item sx={primaryGridStyles}>
        <SearchForm />
        <Box sx={weatherForecastBoxContainerStyles}>
          <WeatherForecast />
        </Box>
      </Grid>
      <Grid sx={secondaryGridStyles}>
        <Stack direction="row" justifyContent="space-between" paddingRight={4}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab value={Forecast.Hourly} label={Forecast.Hourly} />
            <Tab value={Forecast.Daily} label={Forecast.Daily} />
          </Tabs>
          <ToggleButtonGroup
            orientation="horizontal"
            value={toggleButtonValue}
            exclusive
            onChange={handleToggleChange}
          >
            <ToggleButton
              value={ForecastView.Card}
              aria-label={ForecastView.Card}
            >
              <ViewModule />
            </ToggleButton>
            <ToggleButton
              value={ForecastView.Chart}
              aria-label={ForecastView.Chart}
            >
              <ShowChart />
            </ToggleButton>
          </ToggleButtonGroup>
          <Favorites />
        </Stack>
        {tabValue === Forecast.Hourly ? (
          <HourlyForecast toggleOption={toggleButtonValue} />
        ) : (
          <DailyForecast toggleOption={toggleButtonValue} />
        )}
      </Grid>
    </Stack>
  );
}

export default App;
