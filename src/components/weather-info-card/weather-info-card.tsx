import { Card, Typography } from "@mui/material";
import { weatherInfoCardStyles, weatherInfoLabelStyles } from "./styles";
import { FC } from "react";

type WeatherInfoCardProps = {
  label: string;
  value: string | number;
};

export const WeatherInfoCard: FC<WeatherInfoCardProps> = ({ label, value }) => {
  return (
    <Card sx={weatherInfoCardStyles}>
      <Typography variant="caption" sx={weatherInfoLabelStyles}>
        {label}
      </Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Card>
  );
};
