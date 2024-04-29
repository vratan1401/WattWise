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
        background: "#12486B",
        padding: "20px",
        paddingBottom: "10px",
        minHeight: "95vh",
        // height: "10vh",
        textAlign: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          alignContent: "center",
          // backgroundColor: "#f0f0f0",
          padding: "0 !important",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Paper
          sx={{
            background: "#78D6C6",
            padding: "1rem",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: "Open Sans",
              fontWeight: "600",
              color: "#12486B",
            }}
          >
            Login
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontFamily: "Open Sans" }}
          >
            Please log in using your BITS Goa email account. Only BITS Goa email
            accounts are allowed for general access.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontFamily: "Open Sans" }}
          >
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
    </div>
  );
};

export default Login;
