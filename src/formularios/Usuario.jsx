import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomSelectField, CustomSwitch, CustomTextField } from "../components/forms/inputs";

const UsuarioForm = ({ usuario = null, roles, handleSubmit }) => {

    const initialValues = {
        username: usuario?.username || "",
        password: "",
        nombres: usuario?.nombres || "",
        id_rol: usuario?.id_rol || "",
        reset: usuario?.reset || true,
    };

    return(
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        handleSubmit(values);
                        setSubmitting(false);
                    } catch (err) {
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <CustomTextField fullWidth name="username" label="Usuario" />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField fullWidth name="password" label="Contraseña" />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField fullWidth name="nombres" label="Nombre y Apellido" />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomSelectField
                                    containerProps={{ fullWidth: true }}
                                    name="id_rol"
                                    label="Rol"
                                    options={roles.map((rol) => ({ label: rol.id, value: rol.id}) )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomSwitch name="reset" label="¿Reset password?" />
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                                <Button type="submit" variant="contained">Guardar</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default UsuarioForm;