import React, { useState } from "react";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import "../styles/Comments.css";

const dummyComments = [
  { id: 1, title: "맹인호 조심하세요", comment: "맞아요 맞아요", date: "2024-11-26" },
  { id: 2, title: "박00 주의하세요", comment: "정말 위험해요", date: "2024-11-25" },
  { id: 3, title: "사기 조심하세요", comment: "여러 번 당할 뻔했어요", date: "2024-11-24" },
  { id: 4, title: "이00 믿지 마세요", comment: "저도 당했어요", date: "2024-11-23" },
  { id: 5, title: "최00 후기", comment: "문제가 많아요", date: "2024-11-22" },
  { id: 6, title: "서00 사기꾼입니다", comment: "정말 사기꾼이에요", date: "2024-11-21" },
  { id: 7, title: "유00 주의", comment: "정말 불편한 경험이었어요", date: "2024-11-20" },
  { id: 8, title: "길00 문제", comment: "이 사람 조심하세요", date: "2024-11-19" },
  { id: 9, title: "임00 사기", comment: "더 많은 피해가 없길", date: "2024-11-18" },
  { id: 10, title: "권00 거래 후기", comment: "다신 거래 안 해요", date: "2024-11-17" },
];

const COMMENTS_PER_PAGE = 6;

function Comments() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyComments.length / COMMENTS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const currentComments = dummyComments
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
    .slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE);

  return (
    <div className="comments-content-body">
      <table className="comments-table">
        <thead className="comments-table-thead">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody className="comments-table-tbody">
          {currentComments.map((comment, index) => (
            <tr key={comment.id}>
              <td>{(currentPage - 1) * COMMENTS_PER_PAGE + index + 1}</td>
              <td>
                <div className="comments-table-tbody-title">제목: {comment.title}</div>
                <div className="comments-table-comment">→ {comment.comment}</div>
              </td>
              <td className="comments-table-date">{comment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="comments-pagination">
        <button
          className="comments-pagination-arrow"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <LeftArrow className="comments-arrow-icon" />
        </button>
        <span className="comments-pagination-info">{currentPage}</span>
        <button
          className="comments-pagination-arrow"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <RightArrow className="comments-arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default Comments;
