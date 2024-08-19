import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "./styles";
import { useHourlyForecastData } from "../../hooks/useHourlyForecastData";
import { HourlyForecastCard } from "./hourly-forecast-card/hourly-forecast-card";
import { PeriodicForecastLoading } from "..";

export const HourlyForecast = () => {
  const { hourlyForecast, loading, error } = useHourlyForecastData();

  if (loading) {
    return <PeriodicForecastLoading />;
  }

  if (error) null;

  return (
    <>
      <Grid
        display="grid"
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
