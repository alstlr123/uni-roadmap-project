import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// 한글 초성 유틸
const INITIALS = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"
];

function getKoreanInitials(str) {
  let result = "";
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const index = code - 0xac00;
      const initialIndex = Math.floor(index / 588);
      result += INITIALS[initialIndex] || "";
    } else if (/[ㄱ-ㅎ]/.test(ch)) {
      result += ch;
    }
  }
  return result;
}

// 검색 대상 학교 (지금은 한성대만)
const SCHOOLS = [
  {
    id: "hansung",
    name: "한성대학교",
    department: "컴퓨터공학부",
  },
];

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const navigate = useNavigate();

  const getSuggestions = () => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const normalizedQuery = trimmed.replace(/\s+/g, "");
    const queryInitials = getKoreanInitials(normalizedQuery);

    return SCHOOLS.filter((school) => {
      const name = school.name;
      const normalizedName = name.replace(/\s+/g, "");

      if (normalizedName.includes(normalizedQuery)) return true;

      const nameInitials = getKoreanInitials(normalizedName);
      if (queryInitials && nameInitials.startsWith(queryInitials)) return true;

      return false;
    });
  };

  const suggestions = getSuggestions();

  const handleSelectSchool = (school) => {
    setQuery(school.name);
    setHighlightIndex(-1);
    navigate("/select");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex + 1 >= suggestions.length ? 0 : highlightIndex + 1;
      setHighlightIndex(nextIndex);
      setQuery(suggestions[nextIndex].name);
    } else if (e.key === "ArrowUp") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex <= 0 ? suggestions.length - 1 : highlightIndex - 1;
      setHighlightIndex(nextIndex);
      setQuery(suggestions[nextIndex].name);
    } else if (e.key === "Enter") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        handleSelectSchool(suggestions[highlightIndex]);
      } else {
        handleSelectSchool(suggestions[0]);
      }
    }
  };

  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ===== 상단 헤더 영역 (스크린샷 느낌) ===== */}
      <section
        style={{
          marginTop: 80,
          marginBottom: 40,
          width: "100%",
          maxWidth: 720,
        }}
      >
        {/* 아이콘 + 제목 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "999px",
              backgroundColor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
              fontSize: 22,
            }}
          >
            🎓
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            어떤 학교 로드맵을 확인해 볼까요?
          </h1>
        </div>

        {/* 부제목 */}
        <p
          style={{
            fontSize: 14,
            color: "#6b7280",
            marginLeft: 50, // 아이콘 밑으로 정렬되는 느낌
            marginBottom: 24,
          }}
        >
          학교 이름을 검색하고 커리큘럼 로드맵과 전공과목 시뮬레이션을 한눈에 확인해 보세요.
        </p>

        {/* 검색창 + 안내 문구 + 자동완성 */}
        <div style={{ maxWidth: 640 }}>
          <div className="search-box" style={{ marginBottom: 8 }}>
            <div className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="학교 검색 (예: 한성대, 한국대)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightIndex(-1);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* 검색창 아래 안내 문구 */}
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#9ca3af",
              marginBottom: suggestions.length > 0 ? 4 : 0,
            }}
          >
            학교 이름을 입력해 주세요.
          </div>

          {/* 자동완성 리스트 */}
          {suggestions.length > 0 && (
            <div className="autocomplete" style={{ marginTop: 4 }}>
              {suggestions.map((school, idx) => (
                <div
                  key={school.id}
                  className="autocomplete-item"
                  style={{
                    backgroundColor:
                      idx === highlightIndex ? "#e5f0ff" : "white",
                  }}
                  onMouseDown={() => handleSelectSchool(school)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                >
                  {school.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 핵심 기능 3개 카드 (로드맵 / 시뮬레이션 / 매핑) ===== */}
      <h2
        className="section-title"
        style={{
          fontSize: 24,
          marginBottom: 0,
          textAlign: "center",
        }}
      >
        핵심 기능
      </h2>

      <section style={{ width: "100%", maxWidth: 1100, marginBottom: 80 }}>
        <div
          className="features-card"
          style={{
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 40,
          }}
        >
          {/* 1. 인터랙티브 로드맵 */}
          <div className="feature">
            <div
              className="feature-icon"
              style={{ fontSize: 36, marginBottom: 16 }}
            >
              🗺️
            </div>
            <div
              className="feature-title"
              style={{ fontSize: 18, marginBottom: 10 }}
            >
              인터랙티브 로드맵
            </div>
            <div
              className="feature-desc"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              과목 간 연결 관계를 시각적으로 확인하고,
              <br />
              어떤 순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </div>
          </div>

          {/* 2. 전공과목 시뮬레이션 */}
          <div className="feature">
            <div
              className="feature-icon"
              style={{ fontSize: 36, marginBottom: 16 }}
            >
              📊
            </div>
            <div
              className="feature-title"
              style={{ fontSize: 18, marginBottom: 10 }}
            >
              전공과목 시뮬레이션
            </div>
            <div
              className="feature-desc"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              수강한 전공과목을 선택해
              <br />
              전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
            </div>
          </div>

          {/* 3. 리소스 매핑 */}
          <div className="feature">
            <div
              className="feature-icon"
              style={{ fontSize: 36, marginBottom: 16 }}
            >
              🧩
            </div>
            <div
              className="feature-title"
              style={{ fontSize: 18, marginBottom: 10 }}
            >
              리소스 매핑
            </div>
            <div
              className="feature-desc"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              각 과목과 연계된 강의 자료와 참고 링크를 트랙별로 정리해,
              <br />
              필요한 학습 리소스를 빠르게 찾아볼 수 있습니다.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
