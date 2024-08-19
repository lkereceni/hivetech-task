import { SearchForm, WeatherForecast } from "./components";
import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import { primaryGridStyles, secondaryGridStyles } from "./styles";
import { weatherForecastBoxContainerStyles } from "./components/weather-forecast/styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useState } from "react";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";
import { Favorites } from "./components/favorites/favorites";
import { ForecastTabs } from "./enums";
import { ForecastTabOptions } from "./types";

function App() {
  const [tabValue, setTabValue] = useState<ForecastTabOptions>("hourly");

  const handleTabChange = (
    event: SyntheticEvent,
    newValue: ForecastTabOptions
  ) => {
    event.preventDefault();

    setTabValue(newValue);
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
            <Tab value={ForecastTabs.Hourly} label={ForecastTabs.Hourly} />
            <Tab value={ForecastTabs.Daily} label={ForecastTabs.Daily} />
          </Tabs>
          <Favorites />
        </Stack>
        {tabValue === ForecastTabs.Hourly ? (
          <HourlyForecast />
        ) : (
          <DailyForecast />
        )}
      </Grid>
    </Stack>
  );
}

export default App;
