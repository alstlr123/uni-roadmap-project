import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // ★ 전역 상태 가져오기
import { Map, BarChart2, ArrowLeft } from 'lucide-react';

const SelectionPage = () => {
  const navigate = useNavigate();
  const { selectedUniv } = useApp(); // Context에서 '선택된 학교 정보' 꺼내기

  // 예외 처리: 학교 선택 안 하고 주소로 바로 들어왔을 때
  if (!selectedUniv) {
    return (
      <div className="text-center mt-20">
        <p className="mb-4">학교가 선택되지 않았습니다.</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 underline"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-black mb-6 text-sm"
        >
          <ArrowLeft size={18} className="mr-1" />
          학교 다시 선택하기
        </button>

        {/* 큰 흰색 카드 컨테이너 */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl px-8 py-9 md:px-10 md:py-10">
          {/* 학교 이름 / 안내 문구 */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
              {selectedUniv.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              커리큘럼 로드맵과 전공과목 시뮬레이션 기능 중에서 원하는 메뉴를 선택하세요.
            </p>
          </div>

          {/* 두 개의 선택 카드 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 커리큘럼 로드맵 카드 */}
            <div
              onClick={() => navigate('/roadmap')}
              className="cursor-pointer rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-blue-400 transition"
            >
              <div className="text-[34px] mb-3">
                🗺️
              </div>
              <h2 className="text-xl font-bold mb-2 text-slate-900">
                커리큘럼 로드맵
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                과목 간 연결 관계를 시각적으로 확인하고
                어떤 순서로 수강하면 좋을지 한눈에 확인할 수 있습니다.
              </p>
            </div>

            {/* 전공과목 시뮬레이션 카드 */}
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer rounded-2xl border border-green-200 bg-emerald-50 p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-green-400 transition"
            >
              <div className="text-[34px] mb-3">
                📊
              </div>
              <h2 className="text-xl font-bold mb-2 text-slate-900">
                전공과목 시뮬레이션
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                수강한 전공과목을 선택해 전공 이수 학점과
                남은 과목을 한눈에 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
