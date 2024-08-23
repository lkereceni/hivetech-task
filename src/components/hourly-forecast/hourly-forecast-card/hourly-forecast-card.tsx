import { Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { HourlyForecast } from "../../../types";
import { FC } from "react";
import {
  periodicForecastCardStyles,
  periodicForecastCardStylesSmall,
} from "../../../styles/index";
import { theme } from "../../../theme";

type HourlyForecastCardProps = {
  data: HourlyForecast;
};

export const HourlyForecastCard: FC<HourlyForecastCardProps> = ({ data }) => {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return !sm ? (
    <Card sx={periodicForecastCardStyles}>
      <Typography variant="body1">{data.time}</Typography>
      <img
        loading="lazy"
        width={60}
        height={60}
        src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
      />
      <Typography variant="body1">{data.temperature}°C</Typography>
    </Card>
  ) : (
    <Card sx={periodicForecastCardStylesSmall}>
      <Stack
        direction="row"
        padding="8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1">{data.time}</Typography>
        <img
          loading="lazy"
          width={60}
          height={60}
          src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
        />
        <Typography variant="body1">{data.temperature}°C</Typography>
      </Stack>
    </Card>
  );
};
