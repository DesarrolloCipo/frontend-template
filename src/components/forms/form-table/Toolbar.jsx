import {
    IconButton,
    styled,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { AddBox} from "@mui/icons-material";

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 3)
}));

const FormTableToolbar = ({
    title,
    handleNew
}) => {
    return (
        <RootStyle>
            <Typography component="div" variant="h5">
                {title}
            </Typography>
            {handleNew &&
                <Tooltip title={handleNew.action}>
                    <IconButton color="primary" onClick={() => handleNew.fn()}>
                        <AddBox fontSize="large" />
                    </IconButton>
                </Tooltip>
            }
        </RootStyle>
    );
};

export default FormTableToolbar;