import React from "react";
import { useNavigate } from "react-router-dom";

function SelectionPage({ selectedSchool, onResetSchool }) {
  const navigate = useNavigate();

  if (!selectedSchool) {
    return (
      <main className="page-main">
        <div className="card-large" style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 16 }}>먼저 학교를 선택해 주세요.</p>
          <button className="back-button" onClick={() => navigate("/")}>
            ← 학교 검색 페이지로 이동
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <div className="card-large">
        <button
          className="back-button"
          onClick={() => {
            onResetSchool();
            navigate("/");
          }}
        >
          ← 학교 다시 검색하기
        </button>

        <section className="school-header">
          <div className="school-header-text">
            <div className="school-name">{selectedSchool.name}</div>
            <div className="school-dept">
              {selectedSchool.department || "학과 정보"}
            </div>
          </div>
        </section>

        <section className="detail-grid">
          {/* 커리큘럼 로드맵 카드 */}
          <div
            className="detail-card detail-card-roadmap"
            style={{ textAlign: "center" }}   
            onClick={() => navigate("/roadmap", { state: { universityId: selectedSchool.id } })
  }
          >
            <div className="detail-card-emoji">🗺️</div>
            <div className="detail-card-title">커리큘럼 로드맵</div>
            <div className="detail-card-desc">
              과목 간 연결 관계를 시각적으로 확인하고,
              <br />
              어떤 순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </div>
          </div>

          {/* 전공과목 시뮬레이션 카드 */}
          <div
            className="detail-card detail-card-dashboard"
            style={{ textAlign: "center" }}  
            onClick={() => navigate("/dashboard")}
          >
            <div className="detail-card-emoji">📊</div>
            <div className="detail-card-title">전공과목 시뮬레이션</div>
            <div className="detail-card-desc">
              수강한 전공과목을 선택해 전공 이수 학점과
              <br />
              남은 과목을 한눈에 확인할 수 있습니다.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SelectionPage;
