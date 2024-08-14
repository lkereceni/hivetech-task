import { SxProps } from "@mui/material";
import { theme } from "./theme";

export const leftGridStyles: SxProps = {
  width: "40vw",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  gap: 10,
  padding: "64px",
  backgroundColor: theme.palette.primary.main,
};

export const rightGridStyles: SxProps = {
  width: "60vw",
  flexDirection: "column",
  backgroundColor: theme.palette.secondary.main,
  paddingLeft: "64px",
  paddingTop: "64px",
  flexGrow: 1,
};
