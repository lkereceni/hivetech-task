import { SxProps } from "@mui/material";
import { theme } from "../../theme";

export const weatherForecastBoxContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 3,
};

export const weatherForecastCityTemperatureBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export const weatherForecastCityStyles: SxProps = {
  fontSize: 48,
};

export const weatherForecastTemperatureStyles: SxProps = {
  fontSize: 40,
  fontWeight: 600,
};

export const weatherForecastDescriptionStyles: SxProps = {
  color: theme.palette.text.secondary,
};

export const weatherForecastInfoBoxStyles: SxProps = {
  paddingTop: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 4,
};
