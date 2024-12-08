import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../assets/icons/person.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import { ReactComponent as BlueRightArrow } from "../assets/icons/blue_arrow_right.svg";
import "../styles/Header.css";
import useUserStore from "../store/userStore";

function Header() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // Zustand 상태 초기화
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div>
        <Link to="/" className="logo">
          FBal
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="navbar">
        <Link to="/chat-analysis" className="nav-link">
          채팅 분석
        </Link>

        {/* 커뮤니티 드롭다운 메뉴 */}
        <div
          className="dropdown-container"
          onMouseEnter={() => setShowCommunityDropdown(true)}
          onMouseLeave={() => setShowCommunityDropdown(false)}
        >
          <Link to="#" className="nav-link">
            커뮤니티
          </Link>
          {showCommunityDropdown && (
            <div className="dropdown-menu">
              <Link to="/community/freeboard" className="dropdown-item">
                자유 게시판
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
              <Link to="/community/report" className="dropdown-item">
                사건 신고
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
              <Link to="/community/warning" className="dropdown-item">
                사기 주의보
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
              <Link to="/community/ideas" className="dropdown-item">
                검거 아이디어
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
            </div>
          )}
        </div>

        {/* 프로필 이미지 드롭다운 메뉴 */}
        <div
          className="dropdown-container"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="profile-icon-container">
            {user?.image_url ? (
              <img
                src={user.image_url}
                alt="Profile"
                className="header-profile-image"
              />
            ) : (
              <ProfileIcon className="profile-icon" />
            )}
          </div>
          {showProfileDropdown && (
            <div className="dropdown-menu profile-dropdown">
              <Link to="/mypage" className="dropdown-item">
                마이 페이지
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
              <button
                className="dropdown-item logout-button"
                onClick={handleLogout}
              >
                로그아웃
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
