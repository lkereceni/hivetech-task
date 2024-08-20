import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "../hourly-forecast/styles";
import { DailyForecastCard } from "./daily-forecast-card/daily-forecast-card";
import { PeriodicForecastLoading } from "..";
import { useEffect } from "react";
import { fetchDailyForecastData } from "../../redux/daily-forecast-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const DailyForecast = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.search.selectedCity);
  const { data, loading, error } = useAppSelector(
    (state) => state.dailyForecast
  );

  useEffect(() => {
    dispatch(fetchDailyForecastData(selectedCity.coord));
  }, [dispatch, selectedCity.coord]);

  if (loading) {
    return <PeriodicForecastLoading />;
  }

  if (error) null;

  return (
    <>
      <Grid
        display="grid"
        gridTemplateColumns={`repeat(${data?.length}, 1fr)`}
        gap={2}
        sx={hourlyForecastGridStyles}
      >
        {data?.map((entry, index) => (
          <DailyForecastCard key={index} data={entry} />
        ))}
      </Grid>
    </>
  );
};
