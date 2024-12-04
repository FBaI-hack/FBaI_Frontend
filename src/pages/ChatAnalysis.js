import React, { useState, useEffect } from "react";
import "./ChatAnalysis.css";

function ChatAnalysis() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // 이미지 파일 선택 및 로드
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    if (images.length + fileArray.length > 10) {
      alert("최대 10장까지 업로드할 수 있습니다.");
      return;
    }
    const newImages = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  useEffect(() => {
    // 화면 전체에서 드래그 앤 드롭 이벤트 감지
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div className="ChatAnalysis">

      {/* 업로드 버튼 */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileUpload(e.target.files)}
        style={{ margin: "20px 0" }}
      />

      {/* 드래그 앤 드롭 안내 영역 */}
      {isDragging && (
        <div className="fullscreen-dropzone">
          <p>여기에 이미지를 놓으세요</p>
        </div>
      )}

      {/* 이미지 미리보기 */}
      <div className="image-container">
        {images.map((src, index) => (
          <div key={index} className="image-wrapper">
            <img src={src} alt={`uploaded-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatAnalysis;
