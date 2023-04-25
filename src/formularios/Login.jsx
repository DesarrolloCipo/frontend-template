import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { CustomTextField } from "../components/forms/inputs";

const LoginForm = ({ handleSubmit }) => {
    return(
        <>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={ async (values, { setErrors, setStatus, setSubmitting }) => {
                    try{
                        await handleSubmit(values);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.response?.data.message || "Sin conexión" });
                        setSubmitting(false);
                    }
                }}
            >
                {({ handleSubmit, errors }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    name="username"
                                    label="Usuario"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                />
                            </Grid>
                            {errors && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle2"
                                        align="center"
                                        color="red"
                                    >{errors.submit}</Typography>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant="contained">Ingresar</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;