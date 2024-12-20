import React, { useState } from "react";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import "../styles/Posts.css";

const dummyPosts = [
  { id: 1, title: "중고거래 사기 사례 정리", date: "2024-11-26", views: 56 },
  { id: 2, title: "사기 피해 대처 방법", date: "2024-11-25", views: 42 },
  { id: 3, title: "안전한 거래 팁 공유", date: "2024-11-24", views: 10 },
  { id: 4, title: "온라인 사기 유형 분석", date: "2024-11-23", views: 44 },
  { id: 5, title: "최근 사례와 예방법", date: "2024-11-22", views: 78 },
  { id: 6, title: "주의해야 할 거래 플랫폼", date: "2024-11-21", views: 66 },
  { id: 7, title: "피해 예방을 위한 팁", date: "2024-11-20", views: 8 },
  { id: 8, title: "실제 사기 경험 공유", date: "2024-11-19", views: 100 },
  { id: 9, title: "사기범 신고 절차 안내", date: "2024-11-18", views: 30 },
  { id: 10, title: "거래 중 주의사항", date: "2024-11-17", views: 2 },
];


const POSTS_PER_PAGE = 8;

function Posts() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyPosts.length / POSTS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const currentPosts = dummyPosts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
    .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="posts-content-body">
      <table className="posts-table">
        <thead className="posts-table-thead">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody className="posts-table-tbody">
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{(currentPage - 1) * POSTS_PER_PAGE + index + 1}</td>
              <td className="posts-table-tbody-title">{post.title}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="posts-pagination">
        <button
          className="posts-pagination-arrow"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <LeftArrow className="posts-arrow-icon" />
        </button>
        <span className="posts-pagination-info">
          {currentPage}
        </span>
        <button
          className="posts-pagination-arrow"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <RightArrow className="posts-arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default Posts;
