import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Password confirmation does not match.");
      return;
    }
    setError("");
    alert("Sign Up submitted");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-title">Sign Up</div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Email" required />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input type="text" placeholder="Username" required />
      </div>

      {/* Password */}
      <div className="form-group" style={{ position: "relative" }}>
        <label>Password</label>
        <input
          type={showPwd ? "text" : "password"}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      {/* Confirm Password */}
      <div className="form-group" style={{ position: "relative" }}>
        <label>Confirm Password</label>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm your password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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

      <div className="form-group checkbox">
        <input type="checkbox" id="terms" required />
        <label htmlFor="terms">
          I agree to Quizlet's Terms of Service and Privacy Policy
        </label>
      </div>

      <button type="submit" className="primary-btn">
        Sign Up
      </button>

      <div className="aux">
        Already have an account? <a href="#">Sign In</a>
      </div>
    </form>
  );
}
