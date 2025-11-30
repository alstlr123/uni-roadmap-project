import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, ArrowRight } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
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

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const { setSelectedUniv } = useApp();
  const navigate = useNavigate();

  // 검색어에 맞는 학교 필터링 (초성 + 일반)
  const trimmed = searchTerm.trim();
  const normalizedQuery = trimmed.replace(/\s+/g, "");
  const queryInitials = getKoreanInitials(normalizedQuery);

  const filteredUnivs = normalizedQuery
    ? UNIVERSITIES.filter((univ) => {
        const name = univ.name;
        const normalizedName = name.replace(/\s+/g, "");

        if (normalizedName.includes(normalizedQuery)) return true;

        const nameInitials = getKoreanInitials(normalizedName);
        return queryInitials && nameInitials.startsWith(queryInitials);
      })
    : [];

  const handleSelect = (univ) => {
    setSelectedUniv(univ);
    setSearchTerm(univ.name);
    setHighlightIndex(-1);
    navigate("/select");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (filteredUnivs.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex + 1 >= filteredUnivs.length ? 0 : highlightIndex + 1;
      setHighlightIndex(nextIndex);
      setSearchTerm(filteredUnivs[nextIndex].name);
    } else if (e.key === "ArrowUp") {
      if (filteredUnivs.length === 0) return;
      e.preventDefault();
      const nextIndex =
        highlightIndex <= 0 ? filteredUnivs.length - 1 : highlightIndex - 1;
      setHighlightIndex(nextIndex);
      setSearchTerm(filteredUnivs[nextIndex].name);
    } else if (e.key === "Enter") {
      if (filteredUnivs.length === 0) return;
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filteredUnivs.length) {
        handleSelect(filteredUnivs[highlightIndex]);
      } else {
        handleSelect(filteredUnivs[0]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 pt-16">
      {/* 상단 헤더 */}
      <section className="w-full max-w-3xl mb-10">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <GraduationCap className="text-blue-600" size={22} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            어떤 학교 로드맵을 확인해 볼까요?
          </h1>
        </div>
        <p className="text-sm md:text-base text-gray-500 ml-12 mb-5">
          학교 이름을 검색하고 커리큘럼 로드맵과 전공과목 시뮬레이션을 한눈에 확인해 보세요.
        </p>

        {/* 검색 영역 */}
        <div className="w-full max-w-2xl ml-12">
          <div className="relative mb-2">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="학교 검색 (예: 한성대, 한국대)"
              className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightIndex(-1);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <p className="text-xs text-center text-gray-400">
            학교 이름을 입력해 주세요.
          </p>

          {/* 자동완성 리스트 */}
          {filteredUnivs.length > 0 && (
            <div className="mt-3 space-y-2">
              {filteredUnivs.map((univ, idx) => (
                <button
                  key={univ.id}
                  onClick={() => handleSelect(univ)}
                  className={`w-full flex items-center justify-between p-3 md:p-4 bg-white border rounded-xl shadow-sm transition group ${
                    idx === highlightIndex ? "border-blue-500 bg-blue-50" : ""
                  }`}
                >
                  <span className="font-semibold text-base text-gray-700 group-hover:text-blue-600">
                    {univ.name}
                  </span>
                  <ArrowRight className="text-gray-300 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 핵심 기능 3개 카드 */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        핵심 기능
      </h2>

      <section className="w-full max-w-5xl mb-16">
        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl px-6 py-8 grid md:grid-cols-3 gap-8">
          {/* 로드맵 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <h3 className="font-bold mb-2 text-base md:text-lg">
              인터랙티브 로드맵
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              과목 간 연결 관계를 시각적으로 확인하고,
              <br />
              어떤 순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </p>
          </div>

          {/* 전공과목 시뮬레이션 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              📊
            </div>
            <h3 className="font-bold mb-2 text-base md:text-lg">
              전공과목 시뮬레이션
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              수강한 전공과목을 선택해
              <br />
              전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
            </p>
          </div>

          {/* 리소스 매핑 */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              🧩
            </div>
            <h3 className="font-bold mb-2 text-base md:text-lg">
              리소스 매핑
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              각 과목과 연계된 강의 자료와 참고 링크를 정리해
              <br />
              필요한 학습 리소스를 빠르게 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
