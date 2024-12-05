import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import { ReactComponent as Person } from "../assets/icons/person.svg";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import "../styles/Freeboard.css";

const dummyPosts = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  author: `작성자${20 - index}`,
  title: `김${20 - index} 조심하세요.`,
  date: `2024-11-${26 - (index % 10)}`,
  views: Math.floor(Math.random() * 100),
}));

const POSTS_PER_PAGE = 12;

function Warning() {
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
        onClick={() => navigate("/register-post", { state: { defaultCategory: "사기 주의보" } })}
      >등록</button>

      {/* 게시판 */}
      <h2 className="freeboard-title">사기 주의보</h2>
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
            <tr key={post.id}>
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

export default Warning;
