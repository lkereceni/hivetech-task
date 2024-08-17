import { useDailyForecastData } from "../../hooks/use-daily-forecast-data";
import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "../hourly-forecast/styles";
import { DailyForecastCard } from "./daily-forecast-card/daily-forecast-card";
import { PeriodicForecastLoading } from "../loading/period-forecast-loading/periodic-forecast-loading";

export const DailyForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastData();

  if (loading) {
    return <PeriodicForecastLoading />;
  }

  if (error) null;

  return (
    <>
      <Grid
        display={"grid"}
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
