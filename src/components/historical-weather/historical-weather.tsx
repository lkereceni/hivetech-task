import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { fetchHistoricalWeatherData } from "../../redux/historical-weather-slice";
import { LineChart } from "@mui/x-charts";
import { chartContainerStyles } from "./styles";

export const HistoricalWeather = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.search.selectedCity);
  const { data, loading, error } = useAppSelector(
    (state) => state.historicalWeather
  );

  useEffect(() => {
    dispatch(fetchHistoricalWeatherData(city.coord));
  }, [dispatch, city.coord]);

  return (
    <>
      <Stack
        direction="column"
        alignItems="start"
        justifyContent="center"
        marginTop={5}
      >
        <Typography variant="h3">Historical Weather</Typography>
        <Typography variant="caption">Past 10 days</Typography>
      </Stack>
      <Container sx={chartContainerStyles}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <LineChart
            xAxis={[
              {
                data: data ? data.map((entry) => entry.date) : undefined,
                scaleType: "band",
              },
            ]}
            yAxis={[
              {
                label: "Temperature (°C)",
              },
            ]}
            series={[
              {
                id: "max-temp",
                label: "Max temperature",
                data: data
                  ? data.map((entry) => Math.round(entry.maxTemperature))
                  : undefined,
                color: "#FF8A65",
              },
              {
                id: "min-temp",
                label: "Min temperature",
                data: data
                  ? data.map((entry) => Math.round(entry.minTemperature))
                  : undefined,
                color: "#82B1FF",
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
            height={400}
          />
        )}
      </Container>
    </>
  );
};
