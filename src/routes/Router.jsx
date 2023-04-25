import { lazy, useState } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import { useQuery } from "react-query";
import { Loadable, Spinner } from "../components";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { MainLayout } from "../layouts";
import { AuthService } from "../services/auth.service";
import { Routes } from "./Routes";

const DashboardPage = Loadable(lazy(() => import("../pages/Dashboard")));
const LoginPage = Loadable(lazy(() => import("../pages/Auth")));
const Forbidden = Loadable(lazy(() => import("../pages/Forbidden")));
const Error = Loadable(lazy(() => import("../pages/Error")));

const Router = () => {
	const [routes, setRoutes] = useState([]);
	const query = useQuery(
		['get-routes'],
		async () => await AuthService.getRoutes(),
		{ onSuccess: setRoutes, staleTime: Infinity }
	);

	if(query.isLoading){
		return <Spinner />;
	}

	const routesData = Routes(routes);

	const hashRouter = createHashRouter([
		{
			element: <PrivateRoute roles="all" />,
			children: [
				{
					element: <MainLayout navigationData={[
						{
							name: "Inicio",
							icon: Dashboard,
							path: "/"
						},
						...routesData.navigation
					]} />,
					children: [
						{
							index: true,
							path: "/",
							element: <DashboardPage />
						},
						...routesData.securedPages,
						{
							path: "/forbidden",
							element: <Forbidden />
						}
					],
				}
			],
			errorElement: <Error />
		},
		{
			element: <PublicRoute />,
			children: [
				{
					path: "/login",
					element: <LoginPage />
				}
			]
		}
	]);

	return <RouterProvider router={hashRouter} />
}

export default Router;