import { Dashboard } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { lazy } from "react";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { Loadable } from "./components";
import MainLayout from "./layouts/MainLayout";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: "#21A3A3"
    },
    secondary: {
      main: "#135757"
    },
    background: {
      paper: purple[500]
    }
  }
});

const DashboardPage = Loadable(lazy(() => import("./pages/Dashboard")))

const router = createBrowserRouter([
  {
    element: <MainLayout navigationData={[{ name: "Dashboard", icon: Dashboard, url: "/dashboard" }]} />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />
      }
    ]
  }
]);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
};

export default App;