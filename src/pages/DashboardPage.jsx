// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

// ---------------------- 트랙 정보 ----------------------
const TRACKS = [
  { id: "mobile", name: "모바일 소프트웨어" },
  { id: "bigdata", name: "빅데이터" },
  { id: "xr", name: "디지털콘텐츠·가상현실" },
  { id: "web", name: "웹공학" },
];

// ---------------------- 학점 기준 ----------------------
const BASIC_MAX = 3;   // 전공기초
const REQ_MAX = 15;    // 전필
const ELEC_MAX = 39;   // 소계
const TOTAL_MAX = 78;  // 전체 합계

// ---------------------- 트랙별 과목 ----------------------
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

  // (다른 트랙들은 이전에 주신 최신 코드 그대로 유지)
  //  ... bigdata, xr, web
};

// ---------------------- 초기 상태 ----------------------
const INITIAL_COMPLETED = {
  mobile: [],
  bigdata: [],
  xr: [],
  web: [],
};

// ---------------------- 학년 색깔 ----------------------
const yearColorClasses = {
  1: "bg-red-100 border-red-200",
  2: "bg-yellow-100 border-yellow-200",
  3: "bg-green-100 border-green-200",
  4: "bg-blue-100 border-blue-200",
};

// =====================================================
//                    Dashboard Page
// =====================================================
const DashboardPage = () => {
  const navigate = useNavigate();
  const { selectedUniv } = useApp();

  const [selectedTrackIds, setSelectedTrackIds] = useState([]);
  const [completedByTrack, setCompletedByTrack] = useState(INITIAL_COMPLETED);

  if (!selectedUniv) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <p className="text-gray-500 mb-3">학교 정보가 선택되지 않았습니다.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const selectedTracks = selectedTrackIds
    .map((id) => TRACKS.find((t) => t.id === id))
    .filter(Boolean);

  // ---------------------- 트랙 선택 ----------------------
  const toggleTrack = (trackId) => {
    setSelectedTrackIds((prev) => {
      if (prev.includes(trackId)) return prev.filter((id) => id !== trackId);
      if (prev.length >= 2) {
        alert("트랙은 최대 2개까지만 선택할 수 있습니다.");
        return prev;
      }
      return [...prev, trackId];
    });
  };

  // ---------------------- 수강 / 취소 ----------------------
  const toggleCompleted = (trackId, code) => {
    setCompletedByTrack((prev) => {
      const current = prev[trackId];
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];

      return {
        ...prev,
        [trackId]: next,
      };
    });
  };

  // ---------------------- 학점 계산 ----------------------
  const calcSummary = (trackId) => {
    const courses = COURSES_BY_TRACK[trackId] || [];
    const completed = new Set(completedByTrack[trackId] || []);

    let basic = 0;
    let req = 0;
    let elec = 0;

    for (const c of courses) {
      if (!completed.has(c.code)) continue;
      if (c.category === "전기") basic += 3;
      else if (c.category === "전필") req += 3;
      else if (c.category === "전선") elec += 3;
    }

    return {
      basic,
      req,
      elec: basic + req + elec, // 소계는 두 개 포함
    };
  };

  const summaries = selectedTracks.map((track) =>
    track ? calcSummary(track.id) : { basic: 0, req: 0, elec: 0 }
  );

  const totalCombined = summaries.reduce((sum, s) => sum + s.elec, 0);

  // =====================================================
  //                       UI 시작
  // =====================================================
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500 hover:text-gray-800"
      >
        ← 이전 페이지로
      </button>

      {/* 헤더 */}
      <div className="text-center mb-8">
        <p className="text-sm text-blue-600 font-semibold mb-1">
          {selectedUniv.name}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          전공과목 시뮬레이션
        </h1>
        <p className="text-sm text-gray-500">
          트랙을 선택하고 수강한 전공과목을 선택하면 전공 이수 학점을
          한눈에 확인할 수 있습니다.
        </p>
      </div>

      {/* ---------------------- 트랙 선택 ---------------------- */}
      <section className="mb-6">
        <h2 className="text-center text-base font-semibold mb-3">
          원하는 트랙 선택
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {TRACKS.map((track) => {
            const active = selectedTrackIds.includes(track.id);

            return (
              <button
                key={track.id}
                onClick={() => toggleTrack(track.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition shadow-sm ${
                  active
                    ? "border-green-500 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-bold">{track.name}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------------- 전공 이수 현황 ---------------------- */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-2">
          전공 이수 현황 요약
        </h2>

        <div className="rounded-2xl border bg-gray-50 overflow-hidden">
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="py-2 px-2">이수구분</th>
                <th className="py-2 px-2">전공기초</th>
                <th className="py-2 px-2">전공지정</th>
                <th className="py-2 px-2">
                  전공소계 <br className="hidden md:block" /> (기초·지정·선택)
                </th>
                <th className="py-2 px-2">총합계</th>
              </tr>
            </thead>

            <tbody>
              {[0, 1].map((i) => {
                const track = selectedTracks[i];
                const label = i === 0 ? "제1트랙" : "제2트랙";
                const s = summaries[i];

                return (
                  <tr key={i} className="text-center bg-white border-t">
                    <td className="py-2 font-semibold">
                      {label}
                      <br />
                      <span className="text-[11px] text-gray-500">
                        {track ? track.name : "-"}
                      </span>
                    </td>

                    <td className="py-2">{s.basic} / ({BASIC_MAX})</td>
                    <td className="py-2">{s.req} / ({REQ_MAX})</td>
                    <td className="py-2">{s.elec} / ({ELEC_MAX})</td>

                    {i === 0 && (
                      <td
                        rowSpan={2}
                        className="py-2 font-bold bg-white text-gray-900"
                      >
                        {totalCombined} / ({TOTAL_MAX})
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------------- 2열 과목 선택 ---------------------- */}
      <section className="grid md:grid-cols-2 gap-4">
        {/* 왼쪽 : 수강 X */}
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="text-sm font-semibold mb-1">아직 수강하지 않은 과목</h2>
          <p className="text-[11px] text-gray-500 mb-3">
            실제로 들은 과목은 클릭하여 오른쪽 '수강한 전공과목'으로 옮겨주세요.
          </p>

          {selectedTracks.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              먼저 위에서 트랙을 선택해주세요.
            </p>
          )}

          {selectedTracks.length > 0 &&
            selectedTracks.map((track) => {
              const all = COURSES_BY_TRACK[track.id];
              const done = completedByTrack[track.id];
              const left = all.filter((c) => !done.includes(c.code));

              return (
                <div
                  key={track.id}
                  className="border rounded-xl bg-gray-50 p-3 mb-3"
                >
                  <div className="text-sm font-bold text-center mb-2">
                    {track.name}
                  </div>

                  {left.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center">
                      남은 과목이 없습니다.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {left.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => toggleCompleted(track.id, c.code)}
                          className="w-full text-left px-2 py-1 rounded hover:bg-white hover:shadow-sm transition"
                        >
                          <div className="font-semibold text-[13px]">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {c.year}학년 · {c.category} · {c.code}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* 오른쪽 : 수강 O */}
        <div className="rounded-2xl border bg-white p-4">
          <h2 className="text-sm font-semibold mb-1">수강한 전공과목</h2>
          <p className="text-[11px] text-gray-500 mb-3">
            클릭하면 왼쪽 목록으로 다시 이동합니다.
          </p>

          {selectedTracks.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              먼저 위에서 트랙을 선택해주세요.
            </p>
          )}

          {selectedTracks.map((track) => {
            const done = completedByTrack[track.id];
            const doneList = (COURSES_BY_TRACK[track.id] || []).filter((c) =>
              done.includes(c.code)
            );

            return (
              <div key={track.id} className="mb-3">
                <div className="text-xs font-semibold mb-1">{track.name}</div>

                {doneList.length === 0 ? (
                  <p className="text-[11px] text-gray-400">
                    선택된 전공과목이 없습니다.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {doneList.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => toggleCompleted(track.id, c.code)}
                        className={`w-full text-left px-3 py-2 rounded-xl border ${
                          yearColorClasses[c.year]
                        } hover:shadow transition`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[13px] font-semibold">
                            {c.name}
                          </span>
                          <span className="text-[11px] text-gray-600">
                            {c.year}학년 · {c.category} · {c.code}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
