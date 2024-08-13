import { SxProps } from "@mui/material";
import { theme } from "./theme";

export const leftGridStyles: SxProps = {
  flex: "0 0 40%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "64px",
  backgroundColor: theme.palette.primary.main,
};

export const rightGridStyles: SxProps = {
  flex: "0 0 60%",
  backgroundColor: theme.palette.secondary.main,
};
