import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./pages/Home";
import ChatAnalysis from "./pages/ChatAnalysis";
import Community from "./pages/Community";
import Report from "./pages/Report";
import Freeboard from "./pages/Freeboard";
import Warning from "./pages/Warning";
import Ideas from "./pages/Ideas";
import MyPage from "./pages/MyPage";
import AddImage from "./pages/AddImage";
import AnalysisResult from "./pages/AnalysisResult";
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
        <Route path="/community" element={<Community />} />
        <Route path="/community/report" element={<Report />} />
        <Route path="/community/freeboard" element={<Freeboard />} />
        <Route path="/community/warning" element={<Warning />} />
        <Route path="/community/ideas" element={<Ideas />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
