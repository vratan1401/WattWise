import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";

const App = () => {
  // Define state to store token, admin list, and loading state. Decoded token is either object if loggedin, or false if logged out
  const [decodedToken, setDecodedToken] = useState(false);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setDecodedToken(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(false);
      }
    } else {
      setDecodedToken(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get("/api/get_admin");
      setAdminUsers(response.data.admins);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchAdminUsers();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Navbar
          decodedToken={decodedToken}
          setDecodedToken={setDecodedToken}
          adminUsers={adminUsers}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setDecodedToken={setDecodedToken} />}
          />
          {decodedToken ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route
              path="/dashboard"
              element={<Login setDecodedToken={setDecodedToken} />}
            />
          )}
          {decodedToken && adminUsers.includes(decodedToken.email) ? (
            <Route path="/admin" element={<Admin />} />
          ) : (
            <Route
              path="/admin"
              element={<Login setDecodedToken={setDecodedToken} />}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
