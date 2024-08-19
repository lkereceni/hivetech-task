import { useDailyForecastData } from "../../hooks/useDailyForecastData";
import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "../hourly-forecast/styles";
import { DailyForecastCard } from "./daily-forecast-card/daily-forecast-card";
import { PeriodicForecastLoading } from "..";

export const DailyForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastData();

  if (loading) {
    return <PeriodicForecastLoading />;
  }

  if (error) null;

  return (
    <>
      <Grid
        display="grid"
        gridTemplateColumns={`repeat(${dailyForecast?.length}, 1fr)`}
        gap={2}
        sx={hourlyForecastGridStyles}
      >
        {dailyForecast?.map((entry, index) => (
          <DailyForecastCard key={index} data={entry} />
        ))}
      </Grid>
    </>
  );
};
