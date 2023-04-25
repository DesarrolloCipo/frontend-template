import React, { useState } from "react";
import { Box } from "@mui/material";
import { ListTable, PageBody, PageHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { CommonService } from "../../services/common.service";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

const TABLE_HEAD = [
    {id: "id", label: "ID" },
    {id: "username", label: "Usuario" },
    {id: "id_rol", label: "Rol" },
    {id: "nombres", label: "Nombre" },
    {id: "reset", label: "Reset pwd", opts: ["Si", "No"]  },
    {id: "fecha_baja", label: "Activo", opts: ["No", "Si"]  }
];

const ListaUsuarios = () => {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();
    const [usuarios, setUsuarios] = useState([]);
    const query = useQuery(
        ["getall-usuarios-sup"],
        async () => await CommonService.getAll("usuarios"),
        { onSuccess: setUsuarios }
    );

    const handleNew = {
        action: "Agregar usuario" ,
        fn: () => navigate("/super/agregar_usuario")
    }
    
    const handleEdit = {
        action: "Editar usuario",
        fn: (usuarioId) => navigate(`/super/editar_usuario/${usuarioId}`, { replace: true })
    }

    const toggleRemove = {
        action: "Deshabilitar/Habilitar usuarios",
        fn: (selected) => {
            confirm({
                title: "¿Deshabilitar/Habilitar usuarios?",
                description: "Esta acción cambiará el estado de 'Activo' de las usuarios seleccionados."
            })
            .then(async () => {
                for(const id of selected){
                    const toRemove = usuarios.find( item => item.id === id )
                    toRemove.fecha_baja
                        ? await CommonService.restore("usuarios", id)
                        : await CommonService.remove("usuarios", id)
                };
                enqueueSnackbar("usuarios modificados correctamente", { variant: "success" });
            })
            .catch((err) => {
                if(err) enqueueSnackbar("Hubo un error en la modificación", { variant: "error" })
            })
            .then(() => {
                query.refetch();
            });
        }
    }

    return (
        <>
            <PageHeader title="Listado de usuarios" />
            <PageBody style={{ display: "flex" }}>
                <Box sx={{
                    flexGrow: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ListTable
                        dataList={usuarios}
                        tableHead={TABLE_HEAD}
                        handleNew={handleNew}
                        handleEdit={handleEdit}
                        handleDelete={toggleRemove}
                    />
                </Box>
            </PageBody>
        </>
    )
}

export default ListaUsuarios;