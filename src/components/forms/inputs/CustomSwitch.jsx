import { useField } from "formik";
import { FormControl, FormLabel, Stack, Switch, Typography } from "@mui/material";

const CustomSwitch = ({label, ...props}) => {

    const [field, meta] = useField(props);

    return(
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">{label}</FormLabel>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>No</Typography>
                <Switch
                    name={field.name}
                    checked={field.value}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
                <Typography>Si</Typography>
            </Stack>
        </FormControl>
    );
};

export default CustomSwitch;