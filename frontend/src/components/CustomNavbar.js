import { colors } from "@mui/material";
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({ decodedToken, setDecodedToken, adminUsers }) => {
  const navigate = useNavigate(); // Get navigate function

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    setDecodedToken(false); // Set decodedToken to false
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "0 1rem" }}>
      <Navbar.Brand href="#" style={{ color: "#F5FCCD" }}>
        WattWise
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleButtonClick("/")}>Home</Nav.Link>
          {decodedToken && (
            <Nav.Link onClick={() => handleButtonClick("/dashboard")}>
              Dashboard
            </Nav.Link>
          )}
          {decodedToken && adminUsers.includes(decodedToken.email) && (
            <Nav.Link onClick={() => handleButtonClick("/admin")}>
              Admin Centre
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          <p
            className="mb-0 d-flex align-items-center"
            style={{ color: "#F5FCCD", marginRight: "1rem" }}
          >
            {decodedToken && `Logged In: ${decodedToken.email}`}
          </p>
          {!decodedToken ? (
            <Button
              variant="outline-success"
              onClick={() => handleButtonClick("/login")}
              style={{ margin: "10px 0" }}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              style={{ margin: "10px 0" }}
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
