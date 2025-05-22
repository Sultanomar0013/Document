import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";


const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#81DAF5",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#000", // Define primary text color
      secondary: "#FFFFFF", // Define secondary text color
      third: "#000",
    },
    seperator: {
      main: "#000",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'green', // default label color
        },
        shrink: {
          color: 'green', // label color when shrunk (e.g. for date fields)
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#E3CEF6",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#FFFFFF", // Define primary text color
      secondary: "#FFFFFF", // Define secondary text color
      third: "#000",
    },
    seperator: {
      main: "#FFFFFF",
    },
  },
});

const greenTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008b8b", // Green
    },
    secondary: {
      main: "#e8f5e9",
    },
    background: {
      default: "#e8f5e9",
      paper: "#c8e6c9",
    },
    text: {
      primary: "#000", // Define primary text color
      secondary: "#FFFFFF", // Define secondary text color
      third: "#000",
    },
    seperator: {
      main: "#000",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'black', // default label color
        },
        shrink: {
          color: 'green', // label color when shrunk (e.g. for date fields)
        },
      },
    },
  },
});


export const getTheme = (customTheme) => {

  if (customTheme === "light") {
    return defaultTheme;
  } else if (customTheme === "dark") {
    return darkTheme;
  } else if (customTheme === "green") {
    return greenTheme;
  }
};



export default getTheme;
