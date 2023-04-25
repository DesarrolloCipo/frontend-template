import React from "react";
import { Box } from "@mui/material";
import { PageBody } from "../components";

const Forbidden = () => {
  return (
    <>
      <PageBody style={{ display: "flex" }}>
        <Box sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h1>Su usuario no tiene autorización para la página o dirección a la que intenta acceder.</h1>
        </Box>
      </PageBody>
    </>
  );
};

export default Forbidden;