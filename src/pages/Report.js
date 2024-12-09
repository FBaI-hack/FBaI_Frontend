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
    author: "김민수",
    title: "주차장에서 차량 파손 사건 발생",
    date: "2024-12-06",
    views: 123,
  },
  {
    id: 2,
    author: "이영희",
    title: "지하철 내 소매치기 주의",
    date: "2024-12-05",
    views: 98,
  },
  {
    id: 3,
    author: "박철수",
    title: "상가 앞 물건 절도 사건",
    date: "2024-12-02",
    views: 145,
  },
  {
    id: 4,
    author: "정수진",
    title: "주택가 야간 침입 사건 발생",
    date: "2024-12-01",
    views: 67,
  },
  {
    id: 5,
    author: "최수진",
    title: "택배 도난 사례 증가",
    date: "2024-11-29",
    views: 204,
  },
  {
    id: 6,
    author: "한예슬",
    title: "공원에서 어린이 실종 사례",
    date: "2024-11-28",
    views: 173,
  },
  {
    id: 7,
    author: "김지훈",
    title: "아파트 주차장에서 차량 도난",
    date: "2024-11-27",
    views: 189,
  },
  {
    id: 8,
    author: "송지훈",
    title: "지하주차장에서 차량 안 물건 도난",
    date: "2024-11-27",
    views: 132,
  },
  {
    id: 9,
    author: "오세영",
    title: "대형마트에서 발생한 폭력 사건",
    date: "2024-11-25",
    views: 112,
  },
  {
    id: 10,
    author: "이승기",
    title: "전동 킥보드 도난 사건 증가",
    date: "2024-11-22",
    views: 176,
  },
  {
    id: 11,
    author: "박미영",
    title: "고속도로 휴게소에서 차량 파손",
    date: "2024-11-20",
    views: 153,
  },
  {
    id: 12,
    author: "강찬욱",
    title: "새벽 시간 도로변 폭행 사건",
    date: "2024-11-20",
    views: 89,
  },
  {
    id: 13,
    author: "정윤아",
    title: "학교 앞 불법 영업 신고",
    date: "2024-11-13",
    views: 75,
  },
  {
    id: 14,
    author: "오민석",
    title: "편의점에서 금품 강도 사건",
    date: "2024-11-12",
    views: 102,
  },
  {
    id: 15,
    author: "신혜진",
    title: "야간 골목길에서 발생한 절도 사건",
    date: "2024-11-10",
    views: 121,
  },
];


const POSTS_PER_PAGE = 12;

function Report() {
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
        category: "사건 신고",
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
        onClick={() => navigate("/register-post", { state: { defaultCategory: "사건 신고" } })}
      >등록</button>

      {/* 게시판 */}
      <h2 className="freeboard-title">사건 신고</h2>
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

export default Report;
