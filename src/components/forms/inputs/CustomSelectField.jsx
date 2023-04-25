import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useField } from "formik";

const CustomSelectField = ({options, label, containerProps, ...props}) => {
    
    const [field, meta] = useField(props);

    return(
        <FormControl {...containerProps} variant="standard">
            <InputLabel
                id={`${field.name}-label`}
                error={meta.touched && Boolean(meta.error)}
            >{label}</InputLabel>
            <Select
                labelId={`${field.name}-label`}
                id={field.name}
                label={label}
                error={meta.touched && Boolean(meta.error)}
                {...field}
                {...props}
            >
                {options.map((op) => (
                    <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
        </FormControl>
    );
};

export default CustomSelectField;