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
    <Container maxWidth="sm" sx={{ margin: "1rem auto", padding: "0" }}>
      <Paper sx={{ padding: "2rem", textAlign: "center" }}>
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
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
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
  );
};

export default Login;
