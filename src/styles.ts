import { SxProps } from "@mui/material";
import { theme } from "./theme";

export const primaryGridStyles: SxProps = {
  width: "40vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: 0,
  gap: 6,
  padding: "64px",
  backgroundColor: theme.palette.primary.main,
};

export const secondaryGridStyles: SxProps = {
  width: "60vw",
  flexDirection: "column",
  backgroundColor: theme.palette.secondary.main,
  paddingLeft: "64px",
  paddingTop: "24px",
  flexGrow: 1,
};
