import { AppBar, Box, Card, Toolbar, Typography, useTheme } from "@mui/material";
import LoginForm from "../formularios/Login";
import { AuthService } from "../services/auth.service";
import { CommonService } from "../services/common.service";
import { useNavigate } from "react-router-dom";
import { FormDialog } from "../components";
import { useState } from "react";
import * as Yup from "yup";

const Auth = () => {
    const [userId, setUserId] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate()
    const styles = useStyles(useTheme());

    const dialogInputs = [
        {id: "password", label: "Nueva contraseña", fieldType: "text", inputType: "password" }
    ];
    
    const dialogInitialValues = {
        password: ""
    };
    
    const dialogValidationSchema = Yup.object().shape({
        password: Yup.string().required("Campo obligatorio")
    });

    const handleLogin = async (values) => {
        const response = await AuthService.login(values);
        if(response){
            setUserId(response.id);
            localStorage.setItem("username", response.username);
            localStorage.setItem("id_rol", response.id_rol);
            if(response.reset){
                setDialogOpen(true);
            }else{
                navigate("/");
            }
        }
    }

    const handleDialogSubmit = async (values) => {
        const response = await CommonService.edit("usuarios", userId, {
            password: values.password,
            reset: false
        });
        if(response){
            const userData = await AuthService.login({
                username: response.username,
                password: values.password
            });
            localStorage.setItem("username", userData.username);
            localStorage.setItem("id_rol", userData.id_rol);
            setDialogOpen(false);
            navigate("/");
        }
    }

    return(
        <Box sx={styles.root}>
            <AppBar position="fixed">
                <Toolbar sx={styles.toolbar}>
                    <Typography variant="h6" noWrap sx={styles.appBarTitle}>
                        Bar Title
                    </Typography>
                </Toolbar>
            </AppBar>
            <main style={styles.main}>
                <Card sx={styles.cardContent}>
                    <Typography component="div" variant="h5">Template</Typography>
                    <Typography component="div" variant="subtitle1">Inicio de sesión</Typography>
                    <Box sx={{ padding: 5 }}>
                        <LoginForm handleSubmit={handleLogin} />
                    </Box>
                </Card>
            </main>
            <FormDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                title="Cambiar contraseña"
                initialValues={dialogInitialValues}
                inputs={dialogInputs}
                validationSchema={dialogValidationSchema}
                submitHandler={handleDialogSubmit}
            />
        </Box>
    );
};

const useStyles = (theme) => ({
    root: {
        display: "flex",
        height: "100vh"
    },
    toolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main
    },
    appBarTitle: {
        flex: 1,
        fontWeight: 200
    },
    main: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        width: "80%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up("md")]: {
            width: "40%"
        }
    }
});

export default Auth;