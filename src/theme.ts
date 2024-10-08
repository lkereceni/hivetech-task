import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
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
    info: {
      main: "#82B1FF",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#B0BEC5",
          "&.Mui-selected": {
            color: "#82B1FF",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#82B1FF",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#313C4A",
        },
        option: {
          ":hover": {
            backgroundColor: "#0B121E",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#313C4A",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "#B0BEC5",
          "&.Mui-selected": {
            color: "#82B1FF",
          },
        },
      },
    },
  },
});
