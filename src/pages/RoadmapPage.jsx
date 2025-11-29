import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, BarChart2, Home, Zap, CornerRightDown, CheckCircle, Clock } from 'lucide-react'; 
import ReactFlow, { 
    Controls, 
    Background, 
    useNodesState, 
    useEdgesState, 
    applyNodeChanges, 
    applyEdgeChanges, 
    MarkerType 
} from 'reactflow';
import 'reactflow/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js'; // 그래프 자동 배치 라이브러리


// [0. MOCK DATA & CONFIGURATION]



// MOCK DATA (사용자 제공) - 코드를 실행하기 위해 내부에 통합

const UNIVERSITIES = [
    {
        id: "hansung",
        name: "한성대학교",
        tracks: [
            // Mock Data의 웹 공학, 모바일 SW, 빅데이터 트랙 데이타
            // 실제 코드를 간결하게 하기 위해 'web' 트랙만 상세히 포함
            {
                id: "web",
                name: "웹공학 트랙",
                courses: [
                    { id: "TR_B01", title: "컴퓨터프로그래밍", grade: "1학년", category: "basic", prereqs: [] },
                    { id: "TR_B02", title: "웹프로그래밍기초", grade: "1학년", category: "basic", prereqs: [] },
                    { id: "CS_C01", title: "자료구조", grade: "2학년", category: "common", prereqs: ["TR_B01"] },
                    { id: "WEB_M01", title: "웹프로그래밍", grade: "2학년", category: "required", prereqs: ["TR_B02"] },
                    { id: "WEB_M02", title: "웹서버프로그래밍", grade: "2학년", category: "required", prereqs: ["WEB_M01"] },
                    { id: "CS_C02", title: "데이터베이스", grade: "2학년", category: "common", prereqs: [] },
                    { id: "WEB_A01", title: "웹프레임워크1", grade: "3학년", category: "major_required", prereqs: ["WEB_M02"] },
                    { id: "WEB_A02", title: "웹프레임워크2", grade: "3학년", category: "major_required", prereqs: ["WEB_A01"] },
                    { id: "WEB_A03", title: "클라우드컴퓨팅", grade: "3학년", category: "major_required", prereqs: [] },
                    { id: "WEB_CAP", title: "웹공학 캡스톤디자인", grade: "4학년", category: "capstone", prereqs: ["WEB_A02", "WEB_A03"] }
                ]
            },
            { id: "mobile", name: "모바일 SW 트랙", courses: [] },
            { id: "bigdata", name: "빅데이터 트랙", courses: [] }
        ]
    },
    { id: "korea", name: "한국대학교", tracks: [] }
];

// 상수 설정
const INITIAL_UNIVERSITY_ID = "hansung";
const INITIAL_TRACK_ID = "web";

const CATEGORY_STYLES = {
    basic: { bg: '#FFF8E1', border: '#FFD54F' },        // 노란색 
    common: { bg: '#FBE9E7', border: '#FF8A65' },       // 주황색 
    required: { bg: '#E3F2FD', border: '#42A5F5' },     // 파란색 
    major_required: { bg: '#FCE4EC', border: '#EC407A' }, // 분홍색 
    capstone: { bg: '#FFEBEA', border: '#E57373' }      // 빨간색 
};
const PROGRESS_MOCK_DATA = { 
    system: 20, web: 29, mobile: 25, ai: 20, data: 40, network: 17, graphics: 25, 
    'ai_track': 20, 'game_track': 17 
};

// [1. UTILITY FUNCTIONS]

// ELK 레이아웃 계산기 초기화
const elk = new ELK();

// 노드 및 엣지 생성 및 레이아웃 계산
const getLayoutedElements = async (courses) => {
    if (!courses || courses.length === 0) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];
    
    // 1. 노드 및 엣지 데이터 변환
    courses.forEach(course => {
        const styles = CATEGORY_STYLES[course.category] || CATEGORY_STYLES.common;
        
        // 노드 생성
        nodes.push({
            id: course.id,
            // 노드 타입은 커스텀 노드를 사용하거나 default로 설정
            data: { label: course.title, courseData: course },
            position: { x: 0, y: 0 }, // ELK가 위치를 설정함
            style: { 
                backgroundColor: styles.bg, 
                border: `2px solid ${styles.border}`,
                width: 150,
                padding: 0,
                borderRadius: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            },
            type: 'courseNode' 
        });

        // 선수 과목 연결
        course.prereqs.forEach((prereqId, index) => {
            edges.push({
                id: `e-${prereqId}-${course.id}-${index}`,
                source: prereqId,
                target: course.id,
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed, color: '#999' },
                style: { stroke: '#ccc', strokeWidth: 2 },
            });
        });
    });

    // 2. ELK 레이아웃 옵션 설정
    const elkOptions = {
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT', // 왼쪽(학년)에서 오른쪽으로 흐름
        'elk.spacing.nodeNode': '60', // 노드 간 간격
        'elk.spacing.nodeNodeBetweenLayers': '100', // 레이어 간 간격 
        'elk.layered.layering.strategy': 'LONGEST_PATH',
    };

    const graph = {
        id: 'root',
        layoutOptions: elkOptions,
        children: nodes.map(node => ({
            ...node,
            width: 150, // 노드 너비
            height: 70, // 노드 높이
        })),
        edges: edges,
    };

    try {
        const layoutedGraph = await elk.layout(graph);

        return {
            nodes: layoutedGraph.children.map(node => ({
                ...node,
                position: { x: node.x + 20, y: node.y + 20 }, // 위치 보정
            })),
            edges: layoutedGraph.edges,
        };
    } catch (error) {
        console.error("ELK layout error:", error);
        return { nodes, edges }; // 에러 발생 시 초기 데이터 반환
    }
};

