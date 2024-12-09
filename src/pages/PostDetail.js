import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Person } from "../assets/icons/person.svg";
import { ReactComponent as ThumbsUp } from "../assets/icons/thumbsup.svg";
import { ReactComponent as BlueThumbsUp } from "../assets/icons/blue_thumbsup.svg";
import { ReactComponent as Enter } from "../assets/icons/enter.svg";
import useUserStore from "../store/userStore";
import "../styles/PostDetail.css";

function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { category, author, title, date } = location.state || {};
  const [likes, setLikes] = useState(10); // 초기 좋아요 수
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [comments, setComments] = useState([
    { id: 1, author: "이진수", content: "그러니까요..", date: "2024-12-02" },
    { id: 2, author: "유영미", content: "저도 최근에 당했어요", date: "2024-12-02" },
  ]);
  const [newComment, setNewComment] = useState("");

  // 좋아요 버튼 클릭
  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  // 댓글 추가
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      author: user.nickname,
      content: newComment,
      date: new Date().toISOString().split("T")[0], // 오늘 날짜
    };
    setComments((prev) => [...prev, newCommentData]);
    setNewComment("");
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <h2 className="post-detail-header-text">{category}</h2>
        <button className="post-detail-back-button" onClick={() => navigate(-1)}>
          목록
        </button>
      </div>

      <div className="post-detail-title">{title}</div>
      <div className="post-detail-info">
        <div className="post-detail-author">
          <span>작성자 : {author}</span>
          <div className="post-detail-author-icon-container">
            <Person className="post-detail-author-icon" />
          </div>
        </div>
        <span className="post-detail-date">작성일 : {date}</span>
      </div>

      <div className="post-detail-content-container">
        <div className="post-detail-content">
            계획적으로 더 치밀하게 사기 범죄를 일으키고 있습니다. 정말 분통해요!!
        </div>
        <a href="#!" className="post-detail-related-link">
            해당 게시글로 가기
        </a>
      </div>

      <div className="post-detail-like-section">
        <button
          className={`post-detail-like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {liked ? (
            <BlueThumbsUp className="post-detail-like-icon" />
          ) : (
            <ThumbsUp className="post-detail-like-icon" />
          )}
          <span className="post-detail-like-count">{likes}</span>
        </button>
      </div>

      <div className="post-detail-comments-section">
        <h3 className="post-detail-comments-title">댓글 <span className="post-detail-comments-count">{comments.length}개</span></h3>
        <ul className="post-detail-comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="post-detail-comment">
              <div className="post-detail-comment-author">
                <div className="post-detail-comment-author-icon-container">
                    <Person className="post-detail-comment-author-icon" />
                </div>
                {comment.author}
              </div>
              <div className="post-detail-comment-divide"></div>
              <div className="post-detail-comment-content">{comment.content}</div>
              <span className="post-detail-comment-date">{comment.date}</span>
            </li>
          ))}
        </ul>

        <form className="post-detail-comment-form"
              onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="post-detail-comment-input"
          />
          <button type="submit" className="post-detail-comment-submit" >
            <Enter className="post-detail-comment-submit-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
