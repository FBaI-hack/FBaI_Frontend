import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-logo">FBaI</h1>
      <p className="login-tagline">믿음과 안전을 더하는 중고 거래</p>
      <form className="login-form">
        <label className="login-label">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          className="login-input"
        />
        <label className="login-label">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="login-input"
        />
        <button type="submit" className="login-button">
          로그인
        </button>
        <button type="button" className="signup-button" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
