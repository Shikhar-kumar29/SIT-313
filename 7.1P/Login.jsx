import React, { useState } from "react";
import "./style.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="app-wrap">
      <div className="form-card login-card">
        <form onSubmit={handleLogin}>
          <div className="form-row">
            <label>Your email</label>
            <input
              type="email"
              className="input large-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Your password</label>
            <input
              type="password"
              className="input large-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary large-btn">
            Login
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="signup-container">
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
