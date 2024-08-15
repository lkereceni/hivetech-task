import { CircularProgress, Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "./styles";
import { useHourlyForecastData } from "../../hooks/use-hourly-forecast-data";
import { theme } from "../../theme";
import { HourlyForecastCard } from "./hourly-forecast-card/hourly-forecast-card";

export const HourlyForecast = () => {
  const { hourlyForecast, loading, error } = useHourlyForecastData();

  if (loading) {
    return (
      <CircularProgress sx={{ color: theme.palette.primary.main }} size={56} />
    );
  }

  if (error) null;

  return (
    <>
      <Grid
        display={"grid"}
        gridTemplateColumns={`repeat(${hourlyForecast?.length}, 1fr)`}
        gap={2}
        sx={hourlyForecastGridStyles}
      >
        {hourlyForecast?.map((entry, index) => (
          <HourlyForecastCard key={index} data={entry} />
        ))}
      </Grid>
    </>
  );
};
