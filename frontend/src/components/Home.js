import React from "react";
import { Typography, Container, Button, Grid } from "@mui/material";

const Home = () => {
  return (
    <div
      style={{
        background: "#12486B",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0, // Remove padding
        margin: 0, // Remove margin
        color: "#F5FCCD",
        position: "relative",
      }}
    >
      <Container
        sx={{
          bgcolor: "#78D6C6",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Open Sans",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#12486B",
          }}
        >
          Welcome to WattWise
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "20px", opacity: 0.9, color: "black" }}
        >
          Introducing "WattWise" - your go-to energy dashboard for BITS Goa.
          With WattWise, you can easily track how much energy we're using across
          campus. It helps everyone at BITS Goa save energy and keep our campus
          green. Let's make BITS Goa brighter and more sustainable together with
          WattWise!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/dashboard"
          sx={{
            borderRadius: "12px",
            padding: "12px 24px",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            bgcolor: "#12486B",
            color: "#F5FCCD",
            "&:hover": {
              bgcolor: "#58BFA0",
            },
          }}
        >
          Get Started
        </Button>
      </Container>
      <footer
        style={{
          backgroundColor: "#419197",
          padding: "20px",
          color: "#F5FCCD",
          width: "100%",
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" align="center">
                Email: mkd@goa.bits-pilani.ac.in
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" align="center">
                Contact Number: +91 942 239 0888
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
