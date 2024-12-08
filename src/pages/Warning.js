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
    author: "이영수",
    title: "중고 노트북 구매 후 가짜 제품이 왔습니다.",
    date: "2024-12-09",
    views: 123,
  },
  {
    id: 2,
    author: "박민정",
    title: "거래 후 판매자가 잠수를 탔습니다.",
    date: "2024-12-08",
    views: 98,
  },
  {
    id: 3,
    author: "김철수",
    title: "핸드폰을 구매했는데 작동하지 않습니다.",
    date: "2024-12-05",
    views: 145,
  },
  {
    id: 4,
    author: "정수진",
    title: "거래 약속 장소에 나타나지 않은 판매자",
    date: "2024-12-04",
    views: 67,
  },
  {
    id: 5,
    author: "최수진",
    title: "직거래에서 위조 지폐를 받았습니다.",
    date: "2024-12-01",
    views: 204,
  },
  {
    id: 6,
    author: "한예슬",
    title: "중고 거래 사기를 당했는데 도움받을 곳이 없네요.",
    date: "2024-11-26",
    views: 173,
  },
  {
    id: 7,
    author: "김지훈",
    title: "거래 후 물건을 다시 빼앗아 간 사례입니다.",
    date: "2024-11-25",
    views: 189,
  },
  {
    id: 8,
    author: "송지훈",
    title: "온라인 거래 후 물건이 오지 않습니다.",
    date: "2024-11-24",
    views: 132,
  },
  {
    id: 9,
    author: "오세영",
    title: "중고 거래 사이트에서 사기 피해를 당했습니다.",
    date: "2024-11-21",
    views: 112,
  },
];


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

  const handlePostClick = (post) => {
    navigate("/post-detail", {
      state: {
        category: "사기 주의보",
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

export default Warning;
