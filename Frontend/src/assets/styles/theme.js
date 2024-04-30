import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#021F59",
    },
    secondary: {
      main: "#ffffff",
      light: "rgba(179, 224, 253, 0.17)",
    },
    error: {
      main: "#F25244",
    },
    warning: {
      main: "#F2CB05",
    },
    success: {
      main: "#8BB443",
    },
    info: {
      main: "#9FD3E0",
    },
    grey: {
      A200: "#D9D9D9",
    },
    custom: {
      lightBlue: "#9FD3E0",
      inputBorder: "#C7C3C3",
      inputFocused: "#021F59",
      lightShadow: "rgba(0, 0, 0, 0.15)",
    },
    background: {
      default: "#9FD3E0",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#C7C3C3",
          boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.15)",
          "&.Mui-focused": {
            color: "#021F59",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#C7C3C3",
            boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.15)",
            "&.Mui-focused": {
              color: "#021F59",
            },
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#021F59",
    },
    secondary: {
      main: "#B3E0FD",
    },
    background: {
      default: "#121212",
      paper: "#1D1D1D",
    },
    grey: {
      A200: "#D9D9D9",
    },
    custom: {
      lightBlue: "#9FD3E0",
      inputBorder: "#C7C3C3",
      inputFocused: "#021F59",
      lightShadow: "rgba(0, 0, 0, 0.15)",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});
