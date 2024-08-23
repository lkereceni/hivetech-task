import { Container, Grid } from "@mui/material";
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

  if (error) {
    return (
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
        }}
      >
        {error}
      </Container>
    );
  }

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
              label: "Temperature",
              data: data ? data.map((entry) => entry.temperature) : undefined,
              color: "#82B1FF",
              valueFormatter: (value) => {
                return `${value}°C`;
              },
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle",
              },
              padding: 2,
            },
          }}
          grid={{
            horizontal: true,
          }}
          height={300}
        />
      )}
    </>
  );
};
