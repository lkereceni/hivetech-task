import { Card, Stack, Typography } from "@mui/material";
import { weatherInfoCardStyles, weatherInfoLabelStyles } from "./styles";
import { FC } from "react";

type WeatherInfoCardProps = {
  label: string;
  value: string | number;
};

export const WeatherInfoCard: FC<WeatherInfoCardProps> = ({ label, value }) => {
  return (
    <Card sx={weatherInfoCardStyles}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        width={{ xs: "100px", md: "150px" }}
        padding={{ xs: "16px" }}
      >
        <Typography variant="caption" sx={weatherInfoLabelStyles}>
          {label}
        </Typography>
        <Typography variant="subtitle1">{value}</Typography>
      </Stack>
    </Card>
  );
};
