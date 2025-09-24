import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi.js";
import "./CssSignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Password confirmation does not match.");
      return;
    }

    try {
      const res = await authApi.register({
        email: form.email,
        username: form.username,
        password: form.password,
      });

      // Nếu backend trả token luôn sau register (nếu có)
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken);
      }
      if (res.refreshToken) {
        localStorage.setItem("refreshToken", res.refreshToken);
      }

      alert("Sign up successful!");
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Register failed. Please try again."
      );
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-title">Sign Up</div>
      <button type="button" className="google-btn">
        Sign Up with Google
      </button>
      <div className="or-divider">Or Email</div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="form-group" style={{ position: "relative" }}>
        <label>Password</label>
        <input
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPwd((s) => !s)}
          className="pwd-toggle"
          aria-label={showPwd ? "Hide password" : "Show password"}
        >
          {showPwd ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <div className="form-group" style={{ position: "relative" }}>
        <label>Confirm Password</label>
        <input
          type={showConfirm ? "text" : "password"}
          name="confirm"
          placeholder="Confirm your password"
          required
          value={form.confirm}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowConfirm((s) => !s)}
          className="pwd-toggle"
          aria-label={showConfirm ? "Hide password" : "Show password"}
        >
          {showConfirm ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {error && (
        <div
          className="error-message"
          style={{ color: "#e11d48", fontSize: 13 }}
        >
          {error}
        </div>
      )}

      <div className="checkbox flex">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms">
          I agree to Quizlet's Terms of Service and Privacy Policy
        </label>
      </div>

      <button type="submit" className="primary-btn">
        Sign Up
      </button>

      <div className="aux">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </div>
    </form>
  );
}
