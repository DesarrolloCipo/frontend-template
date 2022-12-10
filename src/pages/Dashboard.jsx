import React from "react";
import { Box } from "@mui/material";
import { PageBody, PageHeader } from "../components";

const Dashboard = () => {
  return (
    <>
      <PageHeader title='Dashboard - Page Header' />
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

export default Dashboard;