import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>

    </ThemeProvider>
  )
};

export default App;