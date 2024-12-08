import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import useUserStore from "../store/userStore";

function Login() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken, setUser } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    console.log("Request Body:", JSON.stringify(requestBody));

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // access_token 저장
        setAccessToken(data.data.access_token);

        // 사용자 정보 요청
        const userResponse = await fetch(`${baseUrl}/member`, {
          method: "GET",
          headers: {
            Authorization: data.data.access_token,
          },
        });

        const userData = await userResponse.json();
        if (userResponse.ok && userData.success) {
          // Zustand에 사용자 정보 저장
          setUser(userData.data);
        } else {
          throw new Error("사용자 정보를 가져오지 못했습니다.");
        }
        alert("로그인에 성공했습니다.");
        navigate("/"); // 로그인 후 이동할 페이지
      } else {
        alert(data.error?.message);
        console.error(data.error?.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-logo">FBaI</h1>
      <p className="login-tagline">믿음과 안전을 더하는 중고 거래</p>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login-label">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
