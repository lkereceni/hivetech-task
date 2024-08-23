import { Card, Typography } from "@mui/material";
import { HourlyForecast } from "../../../types";
import { FC } from "react";
import { periodicForecastCardStyles } from "../../../styles/index";

type HourlyForecastCardProps = {
  data: HourlyForecast;
};

export const HourlyForecastCard: FC<HourlyForecastCardProps> = ({ data }) => {
  return (
    <Card sx={periodicForecastCardStyles}>
      <Typography variant="body1">{data.time}</Typography>
      <img
        width={60}
        height={60}
        src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
      />
      <Typography variant="body1">{data.temperature}°C</Typography>
    </Card>
  );
};
