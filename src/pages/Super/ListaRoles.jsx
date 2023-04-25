import React, { useState } from "react";
import { Box } from "@mui/material";
import { FormDialog, ListTable, PageBody, PageHeader } from "../../components";
import { useQuery } from "react-query";
import * as Yup from "yup";
import { CommonService } from "../../services/common.service";
import { useSnackbar } from "notistack";

const ListaRoles = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const query = useQuery(
        ["getall-roles"],
        async () => await CommonService.getAll('roles'),
        { onSuccess: setRoles }
    );

    const handleNew = {
        action: "Agregar rol" ,
        fn: () => {
            setDialogOpen(true);
        }
    }

    const handleDialogSubmit = async (values) => {
        const found = await CommonService.get('roles', values.id);
        if(found){
            enqueueSnackbar(`El rol '${values.id}' ya se encuentra cargado.`, {variant: "error"});
        }else{
            await CommonService.create('roles', values);
            enqueueSnackbar("Rol creado correctamente", {variant: "success"});
        }
        query.refetch();
    }
    
    return (
        <>
            <PageHeader title="Listado de roles" />
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
                        dataList={roles}
                        tableHead={[{id: "id", label: "Nombre" }]}
                        handleNew={handleNew}
                    />
                    <FormDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        title="Agregar Rol"
                        initialValues={[{id: ""}]}
                        inputs={[{id: "id", label: "Nombre", fieldType: "text", inputType: "text" }]}
                        validationSchema={Yup.object().shape({
                            id: Yup.string().required("Nombre requerido")
                        })}
                        submitHandler={handleDialogSubmit}
                    />
                </Box>
            </PageBody>
        </>
    )
}

export default ListaRoles;