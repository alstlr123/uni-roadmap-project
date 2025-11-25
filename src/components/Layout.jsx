import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* 1. 고정 헤더 (모든 페이지 공통) */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate('/')} // 로고 누르면 홈으로
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Uni-Roadmap</span>
        </div>

        {/* 우측 상단: 심플한 네비게이션 */}
        <nav className="flex gap-4 text-sm font-medium text-gray-500">
          <button onClick={() => navigate('/select')} className="hover:text-blue-600 transition">대시보드</button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black transition">GitHub</a>
        </nav>
      </header>

      {/* 2. 본문 영역 (여기서 각 페이지 내용이 바뀜) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
        <Outlet /> 
      </main>

      {/* 3. 푸터 */}
      <footer className="border-t py-6 text-center text-gray-400 text-xs">
        © 2024 Uni-Roadmap Project. Built with React & Tailwind.
      </footer>
    </div>
  );
};

export default Layout;