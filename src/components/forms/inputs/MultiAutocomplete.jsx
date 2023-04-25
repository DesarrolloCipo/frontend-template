import { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, Checkbox, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const MultiAutocomplete = ({ defaultValue, label, options, type, ...props }) => {

    const formik = useFormikContext();
    const [field, meta] = useField(props);

    return (
        <Autocomplete
            multiple
            id={field.name}
            name={field.name}
            getOptionLabel={(option) => `${option.description}`}
            isOptionEqualToValue={(option, value) => option.value === value.value }
            defaultValue={defaultValue}
            options={options}
            onChange={(e, value) => {
                if(value !== null){
                    let newVals = value.map((val)=> val.value);
                    formik.setFieldValue(field.name, newVals);
                }
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.description}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="standard"
                />
            )}
        />
    );
};

export default MultiAutocomplete;