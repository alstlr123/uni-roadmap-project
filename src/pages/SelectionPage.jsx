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
        <button onClick={() => navigate('/')} className="text-blue-600 underline">홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-black mb-8">
        <ArrowLeft size={20} className="mr-1" /> 학교 다시 선택하기
      </button>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          <span className="text-blue-600">{selectedUniv.name}</span>에 오신 것을 환영합니다!
        </h1>
        <p className="text-gray-600">원하시는 메뉴를 선택해주세요.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 로드맵 카드 */}
        <div 
          onClick={() => navigate('/roadmap')}
          className="bg-white p-8 rounded-2xl border hover:border-blue-500 hover:shadow-xl cursor-pointer transition group"
        >
          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <Map className="text-blue-600 group-hover:text-white" size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">커리큘럼 로드맵</h2>
          <p className="text-gray-500 text-sm">트랙별 이수 체계도를 인터랙티브하게 확인하고 수강 계획을 세웁니다.</p>
        </div>

        {/* 대시보드 카드 */}
        <div 
          onClick={() => navigate('/dashboard')}
          className="bg-white p-8 rounded-2xl border hover:border-green-500 hover:shadow-xl cursor-pointer transition group"
        >
          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition">
            <BarChart2 className="text-green-600 group-hover:text-white" size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">나의 진도율</h2>
          <p className="text-gray-500 text-sm">내가 수강한 과목을 체크하고 졸업 요건 달성 현황을 분석합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;