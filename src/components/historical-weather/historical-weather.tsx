import {
  CircularProgress,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SyntheticEvent, useEffect, useState } from "react";
import { fetchHistoricalWeatherData } from "../../redux/historical-weather-slice";
import { LineChart } from "@mui/x-charts";
import { chartContainerStyles } from "./styles";
import { HistoricalViewOption } from "../../types";
import { Air, Thermostat } from "@mui/icons-material";
import { Historical } from "../../enums";
import { getKph } from "../../utils";

export const HistoricalWeather = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.search.selectedCity);
  const { data, loading, error } = useAppSelector(
    (state) => state.historicalWeather
  );

  const [toggleButtonValue, setToggleButtonValue] =
    useState<HistoricalViewOption>("temperature");

  useEffect(() => {
    dispatch(fetchHistoricalWeatherData(city.coord));
  }, [dispatch, city.coord]);

  const handleToggleChange = (
    event: SyntheticEvent,
    newValue: HistoricalViewOption
  ) => {
    event.preventDefault();
    setToggleButtonValue(newValue);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        marginTop={6}
        marginRight={2}
      >
        <Stack direction="column" alignItems="start" justifyContent="center">
          <Typography variant="h3">Historical Weather</Typography>
          <Typography variant="caption">Past 10 days</Typography>
        </Stack>
        <ToggleButtonGroup
          orientation="horizontal"
          value={toggleButtonValue}
          exclusive
          onChange={handleToggleChange}
        >
          <ToggleButton
            value={Historical.Temperature}
            aria-label={Historical.Temperature}
          >
            <Thermostat />
          </ToggleButton>
          <ToggleButton value={Historical.Wind} aria-label={Historical.Wind}>
            <Air />
          </ToggleButton>
        </ToggleButtonGroup>
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
                label:
                  toggleButtonValue === "temperature"
                    ? "Temperature (°C)"
                    : "Wind speed (km/h)",
              },
            ]}
            series={
              toggleButtonValue === "temperature"
                ? [
                    {
                      id: "maxTemp",
                      label: "Max temperature",
                      data: data
                        ? data.map((entry) => Math.round(entry.maxTemperature))
                        : undefined,
                      color: "#FF8A65",
                    },
                    {
                      id: "minTemp",
                      label: "Min temperature",
                      data: data
                        ? data.map((entry) => Math.round(entry.minTemperature))
                        : undefined,
                      color: "#82B1FF",
                    },
                  ]
                : [
                    {
                      id: "windSpeed",
                      data: data
                        ? data.map((entry) => getKph(entry.windSpeed))
                        : undefined,
                    },
                  ]
            }
            tooltip={{}}
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
