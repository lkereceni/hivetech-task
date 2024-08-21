import { Grid } from "@mui/material";
import { hourlyForecastGridStyles } from "./styles";
import { HourlyForecastCard } from "./hourly-forecast-card/hourly-forecast-card";
import { PeriodicForecastLoading } from "..";
import { FC, useEffect } from "react";
import { fetchHourlyForecastData } from "../../redux/hourly-forecast-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ForecastView } from "../../enums";
import { LineChart } from "@mui/x-charts";

type HourlyForecastProps = {
  toggleOption?: `${ForecastView}`;
};

export const HourlyForecast: FC<HourlyForecastProps> = ({ toggleOption }) => {
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
      {toggleOption === "card" ? (
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
      ) : (
        <LineChart
          xAxis={[
            {
              data: data ? data.map((entry) => entry.time) : undefined,
              scaleType: "point",
            },
          ]}
          yAxis={[
            {
              label: "Temperature (°C)",
            },
          ]}
          series={[
            {
              data: data ? data.map((entry) => entry.temperature) : undefined,
              color: "#82B1FF",
            },
          ]}
          grid={{
            horizontal: true,
          }}
          height={300}
        />
      )}
    </>
  );
};
