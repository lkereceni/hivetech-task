import { Card, Typography } from "@mui/material";
import { HourlyForecast } from "../../../types";
import { periodicForecastCardStyles } from "../../../styles/components/card";

type HourlyForecastCardProps = {
  data: HourlyForecast;
};

export const HourlyForecastCard = ({ data }: HourlyForecastCardProps) => {
  return (
    <Card sx={periodicForecastCardStyles}>
      <Typography variant="body1">{data.time}</Typography>
      <img
        width={42}
        height={42}
        src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
      />
      <Typography variant="body1">{data.temperature}°C</Typography>
    </Card>
  );
};
