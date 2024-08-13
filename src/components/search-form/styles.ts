import { SxProps } from "@mui/material";
import { theme } from "../../theme";

export const searchBoxStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const searchTextFieldStyles: SxProps = {
  backgroundColor: theme.palette.secondary.main,
  border: "none",
  borderRadius: 2,
};

export const searchButtonStyles: SxProps = {
  color: theme.palette.text.primary,
};
