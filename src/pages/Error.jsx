import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { PageBody } from "../components";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
            <PageBody style={{ display: "flex" }}>
                <Box sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h1>Ha ocurrido un error o la página solicitada no existe.</h1>
                    <Stack direction="row" gap={3} margin={3}>
                        <Button variant="contained" onClick={() => navigate(-1)}>Volver</Button>
                        <Button variant="contained" onClick={() => navigate('/')}>Inicio</Button>
                    </Stack>
                </Box>
            </PageBody>
        </>
    );
};

export default Error;