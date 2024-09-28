import { DailyForecast } from "../../../types";
import { Box, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import { dailyForecastTemperatureBoxStyles } from "./styles";
import { theme } from "../../../theme";
import { FC } from "react";
import {
  periodicForecastCardStyles,
  periodicForecastCardStylesSmall,
} from "../../../styles/index";
import { getShortDayName } from "../../../utils";

type DailyForecastCardProps = {
  data: DailyForecast;
};

export const DailyForecastCard: FC<DailyForecastCardProps> = ({ data }) => {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return !sm ? (
    <Card sx={periodicForecastCardStyles}>
      <Typography variant="body1">{getShortDayName(data.day)}</Typography>
      <img
        loading="lazy"
        width={60}
        height={60}
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
  ) : (
    <Card sx={periodicForecastCardStylesSmall}>
      <Stack
        direction="row"
        padding="8px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1">{getShortDayName(data.day)}</Typography>
        <img
          loading="lazy"
          width={60}
          height={60}
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
      </Stack>
    </Card>
  );
};
