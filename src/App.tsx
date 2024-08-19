import { SearchForm, WeatherForecast } from "./components";
import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import { primaryGridStyles, secondaryGridStyles } from "./styles";
import { weatherForecastBoxContainerStyles } from "./components/weather-forecast/styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useState } from "react";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";
import { Favorites } from "./components/favorites/favorites";
import { ForecastOption } from "./types";
import { Forecast } from "./enums";

function App() {
  const [tabValue, setTabValue] = useState<ForecastOption>("hourly");

  const handleTabChange = (event: SyntheticEvent, newValue: ForecastOption) => {
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
            <Tab value={Forecast.Hourly} label={Forecast.Hourly} />
            <Tab value={Forecast.Daily} label={Forecast.Daily} />
          </Tabs>
          <Favorites />
        </Stack>
        {tabValue === Forecast.Hourly ? <HourlyForecast /> : <DailyForecast />}
      </Grid>
    </Stack>
  );
}

export default App;
