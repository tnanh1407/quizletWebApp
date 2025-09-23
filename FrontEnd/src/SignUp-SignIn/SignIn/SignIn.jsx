import React from "react";

export default function SignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: xử lý đăng nhập (gọi API hoặc xác thực mock)
    alert("Sign In submitted");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-title">Sign In or Sign Up with Google</div>
      <button type="button" className="google-btn">
        Sign In with Google
      </button>

      <div className="or-divider">Or Email</div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder=" Email or Your user name" required />
      </div>

      <div className="form-group">
        <label>Mật khẩu</label>
        <input type="password" placeholder="Your password" required />
      </div>

      <button type="submit" className="primary-btn">
        Sign In
      </button>

      <div className="aux">
        You dont have account ? <a href="#">Sign UP</a>
      </div>
    </form>
  );
}
