import React from "react";
import { Typography, Container, Button } from "@mui/material";

const Home = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        borderRadius: "20px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        margin: "1rem auto",
        maxWidth: "800px",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "1rem", marginTop: 0 }}>
        Welcome to WattWise
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "1rem", maxWidth: "600px" }}
      >
        At WattWise, we're dedicated to helping you manage your energy
        consumption more efficiently. Our platform provides insightful data
        analytics and tools to optimize energy usage, reduce costs, and
        contribute to a more sustainable future.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/dashboard"
        sx={{ borderRadius: "999px", marginTop: "1rem" }}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
