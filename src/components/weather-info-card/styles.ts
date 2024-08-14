import { SxProps } from "@mui/material";
import { theme } from "../../theme";

export const weatherInfoCardStyles: SxProps = {
  minHeight: 100,
  minWidth: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  backgroundColor: theme.palette.secondary.main,
  padding: 1,
  borderRadius: 2,
};

export const weatherInfoLabelStyles: SxProps = {
  color: theme.palette.text.secondary,
};
