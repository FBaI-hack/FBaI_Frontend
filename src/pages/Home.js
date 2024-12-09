import React from "react";
import "../styles/Home.css";

const mockData = {
  totalReports: "2,230,111건",
  totalLoss: "309,710억 원",
  totalUsers: "492,359명",
  dailyReports: "1일 평균 : 1,537건",
  dailyLoss: "1일 평균 : 134억 원",
  top10Scams: [
    { rank: 1, name: "김현우", platform: "cafe.naver.com", loss: "2,641만 원" },
    { rank: 2, name: "정수현", platform: "bunjang.co.kr", loss: "2,537만 원" },
    { rank: 3, name: "김민수", platform: "maplestory.nexon.com", loss: "2,431만 원" },
    { rank: 4, name: "박지훈", platform: "twitter.com", loss: "2,325만 원" },
    { rank: 5, name: "최지훈", platform: "daangn.com", loss: "2,105만 원" },
    { rank: 6, name: "조혜진", platform: "kakao.com", loss: "1,980만 원" },
    { rank: 7, name: "송지민", platform: "joongna.com", loss: "1,842만 원" },
    { rank: 8, name: "오민석", platform: "facebook.com", loss: "1,420만 원" },
    { rank: 9, name: "한수진", platform: "blog.naver.com", loss: "1,300만 원" },
    { rank: 10, name: "이수정", platform: "instagram.com", loss: "1,256만 원" },
  ],
  carriers: [
    { name: "SKT", count: "88,951건", percentage: "29.54%" },
    { name: "KT", count: "44,472건", percentage: "14.77%" },
    { name: "LG U+", count: "44,477건", percentage: "14.77%" },
  ],
};

function Home() {
  const { totalReports, totalLoss, totalUsers, dailyReports, dailyLoss, top10Scams, carriers } =
    mockData;

  return (
    <div className="home-container">
      <h1 className="home-title">중고거래 피해 통계</h1>
      <p className="home-subtitle">
        작은 주의가 큰 피해를 막습니다. 지금 확인하세요!
      </p>

      {/* 통계 요약 */}
      <div className="home-summary">
        <div className="home-summary-item">피해 접수 : <span>{totalReports}</span></div>
        <div className="home-summary-item">피해 금액 : <span>{totalLoss}</span></div>
        <div className="home-summary-item">피해자 수 : <span>{totalUsers}</span></div>
        <div className="home-summary-item">{dailyReports}</div>
        <div className="home-summary-item">{dailyLoss}</div>
      </div>

      {/* Top 10 피해자 */}
      <h2 className="home-section-title">피해자 통계 (Top 10)</h2>
      <table className="home-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>거래 플랫폼</th>
            <th>피해 금액</th>
          </tr>
        </thead>
        <tbody>
          {top10Scams.map((scam) => (
            <tr key={scam.rank}>
              <td>{scam.rank}</td>
              <td>{scam.name}</td>
              <td>{scam.platform}</td>
              <td>{scam.loss}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 통신사 통계 */}
      <h2 className="home-section-title">통신사</h2>
      <table className="home-table">
        <thead>
          <tr>
            <th>통신사</th>
            <th>건수</th>
            <th>비율</th>
          </tr>
        </thead>
        <tbody>
          {carriers.map((carrier, index) => (
            <tr key={index}>
              <td>{carrier.name}</td>
              <td>{carrier.count}</td>
              <td>{carrier.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
