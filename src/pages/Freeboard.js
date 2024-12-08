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
    author: "김철수", 
    title: "조심해야 할 상황입니다.", 
    date: "2024-12-09", 
    views: 123 
  },
  { 
    id: 2, 
    author: "이영희", 
    title: "주의하세요! 새로운 정보", 
    date: "2024-12-05", 
    views: 89 
  },
  { 
    id: 3, 
    author: "박민수", 
    title: "오늘 뉴스에서 나온 사건", 
    date: "2024-12-03", 
    views: 56 
  },
  { 
    id: 4, 
    author: "최수진", 
    title: "안전 수칙을 지켜야 합니다", 
    date: "2024-12-01", 
    views: 78 
  },
  { 
    id: 5, 
    author: "조성민", 
    title: "피해 사례 공유합니다", 
    date: "2024-11-20", 
    views: 102 
  },
  { 
    id: 6, 
    author: "송지훈", 
    title: "알아두면 좋은 정보", 
    date: "2024-11-15", 
    views: 134 
  },
  { 
    id: 7, 
    author: "김은정", 
    title: "오늘의 경고 상황", 
    date: "2024-11-13", 
    views: 45 
  },
  { 
    id: 8, 
    author: "송지훈", 
    title: "온라인 거래 후 물건이 오지 않습니다.", 
    date: "2024-11-24", 
    views: 132 
  },
  { 
    id: 9, 
    author: "박세영", 
    title: "주의사항 업데이트", 
    date: "2024-11-10", 
    views: 87 
  },
  { 
    id: 10, 
    author: "최지훈", 
    title: "새로운 범죄 사례 공개", 
    date: "2024-11-05", 
    views: 156 
  },
  { 
    id: 11, 
    author: "정윤아", 
    title: "꼭 알아야 할 정보", 
    date: "2024-10-29", 
    views: 93 
  },
  { 
    id: 12, 
    author: "강찬욱", 
    title: "경고, 이런 경우 조심하세요", 
    date: "2024-10-22", 
    views: 120 
  },
  { 
    id: 13, 
    author: "한예슬", 
    title: "안전하게 생활하는 방법", 
    date: "2024-10-12", 
    views: 76 
  },
  { 
    id: 14, 
    author: "오민석", 
    title: "새롭게 발견된 위험 요소", 
    date: "2024-10-09", 
    views: 150 
  },
  { 
    id: 15, 
    author: "신혜진", 
    title: "실제 사례 공유합니다", 
    date: "2024-10-09", 
    views: 88 
  },
];



const POSTS_PER_PAGE = 12;

function Freeboard() {
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
        category: "자유 게시판",
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
        onClick={() => navigate("/register-post", { state: { defaultCategory: "자유 게시판" } })}
      >등록</button>

      {/* 게시판 */}
      <h2 className="freeboard-title">자유 게시판</h2>
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

export default Freeboard;
