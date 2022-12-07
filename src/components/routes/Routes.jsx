import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => {
    return(
        <Route
            path={route.path}
            element={route.routes}
        />
    );
}

const Routes = ({ routes }) => {
    const match = useRoute
}