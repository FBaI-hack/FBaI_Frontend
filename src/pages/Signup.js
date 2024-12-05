import React, { useState } from "react";
import "../styles/Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", { email, password, nickname });
    // 회원가입 로직 추가 (API 호출 등)
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-title">FBaI</h1>
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <div className="sign-up-input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sign-up-input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="사용하실 비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-up-input-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="사용하실 닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button type="submit" className="sign-up-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
