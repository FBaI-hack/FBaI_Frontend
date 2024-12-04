import React from "react";
import "../styles/AnalysisResult.css";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ReactComponent as CheckMark } from "../assets/icons/check_mark.svg";

// 샘플 채팅 데이터
const chatData = [
  { sender: "me", message: "당신 사기꾼이신가요?? 궁금해요??" },
  { sender: "me", message: "당신 사기꾼이신가요?? 궁금해요?? 어디까지 늘어날까" },
  { sender: "other", message: "너 같으면 말하겠니?" },
  { sender: "other", message: "라고하면 안되겠죠?" },
  { sender: "me", message: "그래용" },
  { sender: "other", message: "사실" },
  { sender: "other", message: "고백할게" },
  { sender: "other", message: "있어요" },
  { sender: "me", message: "역시 그럴줄 알았어요" },
  { sender: "other", message: "돈내놔" },
];

// 검사 기준 데이터
const scamCriteria = [
  { id: 1, text: "직거래 회피 및 택배 거래 유도", isTriggered: true },
  { id: 2, text: "3자 사기", isTriggered: false },
  { id: 3, text: "가짜 안전 거래 사이트", isTriggered: true },
  { id: 4, text: "재입금 유도", isTriggered: false },
  { id: 5, text: "이씨 인것", isTriggered: false },
  { id: 6, text: "말을 하다 마는것", isTriggered: false },
  { id: 7, text: "의심스러움 그냥", isTriggered: true },
  { id: 8, text: "그냥 범인", isTriggered: true },
];

// 사기 의심도 계산
const calculateScamPercentage = (criteria) => {
  const triggeredCount = criteria.filter((item) => item.isTriggered).length;
  return Math.round((triggeredCount / criteria.length) * 100);
};

function AnalysisResult() {
  const scamPercentage = calculateScamPercentage(scamCriteria);

  return (
    <div className="analysis-result">
      {/* 채팅 내용 */}
      <div className="chat-section">
        <h2>채팅 내역</h2>
        <div className="chat-box">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className={`chat-bubble ${chat.sender === "me" ? "my-message" : "other-message"}`}
            >
              {chat.message}
            </div>
          ))}
        </div>
      </div>

      {/* 검사 결과 */}
      <div className="result-section">
        <h2 className="result-section-title">확인 결과 : <span className="result-section-title-text">사기 의심도</span> <span className="scam-percentage">{scamPercentage}%</span></h2>
        <p className="result-section-subtitle">믿을 수 있는 거래의 시작, FBaI가 여러분과 함께해요.</p>
        <div className="criteria-list">
          {scamCriteria.map((criteria) => (
            <div key={criteria.id} className="criteria-item">
              {criteria.isTriggered ? (
                <Delete className="icon" />
              ) : (
                <CheckMark className="icon" />
              )}
              <span className={criteria.isTriggered ? "criteria-text red-text" : "criteria-text green-text"}>
                {criteria.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
