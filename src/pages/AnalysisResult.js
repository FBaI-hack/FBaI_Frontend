import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AnalysisResult.css";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ReactComponent as CheckMark } from "../assets/icons/check_mark.svg";

// 샘플 채팅 데이터
const chatData = [
  { sender: "me", message: "안녕하세요! 가격이 시세보다 많이 저렴한데, 이유가 있나요?" },
  { sender: "other", message: "제가 급히 정리할 일이 있어서요. 빨리 처분해야 해서 싸게 올렸어요. 원래 가격 확인하셨으면 아시겠지만, 정말 좋은 기회예요!" },
  { sender: "me", message: "혹시 직거래도 가능한가요? 저는 서울 강남쪽입니다." },
  { sender: "other", message: "제가 지금 지방에 내려와 있어서 택배 거래만 가능해요. 편하게 안전결제 링크로 보내드릴게요! 택배비는 제가 부담할게요. 😊" },
  { sender: "me", message: "안전결제요? 어디서 발급한건가요?" },
  { sender: "other", message: "네, 여기 믿을 수 있는 거래 사이트에서 바로 발급했어요. safe-guard.com 여기 들어가셔서 결제하시면 돼요. 정말 안전합니다. 😊" },
  { sender: "me", message: "아 그러면 혹시 네고 조금 가능할까요..?" },
  { sender: "other", message: "아...보시면 아시겠지만, 저도 급처라서 최대한 싼가격에 올렸거든요" },
  { sender: "me", message: "ㅠㅠ 알겠습니다. 그러면 보내고 송장 바로 보내주세요. 계좌 알려주세요." },
  { sender: "other", message: "계좌는 카카오 뱅크 3333-33-33333 김민정입니다. 대신 입금자명이 구매자님 성함이 아니면 미리 알려주세요!" },
  { sender: "me", message: "입금했습니다!" },
  { sender: "other", message: "네 확인됐습니다!" },
];

// 검사 기준 데이터
const scamCriteria = [
  { id: 1, text: "키워드 기반 채팅 분석 결과", isTriggered: false },
  { id: 2, text: "전화번호 스팸 확인 결과", isTriggered: false },
  { id: 3, text: "전화번호 유효성 검사 결과", isTriggered: false },
  { id: 4, text: " 이메일 유효성 검사 결과", isTriggered: false },
  { id: 5, text: "계좌번호 실명 검사 결과", isTriggered: false },
  { id: 6, text: "유사 이미지 검색 결과", isTriggered: true },
];

// 사기 의심도 계산
const calculateScamPercentage = (criteria) => {
  const triggeredCount = criteria.filter((item) => item.isTriggered).length;
  return Math.round((triggeredCount / criteria.length) * 100);
};

// 중고 거래 체크리스트 데이터
const checklistItems = [
  "외관 상태 확인: 스크래치, 버튼의 눌림 상태 등",
  "기능 테스트: 전원, 주요 기능, 배터리 수명, 충전 여부 확인",
  "원산지 및 보증 확인: 정품 여부, 보증 시리얼 번호 확인",
];

function AnalysisResult() {
  const scamPercentage = calculateScamPercentage(scamCriteria);
  const navigate = useNavigate();
  const location = useLocation();

  const isFromMyChatAnalysis = location.state?.from === "MyChatAnalysis";

  return (
    <div className="analysis-result">

      {/* 돌아가기 버튼 */}
      {isFromMyChatAnalysis && (
        <button
          className="back-button-to-analysis-result"
          onClick={() => navigate("/mypage", { state: { selectedPage: "chat-analysis-result" } })}
        >
          돌아가기
        </button>
      )}

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
        <h2 className="result-section-title">확인 결과 : <span className="result-section-title-text">사기 의심도</span> <span className="scam-percentage">낮음</span></h2>
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

        {/* 중고 거래 체크리스트 */}
        <div className="checklist-section">
          <h3 className="checklist-title">중고 거래 체크리스트! - 태블릿/노트북</h3>
          <ul className="checklist-items">
            {checklistItems.map((item, index) => (
              <li key={index} className="checklist-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
}

export default AnalysisResult;
