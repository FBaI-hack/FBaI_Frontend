import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import { ReactComponent as Person } from "../assets/icons/person.svg";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import "../styles/Freeboard.css";

const dummyPosts = [
  {
    id: 1,
    author: "김영수",
    title: "실시간 위치 추적을 이용한 범죄자 검거 아이디어",
    date: "2024-12-08",
    views: 120,
  },
  {
    id: 2,
    author: "박민정",
    title: "안심 거래 앱에 의무 신원 인증 도입 제안",
    date: "2024-12-07",
    views: 95,
  },
  {
    id: 3,
    author: "이철수",
    title: "범죄 예방을 위한 공공 장소의 AI 감시 카메라",
    date: "2024-12-03",
    views: 140,
  },
  {
    id: 4,
    author: "최수진",
    title: "가짜 계정 검증 시스템 구축 방안",
    date: "2024-11-29",
    views: 80,
  },
  {
    id: 5,
    author: "한예슬",
    title: "범죄 유형별 맞춤 대응 매뉴얼 제작 아이디어",
    date: "2024-11-25",
    views: 105,
  },
  {
    id: 6,
    author: "송지훈",
    title: "블록체인 기술을 활용한 거래 내역 보안 강화",
    date: "2024-11-23",
    views: 135,
  },
  {
    id: 7,
    author: "정세영",
    title: "거래 시 보험 가입 의무화 방안",
    date: "2024-11-17",
    views: 175,
  },
  {
    id: 8,
    author: "오민석",
    title: "범죄 신고 앱에 AI 분석 기능 추가",
    date: "2024-11-15",
    views: 110,
  },
  {
    id: 9,
    author: "강찬욱",
    title: "가상현실(VR)을 활용한 범죄 예방 교육 프로그램",
    date: "2024-11-10",
    views: 98,
  },
];


const POSTS_PER_PAGE = 12;

function Ideas() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPosts = dummyPosts
    .filter(
      (post) =>
        post.author.includes(searchQuery) || post.title.includes(searchQuery)
    )
    .sort((a, b) => a.id - b.id); // 역순 정렬

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePostClick = (post) => {
    navigate("/post-detail", {
      state: {
        category: "검거 아이디어",
        author: post.author,
        title: post.title,
        date: post.date,
      },
    });
  };

  return (
    <div className="freeboard-content-body">
      {/* 검색창 */}
      <div className="freeboard-search-container">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          className="freeboard-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="freeboard-search-icon" />
      </div>

      {/* 등록 버튼 */}
      <button 
        className="freeboard-register-button"
        onClick={() => navigate("/register-post", { state: { defaultCategory: "검거 아이디어" } })}
      >등록</button>

      {/* 게시판 */}
      <h2 className="freeboard-title">검거 아이디어</h2>
      <table className="freeboard-table">
        <thead className="freeboard-table-thead">
          <tr>
            <th>번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody className="freeboard-table-tbody">
          {currentPosts.map((post, index) => (
            <tr 
              key={post.id}
              onClick={() => handlePostClick(post)}
            >
              <td>
                {dummyPosts.length - ((currentPage - 1) * POSTS_PER_PAGE + index)}
              </td>
              <td className="freeboard-author">
                <div className="freeboard-person-icon-container">
                    <Person className="freeboard-person-icon" />
                </div>
                {post.author}
              </td>
              <td className="freeboard-title-cell">{post.title}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="freeboard-pagination">
        <button
          className="freeboard-pagination-arrow"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <LeftArrow className="freeboard-arrow-icon" />
        </button>
        <span className="freeboard-pagination-info">{currentPage}</span>
        <button
          className="freeboard-pagination-arrow"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <RightArrow className="freeboard-arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default Ideas;
