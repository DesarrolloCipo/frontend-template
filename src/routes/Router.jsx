import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import { Loadable } from "../components";
import { MainLayout } from "../layouts";

const DashboardPage = Loadable(lazy(() => import("../pages/Dashboard")));

const router = createBrowserRouter([
    {
        element: <MainLayout navigationData={[{ name: "Dashboard", icon: Dashboard, url: "/dashboard" }]} />,
        children: [
          {
            index: true,
            path: "/dashboard",
            element: <DashboardPage />
          }
        ]
    }
])

export default router;