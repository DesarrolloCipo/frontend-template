import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = ({ children }) => {
    if (sessionStorage.getItem("auth-token") != null) {
        return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
};

export default PublicRoute;