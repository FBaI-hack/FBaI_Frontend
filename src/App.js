import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./pages/Home";
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
import "./App.css";

function App() {
  return (
    <Router>
      {/* 모든 페이지에서 보이는 헤더 */}
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
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
      </Routes>
    </Router>
  );
}

export default App;
