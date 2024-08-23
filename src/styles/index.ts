import { SxProps } from "@mui/material";
import { theme } from "../theme";

export const periodicForecastCardStyles: SxProps = {
  minWidth: "180px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  padding: "16px",
  borderRadius: 2,
  backgroundColor: theme.palette.primary.main,
  ":last-child": {
    marginRight: 4,
  },
};

export const periodicForecastCardStylesSmall: SxProps = {
  marginInline: "16px",
  padding: "8px",
  borderRadius: 2,
  backgroundColor: theme.palette.primary.main,
};
