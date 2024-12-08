import React, { useState, useEffect } from "react";
import { ReactComponent as ProfileIcon } from "../assets/icons/person.svg";
import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import { ReactComponent as WhiteEdit } from "../assets/icons/white_edit.svg";
import "../styles/ProfileEdit.css";
import useUserStore from "../store/userStore";

function ProfileEdit() {
  const { user, accessToken, setUser } = useUserStore();
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setIntro(user.introduce || "자기소개가 없습니다.");
      setSelectedImage(user.image_url);
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // console.log("파일 로드 완료:", reader.result);
        setSelectedImage(reader.result); // 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  // 저장 버튼 클릭 이벤트
  const handleSave = async () => {
    const requestBody = {
      nickname,
      image_url: selectedImage || "",
      introduce: intro,
    };
    console.log(requestBody);
    console.log(accessToken);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/member`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("프로필이 성공적으로 업데이트되었습니다!");
        // Zustand에 업데이트된 사용자 정보 저장
        setUser({ ...user, nickname, introduce: intro, image_url: selectedImage });
      } else {
        alert("프로필 업데이트에 실패했습니다.");
        console.error("서버 에러:", data.error);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="content-body">
      <div className="profile-edit-section">
        <h1 className="profile-edit-section-title">프로필 변경</h1>
        <div className="profile-avatar">
          <div className="profile-avatar-icon-container">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="프로필 이미지"
                className="profile-avatar-icon-ch"
              />
            ) : (
              <ProfileIcon className="profile-avatar-icon" />
            )}
          </div>
          <div className="edit-icon-container">
            <label htmlFor="image-upload" className="image-upload-label">
              <WhiteEdit className="image-edit-icon" />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(e) => {
                console.log("onChange 이벤트 발생");
                handleImageChange(e);
              }}
              style={{ display: "none" }}
            />
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
