import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // ★ 전역 상태 가져오기
import { Map, BarChart2, ArrowLeft } from 'lucide-react';

const SelectionPage = () => {
  const navigate = useNavigate();
  const { selectedUniv } = useApp();

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

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl px-8 md:px-12 py-10">
        {/* 상단: 뒤로가기 */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          학교 다시 검색하기
        </button>

        {/* 학교 이름 / 학과 */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {selectedUniv.name}
          </h1>
          {selectedUniv.department && (
            <p className="text-sm md:text-base text-gray-500">
              {selectedUniv.department}
            </p>
          )}
        </div>

        {/* 두 개의 카드 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 커리큘럼 로드맵 카드 */}
          <div
            onClick={() => navigate("/roadmap")}
            className="cursor-pointer rounded-3xl bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-300 shadow-md hover:shadow-xl transition p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-2xl">
              🗺️
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-2">
              커리큘럼 로드맵
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              과목 간 연결 관계를 시각적으로 확인하고,
              <br />
              어떤 순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
            </p>
          </div>

          {/* 전공과목 시뮬레이션 카드 */}
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer rounded-3xl bg-green-50 hover:bg-green-100 border border-green-100 hover:border-green-300 shadow-md hover:shadow-xl transition p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
              📊
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-2">
              전공과목 시뮬레이션
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              수강한 전공과목을 선택해
              <br />
              전공 이수 현황과 남은 과목을 한눈에 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