// 커스텀 노드 컴포넌트 (이미지의 과목 박스 디자인)

const CustomCourseNode = ({ data }) => {
    const { courseData } = data;
    const styles = CATEGORY_STYLES[courseData.category];
    const isCompleted = false; // Mock

    return (
        <div 
            style={{ 
                width: 150, 
                height: 70, 
                backgroundColor: styles.bg, 
                border: `2px solid ${styles.border}`, 
                borderRadius: 8,
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <div style={{ backgroundColor: styles.border, color: 'white', fontSize: '10px', padding: '2px 8px', textAlign: 'left', fontWeight: 'bold' }}>
                {courseData.grade} ({courseData.credit}학점)
            </div>
            <div style={{ padding: '4px 8px', textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#333' }}>{courseData.title}</h4>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                    {courseData.category}
                </div>
            </div>
            <button 
                style={{ 
                    border: 'none', 
                    backgroundColor: isCompleted ? '#4CAF50' : '#2196F3',
                    color: 'white', 
                    fontSize: '10px', 
                    padding: '2px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CornerRightDown size={10} style={{marginRight: '3px'}} /> 
                수강하기 / 완료
            </button>
        </div>
    );
};


//[2. INTEGRATED COMPONENTS]

const IntegratedRoadmapVisualization = ({ selectedTrack, onNodeClick }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const courses = selectedTrack?.courses || [];
    
    // 1. 노드 및 엣지 데이터 준비 및 레이아웃 계산 
    useEffect(() => {
        if (courses.length === 0) {
            setNodes([]);
            setEdges([]);
            return;
        }

        const runLayout = async () => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(courses);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
        };
        runLayout();
    }, [courses]);

    // 2. React Flow 변경 핸들러
    const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    const nodeTypes = useMemo(() => ({ courseNode: CustomCourseNode }), []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(e, node) => onNodeClick(node.data.courseData)} // 클릭 시 데이터 전달
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            style={{ width: '100%', height: '100%' }}
        >
            <Controls showInteractive={false} />
            <Background variant="dots" gap={16} size={1} color="#aaa" />
        </ReactFlow>
    );
};

const MockSidebar = ({ selectedCourse }) => (
    <div style={styles.sidebarInner}>
        <h4 style={styles.sidebarTitle}>과목 상세 정보</h4>
        {selectedCourse ? (
            <div>
                <h3 style={{color: '#1e88e5', margin: '10px 0'}}>{selectedCourse.title}</h3>
                <p><strong>구분:</strong> {selectedCourse.category}</p>
                <p><strong>학년/학점:</strong> {selectedCourse.grade} / {selectedCourse.credit}학점</p>
                <p><strong>설명:</strong> {selectedCourse.desc}</p>
                <hr style={{margin: '15px 0'}} />
                <p><strong>선수 과목 ID:</strong> {selectedCourse.prereqs.join(', ') || '없음'}</p>
            </div>
        ) : (
            <p style={{ color: '#888', marginTop: '20px' }}>로드맵에서 과목 노드를 클릭하세요.</p>
        )}
    </div>
);


// [3. MAIN COMPONENT] RoadmapPage

export default function RoadmapPage() {
    // 1. Context, Hook 데이터 대체 (정적 Mock 값 사용)
    const currentUni = UNIVERSITIES.find(u => u.id === INITIAL_UNIVERSITY_ID);
    const tracks = [
        { id: 'all', name: '전체 보기', courses: currentUni.tracks.flatMap(t => t.courses) },
        ...currentUni.tracks
    ];
    
    const [currentViewingTrackId, setCurrentViewingTrackId] = useState(INITIAL_TRACK_ID); 
    const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);

    // Mock Progress 값 
    const progressPercent = 12; 
    const completedCourses = 2; 
    const totalCourses = 17; 
    
    // 현재 선택된 트랙 객체 (전체 보기일 경우 모든 코스를 포함)
    const selectedTrack = useMemo(() => {
        if (currentViewingTrackId === 'all') {
             // 모든 트랙의 코스를 합쳐서 전체 보기를 구현
            return { id: 'all', name: '전체 보기', courses: UNIVERSITIES.find(u => u.id === INITIAL_UNIVERSITY_ID).tracks.flatMap(t => t.courses) };
        }
        return tracks.find(t => t.id === currentViewingTrackId);
    }, [currentViewingTrackId, tracks]);
    
    // 핸들러
    const handleTrackSelect = (trackId) => {
        setCurrentViewingTrackId(trackId);
        setSelectedCourseDetail(null); // 트랙 변경 시 상세 정보 초기화
    };

    const navigateToHome = () => alert("뒤로가기/홈으로 이동 (Mock)");
    const isAllActive = currentViewingTrackId === 'all';

    return (
        <div style={styles.pageContainer}>
            {/* 1. 상단 헤더 영역 */}
            <header style={styles.header}>
                <div style={styles.leftSection}>
                    <ChevronLeft size={24} style={styles.icon} onClick={navigateToHome} />
                    <h1 style={styles.pageTitle}>커리큘럼 로드맵</h1>
                    <span style={styles.universityNameBox}>
                        <Home size={16} color="#1e88e5" style={{marginRight: '5px'}}/>
                        {currentUni.name}
                    </span>
                </div>
                
                <div style={styles.rightSection}>
                    {/* 학교 선택 드롭다운 박스 */}
                    <div style={styles.schoolSelectBox}>
                         <p style={styles.selectLabel}>학교 선택</p>
                         <div style={styles.universityDisplay}>
                            <Zap size={16} color="#444" />
                            <select style={styles.select}>
                                {UNIVERSITIES.map(uni => (
                                    <option key={uni.id} value={uni.id}>{uni.name}</option>
                                ))}
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
                {tracks.map(track => (
                    <button
                        key={track.id}
                        style={{
                            ...styles.trackButton,
                            ...(track.id === 'all' ? styles.trackButtonAll : {}),
                            ...(currentViewingTrackId === track.id ? styles.activeTrack : {})
                        }}
                        onClick={() => handleTrackSelect(track.id)}
                    >
                        {track.name} 
                        {track.id !== 'all' && (
                             <span style={styles.trackProgressText}>
                                {PROGRESS_MOCK_DATA[track.id] || 0}%
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* 3. 로드맵 및 사이드바 영역 */}
            <div style={styles.mainContentArea}>
                {/* 로드맵 시각화 영역 */}
                <div style={styles.roadmapVisualization}>
                    <IntegratedRoadmapVisualization 
                        selectedTrack={selectedTrack} 
                        onNodeClick={setSelectedCourseDetail}
                    />
                </div>

                {/* 우측 사이드바 영역 */}
                <div style={styles.sidebarContainer}>
                    <MockSidebar selectedCourse={selectedCourseDetail} />
                </div>
            </div>
            
            <footer style={styles.footer}>
                Designed by <span style={{ fontWeight: 'bold' }}>Reoddy</span>
            </footer>
        </div>
    );
}


// [4. Styling] (이미지 UI 기반)

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
        backgroundColor: '#f9f9f9',
        padding: '8px 12px',
        borderRadius: '8px',
        marginLeft: '10px'
    },
    rightSection: { display: 'flex', alignItems: 'center', gap: '15px' },

    schoolSelectBox: { 
        backgroundColor: '#fff', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '10px 15px', 
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    selectLabel: {fontSize: '14px', color: '#666', fontWeight: 'bold', margin: '0 0 4px 0'},
    universityDisplay: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '5px', 
        justifyContent: 'center'
    },
    select: { border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', color: '#333' },
    
    progressBox: { 
        backgroundColor: '#e6f0ff', 
        border: '1px solid #cce0ff', 
        borderRadius: '8px', 
        padding: '10px 15px', 
        width: '120px', 
        textAlign: 'center',
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
        backgroundColor: '#1e88e5',
        transition: 'width 0.5s',
    },
    
    trackNav: { display: 'flex', gap: '10px', padding: '15px 0', borderBottom: '1px solid #eee', marginBottom: '20px', overflowX: 'auto' },
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
    trackButtonAll: { 
        backgroundColor: '#37474f', 
        borderColor: '#37474f', 
        color: 'white', 
        fontWeight: 'bold',
    },
    activeTrack: { 
        backgroundColor: '#f1f1f1',
        borderColor: '#ccc',
        color: '#333',
        fontWeight: 'bold',
        boxShadow: '0 0 0 2px #ccc' 
    },
    trackProgressText: { 
        marginLeft: '8px', 
        fontSize: '12px', 
        color: '#1e88e5',
    },

    mainContentArea: { display: 'flex', gap: '20px', flex: 1, minHeight: 'calc(100vh - 180px)' }, 
    roadmapVisualization: { flex: 3, backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }, 
    sidebarContainer: { flex: 1, minWidth: '250px' },
    sidebarInner: { padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', height: '100%' },
    sidebarTitle: { borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 15px 0', color: '#333' },
    footer: { marginTop: '20px', padding: '10px 0', fontSize: '12px', color: '#aaa', textAlign: 'left', borderTop: '1px solid #eee' }
};
