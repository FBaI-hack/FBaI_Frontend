import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ChatAnalysis from "./pages/ChatAnalysis";
import Report from "./pages/Report";
import Freeboard from "./pages/Freeboard";
import Warning from "./pages/Warning";
import Ideas from "./pages/Ideas";
import MyPage from "./pages/MyPage";
import AddImage from "./pages/AddImage";
import AnalysisResult from "./pages/AnalysisResult";
import RegisterPost from "./pages/RegisterPost";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loading from "./pages/Loading";
import useUserStore from "./store/userStore";
import "./App.css";

// Layout component to conditionally show Header
function Layout({ children }) {
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/signup"]; // 헤더를 숨길 경로
  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}

function PrivateRoute({ children }) {
  const { accessToken } = useUserStore();
  return accessToken ? children : <Navigate to="/login" />;
}

function LoginRedirect() {
  const { accessToken } = useUserStore();
  return accessToken ? <Navigate to="/" /> : <Login />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/chat-analysis" element={<PrivateRoute><ChatAnalysis /></PrivateRoute>} />
          <Route path="/add-image" element={<PrivateRoute><AddImage /></PrivateRoute>} />
          <Route path="/analysis-result" element={<PrivateRoute><AnalysisResult /></PrivateRoute>} />
          <Route path="/community/report" element={<PrivateRoute><Report /></PrivateRoute>} />
          <Route path="/community/freeboard" element={<PrivateRoute><Freeboard /></PrivateRoute>} />
          <Route path="/community/warning" element={<PrivateRoute><Warning /></PrivateRoute>} />
          <Route path="/community/ideas" element={<PrivateRoute><Ideas /></PrivateRoute>} />
          <Route path="/register-post" element={<PrivateRoute><RegisterPost /></PrivateRoute>} />
          <Route path="/post-detail" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
          <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
