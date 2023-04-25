import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { Formik } from "formik";
import { CustomSwitch, CustomTextField, MultiAutocomplete } from "../components/forms/inputs";

const RutaForm = ({
    open,
    setOpen,
    title,
    initialValues,
    roles,
    submitHandler
}) => {

    let defaultMulti = [];
    if(initialValues){
        defaultMulti = initialValues.roles_entities.map((rol) => (
            { value: rol.id, description: rol.id}
        ));
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            submitHandler(values);
                            setSubmitting(false);
                            setOpen(false);
                        } catch (err) {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ handleSubmit }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <CustomTextField fullWidth name="name" label="Nombre" />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField fullWidth name="path" label="Path" />
                                </Grid>
                                <Grid item xs={4}>
                                    <CustomSwitch name="shown" label="¿Nav item?" />
                                </Grid>
                                <Grid item xs={8}>
                                    <MultiAutocomplete
                                        containerProps={{ fullWidth: true }}
                                        name="roles_entities"
                                        label="Roles con acceso"
                                        options={roles.map((rol)=>(
                                            { description: rol.id, value: rol.id }
                                        ))}
                                        defaultValue={defaultMulti}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained">Guardar</Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default RutaForm;