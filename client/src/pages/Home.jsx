import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Profile from "./Profile";
import LilHome from "./LilHome.jsx";
import Others from "./Others.jsx";
import Requests from "./Requests.jsx";

function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <Nav />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<LilHome />} />
          <Route path="/others" element={<Others />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
