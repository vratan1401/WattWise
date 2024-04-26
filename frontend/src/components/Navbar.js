import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = ({ decodedToken, setDecodedToken, adminUsers }) => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333",
        padding: "10px 20px",
        marginBottom: "0px",
      }}
    >
      <div>
        <Button
          color="inherit"
          sx={{ color: "white", "&:hover": { backgroundColor: "#555" } }}
          onClick={() => handleButtonClick("/")}
        >
          Home
        </Button>

        {decodedToken && (
          <Button
            color="inherit"
            sx={{ color: "white", "&:hover": { backgroundColor: "#555" } }}
            onClick={() => handleButtonClick("/dashboard")}
          >
            Dashboard
          </Button>
        )}

        {decodedToken && adminUsers.includes(decodedToken.email) && (
          <Button
            color="inherit"
            sx={{ color: "white", "&:hover": { backgroundColor: "#555" } }}
            onClick={() => handleButtonClick("/admin")}
          >
            Admin Centre
          </Button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ color: "white", margin: 0, marginRight: "10px" }}>
          {decodedToken ? `Logged In: ${decodedToken.email}` : ""}
        </p>
        {!decodedToken ? (
          <Button
            color="inherit"
            sx={{
              backgroundColor: "#4caf50", // Green color
              color: "white",
              "&:hover": { backgroundColor: "#388e3c" }, // Darker green on hover
            }}
            onClick={() => handleButtonClick("/login")}
          >
            Login
          </Button>
        ) : (
          <Button
            color="inherit"
            style={{
              backgroundColor: "#f44336",
              color: "white",
              marginLeft: "10px",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
