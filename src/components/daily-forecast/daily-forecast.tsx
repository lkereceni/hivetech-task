import { Container, Grid, useMediaQuery } from "@mui/material";
import { hourlyForecastGridStyles } from "../hourly-forecast/styles";
import { DailyForecastCard } from "./daily-forecast-card/daily-forecast-card";
import { PeriodicForecastLoading } from "..";
import { FC, useEffect } from "react";
import { fetchDailyForecastData } from "../../redux/daily-forecast-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ForecastView } from "../../enums";
import { LineChart } from "@mui/x-charts";
import { getShortDayName } from "../../utils";
import { theme } from "../../theme";

type DailyForecastProps = {
  toggleOption?: `${ForecastView}`;
};

export const DailyForecast: FC<DailyForecastProps> = ({ toggleOption }) => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.search.selectedCity);

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, loading, error } = useAppSelector(
    (state) => state.dailyForecast
  );

  useEffect(() => {
    dispatch(fetchDailyForecastData(selectedCity.coord));
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
          padding: 4,
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
          display={{ xs: "flex", sm: "flex", md: "grid", lg: "grid" }}
          direction={!sm ? "row" : "column"}
          gridTemplateColumns={!sm ? `repeat(${data?.length}, 1fr)` : undefined}
          gap={2}
          sx={hourlyForecastGridStyles}
        >
          {data?.map((entry, index) => (
            <DailyForecastCard key={index} data={entry} />
          ))}
        </Grid>
      ) : (
        <LineChart
          xAxis={[
            {
              data: data ? data.map((entry) => entry.day) : undefined,
              scaleType: "band",
              valueFormatter: (value) => {
                return getShortDayName(value);
              },
            },
          ]}
          yAxis={[
            {
              label: "Temperature (°C)",
            },
          ]}
          series={[
            {
              label: "Max temperature",
              data: data
                ? data.map((entry) => entry.maxTemperature)
                : undefined,
              color: "#FF8A65",
              valueFormatter: (value) => {
                return `${value}°C`;
              },
            },
            {
              label: "Min temperature",
              data: data
                ? data.map((entry) => entry.minTemperature)
                : undefined,
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
          grid={{ horizontal: true }}
          height={300}
          sx={{ marginLeft: 4 }}
        />
      )}
    </>
  );
};
