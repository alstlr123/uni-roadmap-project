import React, { useState, useMemo } from 'react';
import { ChevronLeft, BarChart2, Zap, Home } from 'lucide-react'; 

const MOCK_UNIVERSITY_DATA = { id: "hansung", name: "서울대학교" }; 
const MOCK_TRACKS = [
    { id: "system", name: "시스템 소프트웨어", progress: 20 },
    { id: "web", name: "웹 공학", progress: 29 },
    { id: "mobile", name: "모바일 소프트웨어 공학", progress: 25 },
    { id: "ai", name: "인공지능 및 기계학습", progress: 20 },
    { id: "data", name: "데이터베이스 시스템", progress: 40 },
    { id: "network", name: "네트워크 및 보안", progress: 17 },
    { id: "graphics", name: "컴퓨터 그래픽스", progress: 25 },
];

// UI 테스트용 Mock 컴포넌트 //
const MockCurriculumRoadmap = (props) => (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#e9e9e9', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}>
        <h2 style={{color: '#333'}}>커리큘럼 로드맵 시각화 영역</h2>
        <p style={{ color: '#555' }}>
            {props.selectedTrack ? `선택된 트랙: ${props.selectedTrack.name}` : '전체 보기'}
        </p>
    </div>
);

const MockSidebar = (props) => (
    <div style={{ padding: '15px', height: '100%', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>트랙/과목 상세 정보</h4>
        <p style={{ fontSize: '14px', color: '#666' }}>
            현재 트랙: {props.selectedTrack ? props.selectedTrack.name : '전체'}
        </p>
        <p style={{ fontSize: '12px', color: '#aaa', marginTop: '20px' }}>
            (Sidebar.js 파일이 완성되면 여기에 실제 데이터가 표시됩니다.)
        </p>
    </div>
);


// [Main Component] RoadmapPage

function RoadmapPage() {
    // Context, Hook 사용 없이 정적 Mock 값만 사용
    const university = MOCK_UNIVERSITY_DATA;
    const tracks = MOCK_TRACKS;

    const progressPercent = 12; 
    const completedCourses = 2; 
    const totalCourses = 17; 
    
    // 상태 관리
    const [currentViewingTrackId, setCurrentViewingTrackId] = useState('전체'); 
    
    const selectedTrack = useMemo(() => {
        return tracks.find(t => t.id === currentViewingTrackId);
    }, [tracks, currentViewingTrackId]);
    
    // 핸들러
    const handleTrackSelect = (trackId) => {
        setCurrentViewingTrackId(trackId);
    };

    const navigateToHome = () => alert("뒤로가기/홈으로 이동 (Mock)");
    const isAllActive = currentViewingTrackId === '전체';

    return (
        <div style={styles.pageContainer}>
            {/* 1. 상단 헤더 영역 */}
            <header style={styles.header}>
                <div style={styles.leftSection}>
                    <ChevronLeft size={24} style={styles.icon} onClick={navigateToHome} />
                    <h1 style={styles.pageTitle}>커리큘럼 로드맵</h1>
                    {/* 이미지처럼 좌측 상단에 학교 이름 박스 */}
                    <span style={styles.universityNameBox}>
                        <Home size={16} color="#1e88e5" style={{marginRight: '5px'}}/>
                        {university.name}
                    </span>
                </div>
                
                <div style={styles.rightSection}>
                    {/* 학교 선택 드롭다운 박스 */}
                    <div style={styles.schoolSelectBox}>
                         <p style={{fontSize: '14px', color: '#666', fontWeight: 'bold', margin: '0 0 4px 0'}}>학교 선택</p>
                         <div style={styles.universityDisplay}>
                            <Zap size={16} color="#444" />
                            <select style={styles.select}>
                                <option value="hansung">{university.name}</option>
                            </select>
                         </div>
                    </div>

                    {/* 진도율 표시 박스 (Progress Bar 포함) */}
                    <div style={styles.progressBox}>
                        <p style={styles.progressPercent}>{progressPercent}%</p>
                        <p style={styles.progressText}>({completedCourses} / {totalCourses})</p>
                        <div style={styles.progressBarWrapper}>
                            <div style={{ ...styles.progressBar, width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. 트랙 탭 메뉴 영역 */}
            <nav style={styles.trackNav}>
                <button 
                    style={{...styles.trackButtonAll, ...(isAllActive ? styles.activeTrackAll : {})}}
                    onClick={() => handleTrackSelect('전체')}
                >
                    전체 보기
                </button>
                {MOCK_TRACKS.map(track => (
                    <button
                        key={track.id}
                        style={{...styles.trackButton, ...(currentViewingTrackId === track.id ? styles.activeTrack : {})}}
                        onClick={() => handleTrackSelect(track.id)}
                    >
                        {track.name} 
                        <span style={styles.trackProgressText}>
                            {track.progress}%
                        </span>
                    </button>
                ))}
            </nav>

            {/* 3. 로드맵 및 사이드바 영역 */}
            <div style={styles.mainContentArea}>
                {/* 로드맵 시각화 영역 (Mock 컴포넌트로 대체) */}
                <div style={styles.roadmapVisualization}>
                    <MockCurriculumRoadmap 
                        selectedTrack={selectedTrack} 
                    />
                </div>

                {/* 우측 사이드바 영역 (Mock 컴포넌트로 대체) */}
                <div style={styles.sidebarContainer}>
                    {/* Sidebar 컴포넌트가 로드맵 시각화 영역을 차지하도록 수정 */}
                    <MockSidebar selectedTrack={selectedTrack} />
                </div>
            </div>
            
            <footer style={styles.footer}>
                Designed by <span style={{ fontWeight: 'bold' }}>Reoddy</span>
            </footer>
        </div>
    );
}



const styles = {
    pageContainer: { fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#fff', padding: '0 20px', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' },
    leftSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    icon: { cursor: 'pointer', color: '#555' },
    pageTitle: { fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#333' },
    universityNameBox: { 
        fontSize: '16px', 
        color: '#1e88e5', 
        display: 'flex', 
        alignItems: 'center', 
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9', // 이미지처럼 배경색 적용
        padding: '8px 12px',
        borderRadius: '8px',
        marginLeft: '10px'
    },
    rightSection: { display: 'flex', alignItems: 'center', gap: '15px' },

    // 학교 선택 박스 (이미지 우측 상단 드롭다운)
    schoolSelectBox: { 
        backgroundColor: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '10px 15px', 
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    universityDisplay: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '5px', 
        justifyContent: 'center'
    },
    select: { border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', color: '#333' },
    
    // 진도율 박스
    progressBox: { 
        backgroundColor: '#e6f0ff', // 연한 파랑 배경
        border: '1px solid #cce0ff', 
        borderRadius: '8px', 
        padding: '10px 15px', 
        width: '120px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    progressText: { color: '#444', fontSize: '12px', margin: 0 },
    progressPercent: { fontWeight: 'bold', color: '#1e88e5', fontSize: '18px', margin: 0 },
    progressBarWrapper: {
        height: '4px',
        backgroundColor: '#cce0ff',
        borderRadius: '2px',
        width: '100%',
        marginTop: '5px'
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#1e88e5', // 진한 파랑
        transition: 'width 0.5s',
    },
    
    // 트랙 탭 메뉴
    trackNav: { display: 'flex', gap: '10px', padding: '15px 0', borderBottom: '1px solid #eee', marginBottom: '20px', overflowX: 'auto' },
    trackButtonAll: { // '전체 보기' 버튼 스타일
        backgroundColor: '#37474f', 
        borderColor: '#37474f', 
        color: 'white', 
        fontWeight: 'bold',
        borderRadius: '8px', 
        padding: '8px 15px', 
        cursor: 'pointer', 
        fontSize: '14px', 
        whiteSpace: 'nowrap'
    },
    activeTrackAll: { // '전체 보기' 활성화는 기본값과 동일 (이미지 참조)
        boxShadow: '0 0 0 2px #37474f' 
    },
    trackButton: { 
        backgroundColor: '#f9f9f9', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '8px 15px', 
        cursor: 'pointer', 
        fontSize: '14px', 
        color: '#555', 
        whiteSpace: 'nowrap', 
        display: 'flex', 
        alignItems: 'center' 
    },
    activeTrack: { 
        backgroundColor: '#f1f1f1', // 트랙 선택 시 활성화는 연하게
        borderColor: '#ccc',
        color: '#333',
        fontWeight: 'bold',
        boxShadow: '0 0 0 2px #ccc' // 활성화 테두리
    },
    trackProgressText: { 
        marginLeft: '8px', 
        fontSize: '12px', 
        color: '#1e88e5', // 진도율 색상 //
    },

    mainContentArea: { display: 'flex', gap: '20px', flex: 1, minHeight: 'calc(100vh - 180px)' }, 
    roadmapVisualization: { flex: 3, backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }, 
    sidebarContainer: { flex: 1, minWidth: '250px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' },
    footer: { marginTop: '20px', padding: '10px 0', fontSize: '12px', color: '#aaa', textAlign: 'left', borderTop: '1px solid #eee' }
};

export default RoadmapPage;
