import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import "./CssSignIn.css";
import { saveUser } from "../../other/storage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login({ email, password });
      if (res.user) {
        saveUser({ id: res.user.id, username: res.user.username });
      }

      // Lưu accessToken và refreshToken từ backend
      if (res.tokens?.accessToken) {
        localStorage.setItem("token", res.tokens.accessToken);
      }
      if (res.tokens?.refreshToken) {
        localStorage.setItem("refreshToken", res.tokens.refreshToken);
      }

      alert("Login success!");
      navigate("/"); // chuyển hướng sau khi login thành công
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-title">Sign In </div>
      <button type="button" className="google-btn">
        Sign In with Google
      </button>

      <div className="or-divider">Or Email</div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email or username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group password">
        <label>Password</label>
        <input
          type="password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/" className="a-resetpass">
          Forgot password
        </Link>
      </div>

      {error && <div style={{ color: "#e11d48", fontSize: 13 }}>{error}</div>}

      <button type="submit" className="primary-btn">
        Sign In
      </button>

      <div className="aux">
        You don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </form>
  );
}
