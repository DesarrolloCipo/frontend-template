import React, { useState } from "react";
import { Box } from "@mui/material";
import { ListTable, PageBody, PageHeader, Spinner } from "../../components";
import { useQueries } from "react-query";
import { CommonService } from "../../services/common.service";
import { useSnackbar } from "notistack";
import RutaForm from "../../formularios/Ruta";

const TABLE_HEAD = [
    {id: "name", label: "Nombre" },
    {id: "path", label: "Path" },
    {id: "shown", label: "Nav Item", opts: ["Si", "No"] }
];

const dialogInitialValues = {
    name: "",
    path: "",
    shown: false,
    roles_entities: []
};

const ListaRutas = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [editId, setEditId] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("Agregar ruta");
    const [dialogInitValues, setDialogInitValues] = useState(dialogInitialValues);
    const [rutas, setRutas] = useState([]);
    const [roles, setRoles] = useState([]);
    const queries = useQueries([
        {
            queryKey: ["getall-rutas"],
            queryFn: async () => await CommonService.getAll('rutas'),
            onSuccess: setRutas
        },
        {
            queryKey: ["getall-roles"],
            queryFn: async () => await CommonService.getAll('roles'),
            onSuccess: setRoles
        }
    ]);

    const handleNew = {
        action: "Agregar ruta" ,
        fn: () => {
            setDialogTitle("Agregar ruta");
            setDialogInitValues(dialogInitialValues);
            setEditId(0);
            setDialogOpen(true);
        }
    }
    
    const handleEdit = {
        action: "Editar ruta",
        fn: (rutaId) => {
            const { name, path, shown, roles_entities } = rutas.find( rt => rt.id === rutaId);
            setDialogTitle("Editar ruta");
            setDialogInitValues({ name, path, shown, roles_entities });
            setEditId(rutaId);
            setDialogOpen(true);
        }
    }

    const handleDialogSubmit = async (values) => {
        const toSave = {
            ...values,
            roles_entities: values.roles_entities.map((rol) => ({id: rol}))
        };
        if(editId === 0){
            const found = await CommonService.getByProp('rutas', 'path', values.path.replaceAll('/', '%2f'));
            if(found){
                enqueueSnackbar(`La ruta '${values.path}' ya se encuentra cargada.`, {variant: "error"});
            }else{
                await CommonService.create('rutas', toSave);
                enqueueSnackbar("Ruta creada correctamente", {variant: "success"});
            }
        }else{
            await CommonService.edit('rutas', editId, toSave);
            enqueueSnackbar("Ruta editada correctamente", {variant: "success"});
        }
        queries[0].refetch();
    }

    if(queries.some(qry => qry.isLoading)){
        return <Spinner />
    }
    
    return (
        <>
            <PageHeader title="Listado de rutas" />
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
                        dataList={rutas}
                        tableHead={TABLE_HEAD}
                        handleNew={handleNew}
                        handleEdit={handleEdit}
                    />
                    <RutaForm
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title={dialogTitle}
                        initialValues={dialogInitValues}
                        roles={roles}
                        submitHandler={handleDialogSubmit}
                    />
                </Box>
            </PageBody>
        </>
    )
}

export default ListaRutas;