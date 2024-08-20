import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "./styles";
import { HourlyForecastCard } from "./hourly-forecast-card/hourly-forecast-card";
import { PeriodicForecastLoading } from "..";
import { useEffect } from "react";
import { fetchHourlyForecastData } from "../../redux/hourly-forecast-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const HourlyForecast = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.search.selectedCity);

  const { data, loading, error } = useAppSelector(
    (state) => state.hourlyForecast
  );

  useEffect(() => {
    dispatch(fetchHourlyForecastData(selectedCity.coord));
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
          <HourlyForecastCard key={index} data={entry} />
        ))}
      </Grid>
    </>
  );
};
