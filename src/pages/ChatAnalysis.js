import React, { useState } from "react";
import "../styles/ChatAnalysis.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseBtn } from "../assets/icons/close.svg";

const categories = [
  { name: "휴대폰/주변기기", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/03_cellphone.gif" },
  { name: "티켓/상품권", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/17_ticket.gif" },
  { name: "패션/의류", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/06_fashion.gif" },
  { name: "카메라/주변기기", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/04_camera.gif"},
  { name: "MP3/전자사전", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/19_mp3.gif"},
  { name: "컴퓨터/주변기기", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/01_computer.gif"},
  { name: "자동차/바이크", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/12_car.gif"},
  { name: "태블릿/노트북", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/02_tablet.gif"},
  { name: "신발", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/29_shose.gif"},
  { name: "스포츠/레저/운동", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/10_travel.gif"},
  { name: "게임기/주변기기", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/33_game.gif"},
  { name: "유아동/출산", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/09_baby.gif"},
  { name: "가전/전자제품", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/05_home.gif"},
  { name: "가방/지갑/잡화", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/23_bag.gif"},
  { name: "음악/영화/주변기기", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/20_music.gif"},
  { name: "도서/학습", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/15_book.gif"},
  { name: "시계", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/30_watch.gif"},
  { name: "뷰티/미용/화장품", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/07_beauty.gif"},
  { name: "취미/인형/피규어", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/11_hobby.gif"},
  { name: "식품/음료/의약품", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/21_drink.gif"},
  { name: "공구/중장비/농기구", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/26_tool.gif"},
  { name: "악세서리/귀금속", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/27_accessory.gif"},
  { name: "성인/사행성", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/22_adult.gif"},
  { name: "소프트웨어", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/25_software.gif"},
  { name: "동물/생물/식물", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/24_animal.gif"},
  { name: "가구/인테리어", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/08_furniture.gif"},
  { name: "안경/선글라스", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/34_glasses.gif"},
  { name: "생활/주방/욕실용품", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/16_kitchen.gif"},
  { name: "문구/사무/소모품", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/14_words.gif"},
  { name: "배송비", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/35_shipping.gif"},
  { name: "화폐", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/31_money.gif"},
  { name: "기타", icon: "https://thecheat.co.kr/rb/layouts/2014/images/icon/32_goods_etc.gif"},
];

function ChatAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [site, setSite] = useState("");
  const [itemName, setItemName] = useState("");
  const [suspectInfo, setSuspectInfo] = useState("");
  const [suspectInfoDetail, setSuspectInfoDetail] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [chatPostUrl, setChatPostUrl] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // 이미 선택된 카테고리를 클릭하면 취소
    } else {
      setSelectedCategory(category); // 선택
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSite(value);

    switch (value) {
      case "당근마켓":
        setPostUrl("daangn.com");
        break;
      case "중고나라":
        setPostUrl("cafe.naver.com");
        break;
      case "번개장터":
        setPostUrl("bunjang.co.kr");
        break;
      default:
        setPostUrl("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      selectedCategory,
      site,
      itemName,
      suspectInfo,
      suspectInfoDetail,
      postUrl,
    };
    console.log("Submitted Data:", formData);
    navigate("/add-image");
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="category-selection-form">
      <h1>카테고리 선택 및 정보 입력</h1>
      {/* 카테고리 선택 */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${
              selectedCategory === category.name ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.icon ? (
              <img
                src={category.icon}
                alt={category.name}
                className="category-icon-image"
              />
            ) : (
              <div className="category-icon-placeholder" />
            )}
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* 입력란 */}
      <form className="form-section" onSubmit={handleSubmit}>
        {/* 거래 사이트 */}
        <div className="form-group">
          <label>거래 사이트</label>
          <div className="site-select-container">
            <select
              name="site"
              value={site}
              onChange={handleInputChange}
              className="site-select"
            >
              <option value="">거래하고 있는 사이트를 선택해주세요.</option>
              <option value="당근마켓">당근마켓</option>
              <option value="중고나라">중고나라</option>
              <option value="번개장터">번개장터</option>
              <option value="기타">기타</option>
            </select>
            <h3 className="url-prefix">http://www.</h3>
            <input
              type="text"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              className="site-url"
              placeholder={site === "기타" ? "URL을 입력해주세요." : "URL이 자동으로 입력 돼요."}
              readOnly={site !== "기타"} // "기타"가 아닌 경우 readOnly 설정
            />
          </div>
        </div>

        {/* 거래 물품명 */}
        <div className="form-group">
          <label>거래 물품명</label>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="item-name"
            placeholder="거래한 물품의 물품명 또는 모델명을 입력해주세요."
          />
        </div>

        {/* 용의자 인적 사항 */}
        <div className="form-group">
          <label>용의자 인적 사항</label>
          <div className="suspect-info-container">
            <select
              name="suspectInfo"
              value={suspectInfo}
              onChange={(e) => setSuspectInfo(e.target.value)}
              className="suspect-select"
            >
              <option value="">입력하실 정보의 카테고리를 선택해주세요.</option>
              <option value="ID">ID</option>
              <option value="Messenger">메신저 주소</option>
              <option value="Email">이메일 주소</option>
            </select>
            <input
              type="text"
              name="suspectInfoDetail"
              value={suspectInfoDetail}
              onChange={(e) => setSuspectInfoDetail(e.target.value)}
              className="suspect-input"
              placeholder="용의자의 ID, 메신저 주소 또는 이메일을 입력해주세요."
            />
          </div>
        </div>

        {/* 판매 게시물 URL */}
        <div className="form-group">
          <label>판매 게시물 URL</label>
          <input
            type="text"
            name="postUrl"
            value={chatPostUrl}
            onChange={(e) => setChatPostUrl(e.target.value)}
            className="post-url"
            placeholder="판매 게시물의 URL을 입력해주세요."
          />
        </div>

        <h3 className="form-group-image-preview-text">올라온 상품 사진 하나를 업로드 해주세요.</h3>

        <div
          className={`form-group-image-upload-area ${dragActive ? "drag-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="form-group-image-preview">
              <img src={selectedImage} alt="Uploaded" />
              <button className="form-group-remove-image-button" onClick={handleRemoveImage}>
                <CloseBtn className="form-group-remove-image-button-t"/>
              </button>
            </div>
          ) : (
            <label htmlFor="image-upload-input" className="form-group-upload-label">
              <p style={{ fontSize: "13px", color: "#587DEB" }}>여기를 클릭하거나<br /> 이미지를 드래그하여 업로드하세요</p>
              <input
                type="file"
                id="image-upload-input"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">
          다음으로
        </button>
      </form>
    </div>
  );
}

export default ChatAnalysis;
