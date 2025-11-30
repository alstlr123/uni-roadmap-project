import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, ArrowRight } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData'; // 데이터 가져오기
import { useApp } from '../context/AppContext';   // ★ 전역 상태 가져오기

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedUniv } = useApp(); // Context에서 '저장하는 함수' 꺼내기
  const navigate = useNavigate();

  // 검색어에 맞는 학교만 필터링
  const filteredUnivs = UNIVERSITIES.filter(univ => 
    univ.name.includes(searchTerm)
  );

  const handleSelect = (univ) => {
    setSelectedUniv(univ); // 1. 전역 상태에 선택한 학교 저장
    navigate('/select');   // 2. 선택 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* 로고 영역 */}
      <div className="bg-blue-100 p-4 rounded-full mb-6">
        <GraduationCap size={48} className="text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">어떤 학교 로드맵을 볼까요?</h1>
      <p className="text-gray-500 mb-8">학교 이름을 검색해서 커리큘럼을 확인하세요.</p>

      {/* 검색창 영역 */}
      <div className="w-full max-w-md relative mb-6">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="학교 검색 (예: 한성대, 한국대)"
          className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 검색 결과 리스트 */}
      <div className="w-full max-w-md space-y-3">
        {filteredUnivs.length > 0 ? (
          filteredUnivs.map((univ) => (
            <button
              key={univ.id}
              onClick={() => handleSelect(univ)}
              className="w-full flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-500 hover:shadow-md transition group"
            >
              <span className="font-bold text-lg text-gray-700 group-hover:text-blue-600">
                {univ.name}
              </span>
              <ArrowRight className="text-gray-300 group-hover:text-blue-500" />
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-4">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;