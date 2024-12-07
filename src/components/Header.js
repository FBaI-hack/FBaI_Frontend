import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../assets/icons/person.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import { ReactComponent as BlueRightArrow } from "../assets/icons/blue_arrow_right.svg";
import "../styles/Header.css";

function Header() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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
            <ProfileIcon className="profile-icon" />
          </div>
          {showProfileDropdown && (
            <div className="dropdown-menu profile-dropdown">
              <Link to="/mypage" className="dropdown-item">
                마이 페이지
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
              <Link to="/logout" className="dropdown-item">
                로그아웃
                <RightArrow className="right-arrow" />
                <BlueRightArrow className="blue-right-arrow" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
