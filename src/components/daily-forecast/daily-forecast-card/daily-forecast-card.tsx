import { DailyForecast } from "../../../types";
import { Box, Card, Typography } from "@mui/material";
import { dailyForecastTemperatureBoxStyles } from "./styles";
import { theme } from "../../../theme";
import { FC } from "react";
import { periodicForecastCardStyles } from "../../../styles/index";

type DailyForecastCardProps = {
  data: DailyForecast;
};

export const DailyForecastCard: FC<DailyForecastCardProps> = ({ data }) => {
  return (
    <Card sx={periodicForecastCardStyles}>
      <Typography variant="body1">{data.day}</Typography>
      <img
        width={42}
        height={42}
        src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
      />
      <Box sx={dailyForecastTemperatureBoxStyles}>
        <Typography variant="caption">{data.maxTemperature}°C</Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {data.minTemperature}°C
        </Typography>
      </Box>
    </Card>
  );
};
