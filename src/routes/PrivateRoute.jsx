import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ children, roles }) => {
    if(localStorage.getItem('username')){
        if(roles === 'all' || roles.includes(localStorage.getItem('id_rol'))){
            return children ? children : <Outlet />;
        }
        return <Navigate to="/forbidden" replace />;
    }
    return <Navigate to="login" />;
};

export default PrivateRoute;