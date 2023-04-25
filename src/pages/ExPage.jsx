import React from "react";
import { Box, Button } from "@mui/material";
import { PageBody, PageHeader } from "../components";

const ExPage = () => {
    return (
        <>
            <PageHeader title='Example Page'>
                <p>Header with children</p>
                <Button sx={{ marginLeft: 1, backgroundColor: "secondary.main"}}>Click me</Button>
            </PageHeader>
            <PageBody style={{ display: "flex" }}>
                <Box sx={{
                    flexGrow: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h1>Page Body</h1>
                    <p>Page Body</p>
                </Box>
            </PageBody>
        </>
    );
};

export default ExPage;