import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddImage.css";
import { ReactComponent as Upload } from "../assets/icons/upload.svg";
import { ReactComponent as CloseBtn } from "../assets/icons/close.svg";

function AddImage() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  let dragCounter = 0; // 드래그 상태를 안정적으로 관리하기 위한 카운터
  const navigate = useNavigate();

  // 이미지 파일 선택 및 로드
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    if (images.length + fileArray.length > 15) {
      alert("최대 15장까지 업로드할 수 있습니다.");
      return;
    }
    const newImages = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter++;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter = 0;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData(); // 드래그된 데이터 초기화
    }
  };

  // 이미지 삭제
  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // 화면 전체에서 드래그 앤 드롭 이벤트 감지
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleStartAnalysis = () => {
    if (images.length === 0) {
      alert("최소 한 장의 이미지를 업로드해야 합니다.");
      return;
    }
    navigate("/analysis-result"); // 검사 결과 페이지로 이동
  };

  return (
    <div className="add-image">
      {/* 안내 텍스트 */}
      <h1 className="add-imagetext2">더 정확한 판단을 위해</h1>
      <h2 className="add-imagetext3">
        <span className="add-imagetext">채팅 내용</span>을 캡쳐해 업로드해 주세요.
      </h2>
      <p>버튼을 누르거나 화면으로 드래그&드롭 해주세요.</p>

      {/* 업로드 버튼 */}
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-button">
          <Upload className="upload-icon" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* 드래그 앤 드롭 안내 */}
      {isDragging && (
        <div className="fullscreen-dropzone">
          <p className="fullscreen-dropzone-text">여기에 이미지를 놓으세요</p>
        </div>
      )}

      {/* 이미지 미리보기 */}
      <div className="image-container">
        {images.map((src, index) => (
          <div key={index} className="image-wrapper">
            <img src={src} alt={`uploaded-${index}`} />
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
            >
              <CloseBtn className="close-icon" />
            </button>
          </div>
        ))}
      </div>

      {/* 검사 시작 버튼 */}
      <button className="submit-button" onClick={handleStartAnalysis}>검사 시작</button>
    </div>
  );
}

export default AddImage;
