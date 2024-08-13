import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0B121E",
    },
    secondary: {
      main: "#313C4A",
    },
    text: {
      primary: "#DDE0E4",
      secondary: "#8C929C",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
    },
  },
});
