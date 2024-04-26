import React from "react";
import { Typography, Container, Button, Grid, TextField } from "@mui/material";

const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #8dd06c, rgb(96, 209, 196))",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          padding: "20px",
        }}
      >
        <img
          src="/map.jpeg"
          alt="Image 1"
          style={{ width: "400px", maxWidth: "50%", marginRight: "30px" }}
        />
        <img
          src="/img1.jpeg"
          alt="Image 2"
          style={{ width: "400px", maxWidth: "50%", marginRight: "30px" }}
        />
        <img
          src="/img3.jpeg"
          alt="Image 3"
          style={{ width: "400px", maxWidth: "50%", marginRight: "30px" }}
        />
      </div>
      <Container
        sx={{
          bgcolor: "rgb(96,209,196)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          // margin: "1rem auto",
          width: "600px",
          padding: "20px 0px",
          height: "300px",
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "1rem", marginTop: 0 }}>
          Welcome to WattWise
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "1rem", maxWidth: "100%", maxHeight: "100%" }}
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
          sx={{ borderRadius: "999px", marginTop: "1rem" }}
        >
          Get Started
        </Button>
      </Container>
      <footer
        style={{
          backgroundColor: "#8DD06C",
          padding: "20px",
          marginTop: "20px",
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
