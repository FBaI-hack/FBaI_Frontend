import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DownArrow } from "../assets/icons/arrow_down.svg";
import { ReactComponent as UpArrow } from "../assets/icons/arrow_up.svg";
import { ReactComponent as Person } from "../assets/icons/person.svg";
import { ReactComponent as CheckedCheckbox } from "../assets/icons/checkbox_chcked.svg";
import { ReactComponent as EmptyCheckbox } from "../assets/icons/checkbox_empty.svg";
import "../styles/RegisterPost.css";

function RegisterPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("자유 게시판");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 자동 생성

  const categories = ["자유 게시판", "사건 신고", "사기 주의보", "검거 아이디어"];

  // location.state로부터 기본 카테고리를 설정
  useEffect(() => {
    if (location.state && location.state.defaultCategory) {
      setSelectedCategory(location.state.defaultCategory);
    }
  }, [location.state]);

  const handleSave = () => {
    // 게시글 저장 로직 추가 (API 호출 등)
    console.log("Saved Post:", { selectedCategory, title, content, link });
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="register-post-container">

      <button className="register-post-save-button" onClick={handleSave}>저장</button>

      {/* 카테고리 선택 */}
      <div className="register-post-category-selector">
        <div
          className="register-post-category-header"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <h2 className="register-post-category-header-text">{selectedCategory}</h2>
          {dropdownOpen ? <UpArrow /> : <DownArrow />}
        </div>
        {dropdownOpen && (
          <div className="register-post-category-dropdown">
            {categories.map((category) => (
              <div
                key={category}
                className="register-post-category-option"
                onClick={() => {
                  setSelectedCategory(category);
                  setDropdownOpen(false);
                }}
              >
                {selectedCategory === category ? (
                  <CheckedCheckbox className="register-post-checkbox-icon" />
                ) : (
                  <EmptyCheckbox className="register-post-checkbox-icon" />
                )}
                <span>{category}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 게시글 작성 */}
      <div className="register-post-form">
        <input
          type="text"
          placeholder="제목을 작성해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="register-post-title"
        />
        <div className="register-post-info">
          <div className="register-post-author">
            <span>작성자 : 000</span>
            <div className="register-post-person-icon-container">
                <Person className="register-post-person-icon" />
            </div>
          </div>
          <span className="register-post-date">작성일 : {today}</span>
        </div>
        <textarea
          placeholder="내용을 작성해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="register-post-content"
        />
        <div className="register-post-link">
          <span className="register-post-link-title">링크 추가:</span>
          <input
            type="text"
            placeholder="피해를 당한 게시글의 링크를 복사해 붙여넣어 주세요. (선택)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="register-post-link-input"
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <button className="register-post-cancel-button" onClick={handleCancel}>목록</button>
    </div>
  );
}

export default RegisterPost;
