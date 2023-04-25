import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import { Autocomplete, CustomSelectField, CustomTextField } from "./forms/inputs";

const FormDialog = ({
    open,
    setOpen,
    title,
    initialValues,
    inputs,
    validationSchema,
    submitHandler
}) => {

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
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
                                {inputs.map((item, i) => {
                                    const itemln = inputs.length > 12
                                        ? 12 / inputs.length * 2
                                        : 12 / inputs.length;
                                    switch(item.fieldType){
                                        case "text":
                                            return (
                                                <Grid item xs={itemln} key={i}>
                                                    <CustomTextField
                                                        fullWidth
                                                        name={item.id}
                                                        label={item.label}
                                                        type={item.inputType}
                                                        inputProps={{ min: "1" }}
                                                    />
                                                </Grid>
                                            );
                                        case "select":
                                            return (
                                                <Grid item xs={itemln} key={i}>
                                                    <CustomSelectField
                                                        containerProps={{ fullWidth: true }}
                                                        name={item.id}
                                                        label={item.label}
                                                        options={item.opts}
                                                    />
                                                </Grid>
                                            );
                                        case "autocomplete":
                                            const nodo = initialValues[item.id] !== "" && item.nested
                                                ? <TextField
                                                    fullWidth
                                                    label={item.label}
                                                    value={item.nested
                                                        ? initialValues[item.nested.id][item.nested.prop]
                                                        : initialValues[item.id]
                                                    }
                                                    disabled
                                                    variant="standard"
                                                />
                                                : <Autocomplete
                                                    name={item.id}
                                                    label={item.label}
                                                    options={item.options}
                                                    optionVars={item.optionVars}
                                                    defaultValue={item.defaultValue ? item.defaultValue : null}
                                                    dependant={item.dependant}
                                                />
                                            return (
                                                <Grid item xs={itemln} key={i}>
                                                    {nodo}
                                                </Grid>
                                            );
                                        default:
                                            return "Bugged";
                                    }
                                })}
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

export default FormDialog;