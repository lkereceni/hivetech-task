import { Card, Typography } from "@mui/material";
import { weatherInfoCardStyles, weatherInfoLabelStyles } from "./styles";

type WeatherInfoCardProps = {
  label: string;
  value: string | number;
};

export const WeatherInfoCard = ({ label, value }: WeatherInfoCardProps) => {
  return (
    <Card sx={weatherInfoCardStyles}>
      <Typography variant="caption" sx={weatherInfoLabelStyles}>
        {label}
      </Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Card>
  );
};
