import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { isObject } from "lodash";
import { useEffect, useState } from "react";

const Autocomplete = ({
    label,
    options,
    optionVars,
    defaultValue = null,
    keysToShow = 0,
    dependant,
    type = "text",
    ...props }) => {

    const formik = useFormikContext();
    const [open, setOpen] = useState(false);
    const [field, meta] = useField(props);

    const handleOpen = () => {
        if(field.value.length >= keysToShow){
            setOpen(true);
        }
    };

    useEffect(() => {
        if(field.value.length <= keysToShow){
            setOpen(false);
        };
    }, [field.value]);

    return (
        <MUIAutocomplete
            id={field.name}
            name={field.name}
            open={open}
            onOpen={handleOpen}
            onClose={() => setOpen(false)}
            options={options}
            defaultValue={defaultValue}
            isOptionEqualToValue={(option, value) => option[optionVars.value] === value[optionVars.value]}
            getOptionLabel={(option) => option[optionVars.label].toString()}
            noOptionsText="Sin opciones"
            onChange={(e, value) => {
                if(value !== null){
                    formik.setFieldValue(field.name, value[optionVars.value]);
                    if(dependant && isObject(dependant)){
                        formik.setFieldValue(dependant.toFill, value[dependant.value])
                    }
                } else {
                    formik.setFieldValue(field.name, "");
                    if(dependant){
                        isObject(dependant)
                        ? formik.setFieldValue(dependant.toFill, "")
                        : formik.setFieldValue(dependant, "")
                    }
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={field.name}
                    variant="standard"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={type}
                    helperText={meta.touched ? meta.error : ""}
                    error={meta.touched && Boolean(meta.error)}
                />
            )}
        />
    );
};

export default Autocomplete;