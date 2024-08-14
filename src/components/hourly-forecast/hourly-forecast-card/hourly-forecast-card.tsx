import { Card, Typography } from "@mui/material";
import { HourlyForecast } from "../../../types";
import { hourlyForecastCardStyles } from "./styles";

type HourlyForecastCardProps = {
  hourlyForecast: HourlyForecast;
};

export const HourlyForecastCard = ({
  hourlyForecast,
}: HourlyForecastCardProps) => {
  return (
    <Card sx={hourlyForecastCardStyles}>
      <Typography variant="body1">{hourlyForecast.time}</Typography>
      <img
        width={42}
        height={42}
        src={`https://www.weatherbit.io/static/img/icons/${hourlyForecast.icon}.png`}
      />
      <Typography variant="body1">{hourlyForecast.temperature}°C</Typography>
    </Card>
  );
};
