import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../assets/icons/arrow_right.svg";
import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import "../styles/MyChatAnalysis.css";

const dummyData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `20241206-${1100 + index}`,
  date: `2024-12-06`,
}));

const POSTS_PER_PAGE = 8;

function MyChatAnalysis() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(dummyData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / POSTS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const currentPosts = data.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleEditClick = (index) => {
    if (editingIndex === index) {
      // 저장 로직
      const updatedData = [...data];
      updatedData[index].title = tempTitle;
      setData(updatedData);
      setEditingIndex(null);
    } else {
      // 편집 모드 활성화
      setEditingIndex(index);
      setTempTitle(data[index].title);
    }
  };

  const handleRowClick = (id, index) => {
    if (editingIndex !== index) {
      navigate("/analysis-result", { state: { from: "MyChatAnalysis" } });
    }
  };

  return (
    <div className="mychatanalysis-content-body">
      <table className="mychatanalysis-table">
        <thead className="mychatanalysis-table-thead">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody className="mychatanalysis-table-tbody">
          {currentPosts.map((item, index) => (
            <tr key={item.id}>
              <td>{(currentPage - 1) * POSTS_PER_PAGE + index + 1}</td>
              <td
                onClick={() => handleRowClick(item.id, index)}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      setTempTitle(e.target.value); // 제목 업데이트
                    }}
                    className="mychatanalysis-title-input"
                  />
                ) : (
                  <span>{item.title}</span>
                )}
                <Edit
                  className="mychatanalysis-edit-icon"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 전파 방지
                    handleEditClick(index); // Edit 버튼 로직만 실행
                  }}
                />
              </td>
              <td>
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mychatanalysis-pagination">
        <button
          className="mychatanalysis-pagination-arrow"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <LeftArrow className="mychatanalysis-arrow-icon" />
        </button>
        <span className="mychatanalysis-pagination-info">{currentPage}</span>
        <button
          className="mychatanalysis-pagination-arrow"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <RightArrow className="mychatanalysis-arrow-icon" />
        </button>
      </div>
    </div>
  );
}

export default MyChatAnalysis;
