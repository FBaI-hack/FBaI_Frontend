import React, { useState } from "react";
import { ReactComponent as ProfileIcon } from "../assets/icons/person.svg";
import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import { ReactComponent as WhiteEdit } from "../assets/icons/white_edit.svg";
import "../styles/ProfileEdit.css";

function ProfileEdit() {
  const [nickname, setNickname] = useState("000");
  const [intro, setIntro] = useState("어쩌구 저쩌구");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);

  // 저장 버튼 클릭 이벤트
  const handleSave = () => {
    alert(`닉네임: ${nickname}\n자기소개: ${intro}`);
    // 여기에 저장 로직 추가 (예: API 호출)
  };

  return (
    <div className="content-body">
      <div className="profile-edit-section">
        <h1 className="profile-edit-section-title">프로필 변경</h1>
        <div className="profile-avatar">
          <div className="profile-avatar-icon-container">
            <ProfileIcon className="profile-avatar-icon" />
          </div>
          <div className="edit-icon-container">
            <WhiteEdit className="image-edit-icon" />
          </div>
        </div>
        <div className="profile-details">
          {/* 닉네임 */}
          <div className="detail-item">
            <span className="detail-item-name">닉네임 :</span>
            {isEditingNickname ? (
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="editable-input"
                onBlur={() => setIsEditingNickname(false)} // 포커스 해제 시 저장
                autoFocus
              />
            ) : (
              <span className="detail-item-name">{nickname}</span>
            )}
            <Edit
              className="edit-icon-inline"
              onClick={() => setIsEditingNickname(true)}
            />
          </div>

          {/* 자기소개 */}
          <div className="detail-item">
            <span className="detail-item-intro">자기소개 :</span>
            <Edit
              className="edit-icon-inline"
              onClick={() => setIsEditingIntro(true)}
            />
          </div>
          {isEditingIntro ? (
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="editable-textarea"
                onBlur={() => setIsEditingIntro(false)} // 포커스 해제 시 저장
                autoFocus
              />
            ) : (
              <span className="detail-item-intro-text">{intro}</span>
          )}
        </div>

        {/* 저장 버튼 */}
        <button className="profile-edit-save-button" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
