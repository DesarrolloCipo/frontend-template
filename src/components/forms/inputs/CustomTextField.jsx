import { TextField } from "@mui/material";
import { useField } from "formik";

const CustomTextField = (props) => {
    
    const [field, meta] = useField(props);

    const isDate = props.type === "date" || props.type === "time" ? {shrink: true } : null;

    return(
        <TextField
            variant="standard"
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            InputLabelProps={isDate}
            {...field}
            {...props}
        />
    );
};

export default CustomTextField;