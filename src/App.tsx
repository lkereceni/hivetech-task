import { SearchForm, WeatherForecast } from "./components";
import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { leftGridStyles, rightGridStyles } from "./styles";
import { theme } from "./theme";
import { weatherForecastBoxContainerStyles } from "./components/weather-forecast/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component={"main"} sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item sx={leftGridStyles}>
          <SearchForm />
          <Box sx={weatherForecastBoxContainerStyles}>
            <WeatherForecast />
          </Box>
        </Grid>
        <Grid sx={rightGridStyles} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
