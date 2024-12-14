import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/registrations/Register.jsx";
import Login from "./pages/registrations/Login.jsx";
// import Profile from "./pages/Profile.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/verify").then((res) => {
        if (!res.data.log) {
          if (window.location != "http://localhost:5173/register")
            navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
