import { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useQuery } from "react-query";

const AsyncAutocomplete = ({
    label,
    optionsFn,
    type = "text",
    defaultValue = null,
    ...props
}) => {

    const formik = useFormikContext();
    const[field, meta] = useField(props);
    const [options, setOptions] = useState([]);
    const { isLoading, ...query } = useQuery(
        ["autcomplete-opts"],
        async () => optionsFn(field.value),
        {
            enabled: field.value.toString().length >= 3,
            onSuccess: setOptions
        }
    );

    useEffect(() => {
      field.value.toString().length < 3
        ? setOptions([])
        : query.refetch()
    }, [field.value])

    return(
        <Autocomplete
            id={field.name}
            name={field.name}
            freeSolo
            onBlur={formik.handleBlur}
            filterOptions={(x) => x}
            isOptionEqualToValue={(option, value) => option[field.name] === value[field.name]}
            getOptionLabel={(option) => `${option[field.name]}`}
            onChange={(e, value) => {
                if(value !== null && !defaultValue){
                    Object.keys(formik.initialValues).map((key) => {
                        formik.setFieldValue(key, value[key] || '');
                    });
                }
            }}
            disableClearable
            defaultValue={defaultValue}
            options={options}
            noOptionsText="Sin datos"
            loading={isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={field.name}
                    variant="standard"
                    onChange={formik.handleChange}
                    type={type}
                    helperText={meta.touched ? meta.error : ""}
                    error={meta.touched && Boolean(meta.error)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

export default AsyncAutocomplete;