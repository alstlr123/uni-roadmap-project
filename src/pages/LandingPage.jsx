import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ===== 한글 초성 유틸 =====
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

// ===== 학교 데이터 =====
const SCHOOLS = [
  {
    id: "hansung",
    name: "한성대학교",
    department: "컴퓨터공학부",
  },
   { id: "korea",  name: "한국대학교", department: "컴퓨터공학부" },
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

      if (normalizedName.includes(normalizedQuery)) return true;

      const nameInitials = getKoreanInitials(normalizedName);
      if (queryInitials && nameInitials.startsWith(queryInitials)) return true;


      return false;
    });
  };

  const suggestions = getSuggestions();

  const handleSelectSchool = (school) => {
    onSelectSchool(school);
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
    } else if (e.key === "ArrowUp") {
      if (suggestions.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex <= 0 ? suggestions.length - 1 : highlightIndex - 1;
      setHighlightIndex(nextIndex);
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
    <main className="page-main">
      {/* 상단 히어로 영역 */}
      <section className="hero-section">
        <h1 className="hero-title">당신의 학교를 검색하세요</h1>
        <p className="hero-subtitle">
          학교별 맞춤형 커리큘럼 로드맵과 전공과목 시뮬레이션을 제공합니다.
        </p>

        <div className="search-wrapper">
          <div className="search-box">
            <div className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="학교 이름을 검색하세요..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightIndex(-1);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
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

      {/* 핵심 기능 */}
      <h2 className="section-title">핵심 기능</h2>

      <section className="features-section">
        <div className="features-card">
          {/* 1. 인터랙티브 로드맵 */}
          <div className="feature">
            <div className="feature-icon">🗺️</div>
            <div className="feature-title">인터랙티브 로드맵</div>
            <div className="feature-desc">
                   과목 간 연결 관계를 시각적으로 확인하고 어떤 
                   <br/> 
                    순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </div>
          </div>

          {/* 2. 전공과목 시뮬레이션 */}
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-title">전공과목 시뮬레이션</div>
            <div className="feature-desc">
               수강한 전공과목을 선택해 전공 이수 현황과
               <br/>남은 과목을 한눈에 확인할 수 있습니다.
            </div>
          </div>

          {/* 3. 리소스 매핑 */}
          <div className="feature">
            <div className="feature-icon">🔗</div>
            <div className="feature-title">리소스 매핑</div>
            <div className="feature-desc">
               각 과목과 관련된 채용공고·추천 강의·공식 문서를
        
                한 번에 모아서 확인할 수 있도록 연결합니다.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
