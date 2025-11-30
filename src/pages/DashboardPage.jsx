// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

// ---------------------- 트랙 정보 ----------------------
// === 트랙 / 과목 데이터 (App.js에서 쓰던 것 그대로 가져옴) ===
const BASIC_MAX = 3;
const REQ_MAX = 15;
const ELEC_MAX = 39;
const TOTAL_MAX = 78;

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

const DashboardPage = () => {
  const navigate = useNavigate();
  const { selectedUniv } = useApp();
  const [selectedTrackIds, setSelectedTrackIds] = useState([]);
  const [completedByTrack, setCompletedByTrack] = useState(INITIAL_COMPLETED);

  // 학교 선택 안 하고 바로 들어온 경우
  if (!selectedUniv) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <p className="mb-4 text-gray-700">학교가 선택되지 않았습니다.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const toggleTrack = (trackId) => {
    setSelectedTrackIds((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      }
      if (prev.length >= 2) {
        window.alert("트랙은 최대 2개까지만 선택할 수 있습니다. 먼저 다른 트랙을 해제해주세요.");
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

    return { basicDone, reqDone, elecDone, totalDone };
  };

  const selectedTracks = selectedTrackIds.map((id) =>
    TRACKS.find((t) => t.id === id)
  );

  const summaries = [0, 1].map((idx) => {
    const track = selectedTracks[idx];
    if (!track) {
      return { basicDone: 0, reqDone: 0, elecDone: 0, totalDone: 0 };
    }
    return calcSummary(track.id);
  });

  const combinedTotalDone = summaries[0].totalDone + summaries[1].totalDone;

  return (
    <main className="dashboard-main">
      <div className="dashboard-container">
        <button
          className="back-button"
          onClick={() => navigate("/select")}
        >
          ← 로드맵 / 전공과목 시뮬레이션 선택으로 돌아가기
        </button>

        {/* 헤더 */}
        <section
          className="dashboard-header"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <div className="dashboard-school">{selectedUniv.name}</div>
          <div className="dashboard-title">전공과목 시뮬레이션</div>
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4,
            }}
          >
            원하는 트랙을 선택하고 수강한 전공과목을 선택하면
            전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
          </div>
        </section>

        {/* 트랙 선택 */}
        <section style={{ width: "100%", marginTop: 16 }}>
          <div
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            원하는 트랙 선택
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {TRACKS.map((track) => {
              const isActive = selectedTrackIds.includes(track.id);
              return (
                <div
                  key={track.id}
                  onClick={() => toggleTrack(track.id)}
                  style={{
                    borderRadius: 20,
                    border: isActive
                      ? "2px solid #22c55e"
                      : "1px solid #e5e7eb",
                    padding: "14px 18px",
                    background: "#ffffff",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isActive
                      ? "0 10px 25px rgba(34,197,94,0.25)"
                      : "0 8px 20px rgba(15,23,42,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {track.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    {track.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 이수 현황 표 */}
        <section style={{ width: "100%", marginTop: 24 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 10,
              textAlign: "left",
            }}
          >
            전공 이수 현황 요약
          </div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
                  <th style={{ padding: "8px 6px", minWidth: 80 }}>이수구분</th>
                  <th style={{ padding: "8px 6px", minWidth: 80 }}>전공기초</th>
                  <th style={{ padding: "8px 6px", minWidth: 110 }}>
                    전공지정 (전공필수)
                  </th>
                  <th style={{ padding: "8px 6px", minWidth: 110 }}>
                    전공소계 (기초,지정,선택)
                  </th>
                  <th style={{ padding: "8px 6px", minWidth: 80 }}>총합계</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1].map((idx) => {
                  const track = selectedTracks[idx];
                  const label = idx === 0 ? "제1트랙" : "제2트랙";
                  const summary = summaries[idx];
                  const rowBg = idx === 0 ? "#ffffff" : "#f9fafb";

                  return (
                    <tr key={idx} style={{ textAlign: "center" }}>
                      <td
                        style={{
                          padding: "8px 6px",
                          background: rowBg,
                          borderTop: "1px solid #e5e7eb",
                          fontWeight: 600,
                        }}
                      >
                        {label}
                        <br />
                        <span
                          style={{ fontSize: 11, color: "#6b7280" }}
                        >
                          {track ? track.name : "-"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          background: rowBg,
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        {summary.basicDone} / ({BASIC_MAX})
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          background: rowBg,
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        {summary.reqDone} / ({REQ_MAX})
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          background: rowBg,
                          borderTop: "1px solid #e5e7eb",
                        }}
                      >
                        {summary.totalDone} / ({ELEC_MAX})
                      </td>
                      {idx === 0 && (
                        <td
                          rowSpan={2}
                          style={{
                            padding: "8px 6px",
                            background: "#ffffff",
                            color: "#111827",
                            borderTop: "1px solid #e5e7eb",
                            fontWeight: 700,
                          }}
                        >
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

        {/* 좌우 2열: 아직 수강 X / 수강 O */}
        <section
          className="dashboard-grid"
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {/* 아직 수강하지 않은 과목 */}
          <div className="dashboard-card">
            <div className="dashboard-card-title">아직 수강하지 않은 과목</div>
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              수강하지 않은 과목 목록입니다. 실제로 들은 전공과목은
              클릭해서 오른쪽 ‘수강한 전공과목’ 영역으로 옮겨 보세요.
            </div>

            {selectedTracks.length === 0 && (
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  textAlign: "left",
                }}
              >
                먼저 위에서 트랙을 선택해 주세요.
              </div>
            )}

            {selectedTracks.length > 0 && (
              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  padding: "16px 16px",
                }}
              >
                {selectedTracks.map((track) => {
                  const allCourses = COURSES_BY_TRACK[track.id] || [];
                  const completedCodes = completedByTrack[track.id] || [];
                  const notTaken = allCourses.filter(
                    (c) => !completedCodes.includes(c.code)
                  );

                  return (
                    <div
                      key={track.id}
                      style={{
                        marginBottom: 16,
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          margin: "4px 0 10px",
                          textAlign: "center",
                        }}
                      >
                        {track.name}
                      </div>
                      {notTaken.length === 0 ? (
                        <div
                          style={{
                            fontSize: 13,
                            color: "#9ca3af",
                            marginBottom: 4,
                            textAlign: "center",
                          }}
                        >
                          아직 수강하지 않은 과목이 없습니다.
                        </div>
                      ) : (
                        notTaken.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => toggleCompleted(track.id, c.code)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "6px 4px",
                              cursor: "pointer",
                              fontSize: 14,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 600,
                                  }}
                                >
                                  {c.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: "#6b7280",
                                    marginLeft: 8,
                                  }}
                                >
                                  {c.year}학년 · {c.category} · {c.code}
                                </span>
                              </div>
                            </div>
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
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                textAlign: "left",
                marginBottom: 10,
              }}
            >
              현재 수강한 전공과목 목록입니다. 카드를 클릭하면
              ‘수강하지 않은 과목’으로 돌려놓을 수 있습니다.
            </div>

            {selectedTracks.length === 0 && (
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  textAlign: "left",
                }}
              >
                먼저 위에서 트랙을 선택해 주세요.
              </div>
            )}

            {selectedTracks.map((track) => {
              const completedCodes = completedByTrack[track.id] || [];
              const completedCourses = (COURSES_BY_TRACK[track.id] || []).filter(
                (c) => completedCodes.includes(c.code)
              );

              return (
                <div
                  key={track.id}
                  style={{
                    marginBottom: 14,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {track.name}
                  </div>
                  {completedCourses.length === 0 ? (
                    <div
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                        marginBottom: 4,
                      }}
                    >
                      선택된 전공과목이 없습니다.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {completedCourses.map((c) => {
                        let bg = "#eff6ff";
                        let border = "#bfdbfe";
                        if (c.year === 1) {
                          bg = "#fee2e2";
                          border = "#fecaca";
                        } else if (c.year === 2) {
                          bg = "#fef3c7";
                          border = "#fde68a";
                        } else if (c.year === 3) {
                          bg = "#dcfce7";
                          border = "#bbf7d0";
                        } else if (c.year === 4) {
                          bg = "#e0f2fe";
                          border = "#bfdbfe";
                        }

                        return (
                          <div
                            key={c.code}
                            onClick={() => toggleCompleted(track.id, c.code)}
                            style={{
                              borderRadius: 12,
                              border: `1px solid ${border}`,
                              background: bg,
                              padding: "8px 10px",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 2,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                }}
                              >
                                {c.name}
                              </span>
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#6b7280",
                                }}
                              >
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
};

export default DashboardPage;

