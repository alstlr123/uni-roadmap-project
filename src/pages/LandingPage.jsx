import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const SCHOOLS = [
  { id: "hansung", name: "한성대학교", department: "컴퓨터공학부" },
  { id: "korea",   name: "한국대학교", department: "컴퓨터공학부" },
];

function LandingPage({ onSelectSchool }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const getSuggestions = () => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const normalizedQuery = trimmed.replace(/\s+/g, "");
    const queryInitials = getKoreanInitials(normalizedQuery);

    return SCHOOLS.filter((school) => {
      const name = school.name;
      const normalizedName = name.replace(/\s+/g, "");

      // 일반 문자열 포함 검색
      if (normalizedName.includes(normalizedQuery)) return true;

      // 초성 검색 (앞에서부터 일치)
      const nameInitials = getKoreanInitials(normalizedName);
      if (queryInitials && nameInitials.startsWith(queryInitials)) return true;

      return false;
    });
  };

  const suggestions = getSuggestions();

  const handleSelectSchool = (school) => {
    setQuery(school.name);
    setHighlightIndex(-1);
    if (onSelectSchool) {
      onSelectSchool(school);
    }
    navigate("/select");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex + 1 >= suggestions.length ? 0 : highlightIndex + 1;
      setHighlightIndex(nextIndex);
    } else if (e.key === "ArrowUp") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex <= 0 ? suggestions.length - 1 : highlightIndex - 1;
      setHighlightIndex(nextIndex);
    } else if (e.key === "Enter") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const target =
        highlightIndex >= 0 && highlightIndex < suggestions.length
          ? suggestions[highlightIndex]
          : suggestions[0];
      handleSelectSchool(target);
    }
  };

  return (
    <main
      className="page-main"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <section
        style={{
          marginTop: 80,
          marginBottom: 80,
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          className="hero-title"
          style={{ fontSize: 40, marginBottom: 10 }}
        >
          당신의 학교를 검색해 보세요
        </h1>
        <p
          className="hero-subtitle"
          style={{ fontSize: 16, marginBottom: 30 }}
        >
          학교 이름을 검색하면 커리큘럼 로드맵과 전공과목 시뮬레이션을
          한눈에 확인하실 수 있습니다.
        </p>

        <div
          className="search-wrapper"
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          <div className="search-box">
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

          {suggestions.length === 0 && query.trim() !== "" && (
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              학교 이름을 입력해 주세요.
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="autocomplete">
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

      <h2
        className="section-title"
        style={{
          fontSize: 24,
          marginBottom: 30,
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
              style={{ fontSize: 13, lineHeight: 1.6 }}
            >
              과목 간 연결 관계를 시각적으로 확인하고, 어떤
              <br/>
              순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </div>
          </div>

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
              style={{ fontSize: 13, lineHeight: 1.6 }}
            >
              수강한 전공과목을 선택해
            
              전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
            </div>
          </div>

          <div className="feature">
            <div
              className="feature-icon"
              style={{ fontSize: 36, marginBottom: 16 }}
            >
              🔗
            </div>
            <div
              className="feature-title"
              style={{ fontSize: 18, marginBottom: 10 }}
            >
              리소스 매핑
            </div>
            <div
              className="feature-desc"
              style={{ fontSize: 13, lineHeight: 1.6 }}
            >
              각 과목과 관련된 채용공고·추천 강의·공식 문서를
              
              한 번에 모아서 확인할 수 있도록 연결합니다.
            </div>
          </div>
        </div>
      </section>

      <div className="hidden bg-sky-500 text-white px-4 py-2 rounded-lg">
        Tailwind utility used
      </div>
    </main>
  );
}

export default LandingPage;