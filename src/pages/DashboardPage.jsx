import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TRACKS = [
  {
    id: "mobile",
    name: "모바일 소프트웨어",
    description: "모바일 앱 개발 및 모바일 시스템 설계 트랙",
  },
  {
    id: "bigdata",
    name: "빅데이터",
    description: "데이터 분석, 데이터엔지니어링 전공 트랙",
  },
  {
    id: "xr",
    name: "디지털콘텐츠·가상현실",
    description: "게임 그래픽, XR·메타버스 콘텐츠 전공 트랙",
  },
  {
    id: "web",
    name: "웹공학",
    description: "웹 서비스 설계, 웹 애플리케이션 개발 트랙",
  },
];

const BASIC_MAX = 3;
const REQ_MAX = 15;
const ELEC_MAX = 39;
const TOTAL_MAX = 78;

const COURSES_BY_TRACK = {
  mobile: [
    { year: 1, category: "전기", name: "컴퓨터프로그래밍", code: "CTE0001" },
    { year: 1, category: "전선", name: "프로그래밍랩", code: "V020004" },
    { year: 2, category: "전필", name: "모바일&스마트시스템", code: "V021003" },
    { year: 2, category: "전선", name: "객체지향언어2", code: "V020007" },
    { year: 2, category: "전선", name: "데이터통신", code: "V020008" },
    { year: 2, category: "전선", name: "선형대수", code: "V020009" },
    { year: 2, category: "전선", name: "알고리즘", code: "V020010" },
    { year: 2, category: "전선", name: "오픈소스소프트웨어", code: "V020011" },
    { year: 3, category: "전필", name: "고급모바일프로그래밍", code: "V021006" },
    { year: 3, category: "전선", name: "네트워크프로그래밍", code: "V020017" },
    { year: 3, category: "전선", name: "설계패턴", code: "V020018" },
    { year: 3, category: "전선", name: "시스템프로그래밍", code: "V020016" },
    { year: 3, category: "전선", name: "컴퓨터비전", code: "V020019" },
    { year: 3, category: "전선", name: "SW프리캡스톤디자인", code: "V020034" },
    { year: 4, category: "전필", name: "모바일시스템응용프로젝트", code: "V021009" },
    { year: 4, category: "전선", name: "XR 온캠퍼스인턴십", code: "V020036" },
    { year: 4, category: "전선", name: "AI/클라우드온캠퍼스인턴십", code: "V020037" },
  ],
  bigdata: [
    { year: 1, category: "전기", name: "컴퓨터프로그래밍", code: "CTE0001" },
    { year: 1, category: "전선", name: "프로그래밍랩", code: "V020004" },
    { year: 2, category: "전필", name: "빅데이터기초", code: "V022006" },
    { year: 2, category: "전선", name: "객체지향언어2", code: "V020007" },
    { year: 2, category: "전선", name: "데이터통신", code: "V020008" },
    { year: 2, category: "전선", name: "선형대수", code: "V020009" },
    { year: 2, category: "전선", name: "알고리즘", code: "V020010" },
    { year: 2, category: "전선", name: "오픈소스소프트웨어", code: "V020011" },
    { year: 3, category: "전필", name: "데이터베이스설계", code: "V022004" },
    { year: 3, category: "전선", name: "네트워크프로그래밍", code: "V020017" },
    { year: 3, category: "전선", name: "설계패턴", code: "V020018" },
    { year: 3, category: "전선", name: "시스템프로그래밍", code: "V020016" },
    { year: 3, category: "전선", name: "컴퓨터비전", code: "V020019" },
    { year: 3, category: "전선", name: "SW프리캡스톤디자인", code: "V020034" },
    { year: 4, category: "전필", name: "인공지능", code: "V022009" },
    { year: 4, category: "전선", name: "모바일시스템응용프로젝트", code: "V021009" },
    { year: 4, category: "전선", name: "XR 온캠퍼스인턴십", code: "V020036" },
    { year: 4, category: "전선", name: "AI/클라우드온캠퍼스인턴십", code: "V020037" },
  ],
  xr: [
    { year: 1, category: "전기", name: "웹프로그래밍기초", code: "CTE0002" },
    { year: 1, category: "전선", name: "프로그래밍랩", code: "V020004" },
    { year: 2, category: "전필", name: "게임그래픽&애니메이션", code: "V023003" },
    { year: 2, category: "전선", name: "객체지향언어2", code: "V020007" },
    { year: 2, category: "전선", name: "데이터통신", code: "V020008" },
    { year: 2, category: "전선", name: "선형대수", code: "V020009" },
    { year: 2, category: "전선", name: "알고리즘", code: "V020010" },
    { year: 2, category: "전선", name: "오픈소스소프트웨어", code: "V020011" },
    { year: 3, category: "전필", name: "가상현실", code: "V023005" },
    { year: 3, category: "전선", name: "네트워크프로그래밍", code: "V020017" },
    { year: 3, category: "전선", name: "설계패턴", code: "V020018" },
    { year: 3, category: "전선", name: "시스템프로그래밍", code: "V020016" },
    { year: 3, category: "전선", name: "컴퓨터비전", code: "V020019" },
    { year: 3, category: "전선", name: "SW프리캡스톤디자인", code: "V020034" },
    { year: 4, category: "전필", name: "게임프로그래밍", code: "V023010" },
    { year: 4, category: "전선", name: "모바일시스템응용프로젝트", code: "V021009" },
    { year: 4, category: "전선", name: "XR 온캠퍼스인턴십", code: "V020036" },
    { year: 4, category: "전선", name: "AI/클라우드온캠퍼스인턴십", code: "V020037" },
  ],
  web: [
    { year: 1, category: "전기", name: "웹프로그래밍기초", code: "CTE0002" },
    { year: 1, category: "전선", name: "프로그래밍랩", code: "V020004" },
    { year: 2, category: "전필", name: "웹프로그래밍", code: "V024003" },
    { year: 2, category: "전선", name: "객체지향언어2", code: "V020007" },
    { year: 2, category: "전선", name: "데이터통신", code: "V020008" },
    { year: 2, category: "전선", name: "선형대수", code: "V020009" },
    { year: 2, category: "전선", name: "알고리즘", code: "V020010" },
    { year: 2, category: "전선", name: "오픈소스소프트웨어", code: "V020011" },
    { year: 3, category: "전필", name: "웹프레임워크1", code: "V024005" },
    { year: 3, category: "전선", name: "네트워크프로그래밍", code: "V020017" },
    { year: 3, category: "전선", name: "설계패턴", code: "V020018" },
    { year: 3, category: "전선", name: "시스템프로그래밍", code: "V020016" },
    { year: 3, category: "전선", name: "컴퓨터비전", code: "V020019" },
    { year: 3, category: "전선", name: "SW프리캡스톤디자인", code: "V020034" },
    { year: 4, category: "전필", name: "클라우드컴퓨팅", code: "V020031" },
    { year: 4, category: "전선", name: "모바일시스템응용프로젝트", code: "V021009" },
    { year: 4, category: "전선", name: "XR 온캠퍼스인턴십", code: "V020036" },
    { year: 4, category: "전선", name: "AI/클라우드온캠퍼스인턴십", code: "V020037" },
  ],
};

