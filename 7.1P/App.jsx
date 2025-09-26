import React from "react";
import "./7.1P/style.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./7.1P/Login";
import Register from "./7.1P/Register";
import Home from "./7.1P/Home";

function Navbar() {
  return (
    <div className="navbar">
      <strong>DEV@Deakin</strong>
      <input type="text" placeholder="Search..." />
      <div>
        <span style={{ marginRight: "12px", cursor: "pointer" }}>Post</span>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
