import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SelectionPage from "./pages/SelectionPage";
import DashboardPage from "./pages/DashboardPage";
import RoadmapPage from "./pages/RoadmapPage";

function App() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  return (
    <div className="page">
      {/* 공통 헤더 */}
      <header className="page-header">
        <div className="logo-title">Uni-Roadmap</div>
        <div className="logo-sub">대학별 맞춤형 커리큘럼 가이드</div>
      </header>

      {/* 라우트 */}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              selectedSchool={selectedSchool}
              onSelectSchool={(school) => setSelectedSchool(school)}
            />
          }
        />
        <Route
          path="/select"
          element={
            <SelectionPage
              selectedSchool={selectedSchool}
              onResetSchool={() => setSelectedSchool(null)}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<DashboardPage selectedSchool={selectedSchool} />}
        />
        <Route
          path="/roadmap"
          element={<RoadmapPage selectedSchool={selectedSchool} />}
        />
        <Route
          path="*"
          element={
            <LandingPage
              selectedSchool={selectedSchool}
              onSelectSchool={(school) => setSelectedSchool(school)}
            />
          }
        />
      </Routes>

      {/* 푸터 배지 */}
      <div className="footer-badge">Designed by Uni-Roadmap</div>
    </div>
  );
}

export default App;
