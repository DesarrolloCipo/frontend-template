import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import { PageBody, PageHeader, Spinner } from "../../components";
import UsuarioForm from "../../formularios/Usuario";
import { useQueries } from "react-query";
import { CommonService } from "../../services/common.service";
import { useNavigate, useParams } from "react-router-dom";
import { isUndefined } from "lodash";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

const AgregarEditarUsuario = () => {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();
    const { usuarioId } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [roles, setRoles] = useState([]);
    const queries = useQueries([
        { 
            queryKey: ['get-usuario', usuarioId],
            queryFn: async () => await CommonService.get("usuarios", usuarioId),
            onSuccess: setUsuario,
            enabled: !isUndefined(usuarioId)
        },
        { 
            queryKey: ['roles-opts-pr'],
            queryFn: async () => await CommonService.getAll("roles"),
            onSuccess: setRoles
        },
    ]);

    useEffect(() => {
        if(isUndefined(usuarioId)){
            setUsuario(null);
        };
    }, [usuarioId]);

    const handleSubmit = async (data) => {
        confirm({
            title: usuarioId ? "¿Editar usuario?" : "¿Crear usuario?",
            content: usuarioId
                ? "Se guardarán los nuevos datos del usuario"
                : "Se creará un nuevo usuario"
        })
        .then(async () => {
            if (data.password === "") delete data.password;
            console.log(data)
            /* if(usuarioId){
                await CommonService.edit("usuarios", usuarioId, data);
                enqueueSnackbar("Usuario editado correctamente", { variant: "success"});
            }else{
                const found = await CommonService.getCuit(data.cuit);
                if(found){
                    throw new Error("El usuario ya se encuentra cargado.");
                }
                await CommonService.create("usuarios", data);
                enqueueSnackbar("Usuario creado correctamente", { variant: "success"});
            }
            navigate("/super/usuarios_lista"); */
        })
        .catch((err) => {
            err
            ? enqueueSnackbar(err.message, { variant: "error"})
            : enqueueSnackbar('Edición cancelada.', { variant: "warning"})
        });
    }

    if(queries.some(result => result.isLoading)) {
        return <Spinner />;
    }

    return(
        <>
            <PageHeader title={usuarioId ? "Editar Usuario" : "Agregar Usuario"} />
            <PageBody style={{ display: "flex" }}>
                <Box sx={{
                    flexGrow: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Card sx={{ width: 0.7, padding: 5, backgroundColor: "rgba(0,0,0,.15)"}}>
                        <UsuarioForm
                            usuario={usuario}
                            roles={roles}
                            handleSubmit={handleSubmit}
                        />
                    </Card>
                </Box>
            </PageBody>
        </>
    );
};

export default AgregarEditarUsuario;