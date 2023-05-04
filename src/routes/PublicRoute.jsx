import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = ({ children }) => {
    if (localStorage.getItem("username") != null) {
        return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
};

export default PublicRoute;