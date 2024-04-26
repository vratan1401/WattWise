import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Grid,
} from "@mui/material";

const Login = ({ setDecodedToken }) => {
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState(false);

  const handleLoginSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
    const email = decoded.email;
    const organization = email.split("@")[1];

    if (organization === "goa.bits-pilani.ac.in") {
      localStorage.setItem("token", token);
      setDecodedToken(decoded);
      navigate("/");
    } else {
      setAccessDenied(true);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <div
      style={{
        align: "center",
        background: "linear-gradient(to bottom, #8dd06c, rgb(96, 209, 196))",
        padding: "20px",
        maxHeight: "100vh",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          alignContent: "center",
          backgroundColor: "#f0f0f0",
          padding: "0 !important",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Paper
          sx={{
            padding: "2px 0px 2px 0px",
            textAlign: "center",
            padding: "10px !important",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Login
          </Typography>
          <Typography variant="body1" paragraph>
            Please log in using your BITS Goa email account. Only BITS Goa email
            accounts are allowed for general access.
          </Typography>
          <Typography variant="body1" paragraph>
            If you require access to the admin page, please use your registered
            admin email address.
          </Typography>
          {accessDenied && (
            <Alert severity="error">
              Access Denied. Only BITS Goa email accounts are allowed. Use your
              BITS Goa email to login.
            </Alert>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "0px" }}
          >
            <GoogleLogin
              clientId="752300815973-ptjap2259e5m868hggcan5j9plgvbk50.apps.googleusercontent.com"
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                </Button>
              )}
            />
          </Box>
        </Paper>
      </Container>
      {/* <footer style={{ backgroundColor: "#8DD06C", padding: "20px",position: "absolute", bottom: 0,left:0, maxWidth: "100%", width: "100%"  }}>
  <Container maxWidth="md">
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" align="center">
          Email: example@example.com
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" align="center">
          Contact Number: +1 234 567 890
        </Typography>
      </Grid>
    </Grid>
  </Container>
</footer> */}
    </div>
  );
};

export default Login;
