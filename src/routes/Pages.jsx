import { lazy } from "react";
import { Loadable } from "../components";

//super
const ListaUsuarios = Loadable(lazy(() => import("../pages/Super/ListaUsuarios")));
const AgregarEditarUsuario = Loadable(lazy(() => import("../pages/Super/AgregarEditarUsuario")));
const ListaRoles = Loadable(lazy(() => import("../pages/Super/ListaRoles")));
const ListaRutas = Loadable(lazy(() => import("../pages/Super/ListaRutas")));
//end super

export const Pages = [
    //super
    {
        path: "super/usuarios_lista",
        element: <ListaUsuarios />
    },
    {
        path: "super/agregar_usuario",
        element: <AgregarEditarUsuario />
    },
    {
        path: "super/editar_usuario/:usuarioId",
        element: <AgregarEditarUsuario />
    },
    {
        path: "super/roles_lista",
        element: <ListaRoles />
    },
    {
        path: "super/rutas_lista",
        element: <ListaRutas />
    },
    //end super
];