import { SxProps } from "@mui/material";
import { theme } from "../theme";

export const periodicForecastCardStyles: SxProps = {
  width: 180,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  padding: "16px",
  borderRadius: 2,
  backgroundColor: theme.palette.primary.main,
  ":last-child": {
    marginRight: "64px",
  },
};
