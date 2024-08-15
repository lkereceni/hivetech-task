import { useDailyForecastData } from "../../hooks/use-daily-forecast-data";
import { CircularProgress, Grid } from "@mui/material";
import { theme } from "../../theme";
import { hourlyForecastGridStyles } from "../hourly-forecast/styles";
import { DailyForecastCard } from "./daily-forecast-card/daily-forecast-card";

export const DailyForecast = () => {
  const { dailyForecast, loading, error } = useDailyForecastData();

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

  return <div>DailyForecast</div>;
};
