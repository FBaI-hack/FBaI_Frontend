import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat-analysis" element={<ChatAnalysis />} />
          <Route path="/add-image" element={<AddImage />} />
          <Route path="/analysis-result" element={<AnalysisResult />} />
          <Route path="/community/report" element={<Report />} />
          <Route path="/community/freeboard" element={<Freeboard />} />
          <Route path="/community/warning" element={<Warning />} />
          <Route path="/community/ideas" element={<Ideas />} />
          <Route path="/register-post" element={<RegisterPost />} />
          <Route path="/post-detail" element={<PostDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
