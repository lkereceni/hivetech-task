import { SxProps } from "@mui/material";
import { theme } from "../../theme";

export const searchBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

export const searchTextFieldStyles: SxProps = {
  backgroundColor: theme.palette.secondary.main,
  border: "none",
  borderRadius: 2,
  width: 200,
};

export const searchButtonStyles: SxProps = {
  color: theme.palette.text.primary,
};

export const autocompleteStyles: SxProps = {
  "& .MuiAutocomplete-listbox": {
    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: "secondary",
      "&.Mui-focused": {
        backgroundColor: "purple",
      },
    },
  },
  "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
    backgroundColor: "red",
  },
};
