import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../assets/icons/person.svg";
import ProfileEdit from "./ProfileEdit";
import Posts from "./Posts";
import Comments from "./Comments";
import Favorites from "./Favorites";
import "../styles/MyPage.css";

function MyPage() {
    const [selectedPage, setSelectedPage] = useState("profile-edit");

    // 페이지 컴포넌트를 동적으로 렌더링
    const renderPageContent = () => {
        switch (selectedPage) {
        case "profile-edit":
            return <ProfileEdit />;
        case "posts":
            return <Posts />;
        case "comments":
            return <Comments />;
        case "favorites":
            return <Favorites />;
        default:
            return null;
        }
    };

    return (
        <div className="mypage-container">
            {/* 왼쪽 네비게이션 */}
            <div className="mypage-sidebar">
            <div className="mypage-profile-section">
                <div className="mypage-profile-card">
                    <div className="mypage-profile-card-content">
                    <div className="mypage-profile-card-icon-container">
                        <ProfileIcon className="mypage-profile-card-icon" />
                    </div>
                    <h3 className="mypage-profile-name">이름</h3>
                    </div>
                    <p className="mypage-profile-intro">자기소개</p>
                </div>
            </div>
            <nav className="mypage-nav">
                <button
                className={`nav-item ${selectedPage === "profile-edit" ? "active" : ""}`}
                onClick={() => setSelectedPage("profile-edit")}
                >
                프로필 변경
                </button>
                <button
                className={`nav-item ${selectedPage === "posts" ? "active" : ""}`}
                onClick={() => setSelectedPage("posts")}
                >
                작성한 게시글
                </button>
                <button
                className={`nav-item ${selectedPage === "comments" ? "active" : ""}`}
                onClick={() => setSelectedPage("comments")}
                >
                작성한 댓글
                </button>
                <button
                className={`nav-item ${selectedPage === "favorites" ? "active" : ""}`}
                onClick={() => setSelectedPage("favorites")}
                >
                좋아하는 게시글
                </button>
            </nav>
            </div>
    
            {/* 오른쪽 프로필 정보 */}
            <div className="mypage-content">
                {renderPageContent()}
            </div>
        </div>
    );
}
  
export default MyPage;