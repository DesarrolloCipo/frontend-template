import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ children, roles }) => {
    if(sessionStorage.getItem('auth-token')){
        if(roles === 'all' || roles.includes(sessionStorage.getItem('id_rol'))){
            return children ? children : <Outlet />;
        }
        return <Navigate to="/forbidden" replace />;
    }
    return <Navigate to="login" />;
};

export default PrivateRoute;