const INITIAL_COMPLETED = {
  mobile: [],
  bigdata: [],
  xr: [],
  web: [],
};

function DashboardPage({ selectedSchool }) {
  const navigate = useNavigate();

  const [selectedTrackIds, setSelectedTrackIds] = useState([]);
  const [completedByTrack, setCompletedByTrack] = useState(INITIAL_COMPLETED);

  if (!selectedSchool) {
    return (
      <main className="page-main">
        <div className="card-large" style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 16 }}>
            먼저 학교를 선택한 뒤 전공과목 시뮬레이션으로 이동해 주세요.
          </p>
          <button className="back-button" onClick={() => navigate("/")}>
            ← 학교 검색 페이지로 이동
          </button>
        </div>
      </main>
    );
  }

  const toggleTrack = (trackId) => {
    setSelectedTrackIds((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      }
      if (prev.length >= 2) {
        window.alert(
          "트랙은 최대 2개까지만 선택할 수 있습니다. 먼저 다른 트랙을 해제해주세요."
        );
        return prev;
      }
      return [...prev, trackId];
    });
  };

  const toggleCompleted = (trackId, code) => {
    setCompletedByTrack((prev) => {
      const current = prev[trackId] || [];
      const exists = current.includes(code);
      const nextCodes = exists
        ? current.filter((c) => c !== code)
        : [...current, code];
      return {
        ...prev,
        [trackId]: nextCodes,
      };
    });
  };

  const calcSummary = (trackId) => {
    const courses = COURSES_BY_TRACK[trackId] || [];
    const completed = new Set(completedByTrack[trackId] || []);

    let basicDone = 0;
    let reqDone = 0;
    let elecDone = 0;

    courses.forEach((c) => {
      if (!completed.has(c.code)) return;
      if (c.category === "전기") basicDone += 3;
      else if (c.category === "전필") reqDone += 3;
      else if (c.category === "전선") elecDone += 3;
    });

    const totalDone = basicDone + reqDone + elecDone;

    return {
      basicDone,
      reqDone,
      elecDone,
      totalDone,
    };
  };

  const selectedTracks = selectedTrackIds.map((id) =>
    TRACKS.find((t) => t.id === id)
  );

  const summaries = [0, 1].map((idx) => {
    const track = selectedTracks[idx];
    if (!track) {
      return {
        basicDone: 0,
        reqDone: 0,
        elecDone: 0,
        totalDone: 0,
      };
    }
    return calcSummary(track.id);
  });

  const combinedTotalDone = summaries[0].totalDone + summaries[1].totalDone;

  return (
    <main className="page-main">
      <div className="card-large dashboard-card-large">
        <button
          className="back-button"
          onClick={() => navigate("/select")}
        >
          ← 로드맵 / 시뮬레이션 선택으로 돌아가기
        </button>

        <section className="dashboard-header">
          <div className="dashboard-school">{selectedSchool.name}</div>
          <div className="dashboard-title">전공과목 시뮬레이션</div>
          <div className="dashboard-sub">
            원하는 트랙을 선택하고 수강한 전공과목을 선택하면
            전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
          </div>
        </section>

        {/* 트랙 선택 */}
        <section className="track-section">
          <div className="track-title">원하는 트랙 선택</div>
          <div className="track-grid">
            {TRACKS.map((track) => {
              const isActive = selectedTrackIds.includes(track.id);
              return (
                <div
                  key={track.id}
                  className={`track-card ${isActive ? "track-card-active" : ""}`}
                  onClick={() => toggleTrack(track.id)}
                >
                  <div className="track-name">{track.name}</div>
                  <div className="track-desc">{track.description}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 전공 이수 현황 요약 */}
        <section className="summary-section">
          <div className="summary-title">전공 이수 현황 요약</div>
          <div className="summary-table-wrapper">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>이수구분</th>
                  <th>전공기초</th>
                  <th>전공지정 (전공필수)</th>
                  <th>전공소계 (기초,지정,선택)</th>
                  <th>총합계</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1].map((idx) => {
                  const track = selectedTracks[idx];
                  const label = idx === 0 ? "제1트랙" : "제2트랙";
                  const summary = summaries[idx];

                  return (
                    <tr key={idx}>
                      <td>
                        {label}
                        <br />
                        <span className="summary-track-name">
                          {track ? track.name : "-"}
                        </span>
                      </td>
                      <td>{summary.basicDone} / ({BASIC_MAX})</td>
                      <td>{summary.reqDone} / ({REQ_MAX})</td>
                      <td>{summary.totalDone} / ({ELEC_MAX})</td>
                      {idx === 0 && (
                        <td rowSpan={2} className="summary-total">
                          {combinedTotalDone} / ({TOTAL_MAX})
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 아직 수강X / 수강O */}
        <section className="dashboard-bottom">
          {/* 아직 수강하지 않은 과목 */}
          <div className="dashboard-card">
            <div className="dashboard-card-title">아직 수강하지 않은 과목</div>
            <div className="dashboard-card-sub">
              수강하지 않은 과목 목록입니다. 실제로 들은 전공과목은
              클릭해서 오른쪽 ‘수강한 전공과목’ 영역으로 옮겨 보세요.
            </div>

            {selectedTracks.length === 0 && (
              <div className="dashboard-empty">
                먼저 위에서 트랙을 선택해 주세요.
              </div>
            )}

            {selectedTracks.length > 0 && (
              <div className="not-taken-wrapper">
                {selectedTracks.map((track) => {
                  const allCourses = COURSES_BY_TRACK[track.id] || [];
                  const completedCodes = completedByTrack[track.id] || [];
                  const notTaken = allCourses.filter(
                    (c) => !completedCodes.includes(c.code)
                  );

                  return (
                    <div key={track.id} className="course-block">
                      <div className="course-track-title">{track.name}</div>
                      {notTaken.length === 0 ? (
                        <div className="dashboard-empty">
                          아직 수강하지 않은 과목이 없습니다.
                        </div>
                      ) : (
                        notTaken.map((c) => (
                          <div
                            key={c.code}
                            className="course-row"
                            onClick={() => toggleCompleted(track.id, c.code)}
                          >
                            <span className="course-name">{c.name}</span>
                            <span className="course-meta">
                              {c.year}학년 · {c.category} · {c.code}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 수강한 전공과목 */}
          <div className="dashboard-card">
            <div className="dashboard-card-title">수강한 전공과목</div>
            <div className="dashboard-card-sub">
              현재 수강한 전공과목 목록입니다. 카드를 클릭하면
              ‘수강하지 않은 과목’으로 돌려놓을 수 있습니다.
            </div>

            {selectedTracks.length === 0 && (
              <div className="dashboard-empty">
                먼저 위에서 트랙을 선택해 주세요.
              </div>
            )}

            {selectedTracks.map((track) => {
              const completedCodes = completedByTrack[track.id] || [];
              const completedCourses = (COURSES_BY_TRACK[track.id] || []).filter(
                (c) => completedCodes.includes(c.code)
              );

              return (
                <div key={track.id} className="course-block">
                  <div className="course-track-title">{track.name}</div>
                  {completedCourses.length === 0 ? (
                    <div className="dashboard-empty">
                      선택된 전공과목이 없습니다.
                    </div>
                  ) : (
                    <div className="taken-wrapper">
                      {completedCourses.map((c) => {
                        let colorClass = "tag-year-etc";
                        if (c.year === 1) colorClass = "tag-year-1";
                        else if (c.year === 2) colorClass = "tag-year-2";
                        else if (c.year === 3) colorClass = "tag-year-3";
                        else if (c.year === 4) colorClass = "tag-year-4";

                        return (
                          <div
                            key={c.code}
                            className={`taken-course ${colorClass}`}
                            onClick={() =>
                              toggleCompleted(track.id, c.code)
                            }
                          >
                            <div className="taken-top">
                              <span className="course-name">{c.name}</span>
                              <span className="course-meta">
                                {c.year}학년 · {c.category} · {c.code}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
