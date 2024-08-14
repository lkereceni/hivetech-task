import { SxProps } from "@mui/material";
import { theme } from "../../../theme";

export const hourlyForecastCardStyles: SxProps = {
  minHeight: 150,
  minWidth: 100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  padding: 1,
  borderRadius: 2,
  backgroundColor: theme.palette.primary.main,
  ":last-child": {
    marginRight: "64px",
  },
};
