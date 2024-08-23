import { SxProps } from "@mui/material";
import { theme } from "./theme";

export const primaryGridStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  gap: 6,
  padding: "64px",
  backgroundColor: theme.palette.primary.main,
};

export const secondaryGridStyles: SxProps = {
  flexDirection: "column",
  backgroundColor: theme.palette.secondary.main,
  paddingLeft: "64px",
  paddingTop: "24px",
};
