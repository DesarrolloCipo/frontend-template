import React from "react";
import { RouterProvider } from "react-router-dom";
import { MainRouter } from "./routes";
import { ThemeContextProvider } from "./themes";

function App() {

  return (
    <ThemeContextProvider>
      <RouterProvider router={MainRouter} />
    </ThemeContextProvider>
  )
};

export default App;