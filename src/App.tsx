import { SearchForm, WeatherForecast } from "./components";
import {
  Box,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import { leftGridStyles, rightGridStyles } from "./styles";
import { theme } from "./theme";
import { weatherForecastBoxContainerStyles } from "./components/weather-forecast/styles";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { SyntheticEvent, useState } from "react";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";

function App() {
  const [tabValue, setTabValue] = useState<string>("hourly");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    event.preventDefault();

    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component={"main"}
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid item sx={leftGridStyles}>
          <SearchForm />
          <Box sx={weatherForecastBoxContainerStyles}>
            <WeatherForecast />
          </Box>
        </Grid>
        <Grid sx={rightGridStyles}>
          <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab value={"hourly"} label="Hourly" />
              <Tab value={"daily"} label="Daily" />
            </Tabs>
          </Box>
          {tabValue === "hourly" ? <HourlyForecast /> : <DailyForecast />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
