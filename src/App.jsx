import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// import { AppProvider } from './context/AppContext'; // 실제 Context (주석 처리 유지)
// import Layout from './components/Layout'; // 실제 Layout (주석 처리 유지)

// 방금 만든 페이지들 불러오기 (실제 파일 경로 사용)
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import RoadmapPage from './pages/RoadmapPage'; 
import DashboardPage from './pages/DashboardPage';

// [Mock 생성] 화면 높이 제어를 위한 Mock 컴포넌트

// Mock AppProvider (Context 오류 방지)
const MockAppProvider = ({ children }) => children;

// Mock Layout (화면 높이를 100%로 설정)
const MockLayout = () => {
    return (
        // minHeight: '100vh'를 사용하여 브라우저 높이를 꽉 채웁니다.
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Outlet은 중첩 Route의 element(RoadmapPage 등)를 렌더링합니다. */}
            <Outlet /> 
        </div>
    );
};

// =======================================================

function App() {
  return (
    <MockAppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MockLayout />}>
            {/* 시작 페이지를 LandingPage로 설정 */}
            <Route path="/" element={<LandingPage />} />

            {/* 나머지 경로는 팀원 작업 그대로 유지 */}
            <Route path="/select" element={<SelectionPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/landing" element={<LandingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MockAppProvider>
  );
}

export default App;
