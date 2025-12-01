import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react';
import { ChevronLeft, BarChart2, Home, Zap, CornerRightDown, Clock, Search, BookOpen, Monitor, Briefcase } from 'lucide-react'; 
import ReactFlow, { 
    Controls, 
    Background, 
    useNodesState, 
    useEdgesState, 
    MarkerType,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js'; 

// 이 파일은 Context를 사용하지만, 독립적으로 작동하기 위해 Mock으로 대체합니다.
// 🚨 [Mock 수정]: Context를 비어있는 상태로 시뮬레이션합니다. 
// 이 값을 통해 검색 결과가 없음을 표현하고, 하위 로직에서 안전하게 처리합니다.
const AppContext = React.createContext({
    // Context에서 넘어와야 할 실제 값들
    universityData: null, // ⬅️ 검색 결과가 아직 없거나, LandingPage에서 넘어온 값
    selectedTrackId: null, 
    navigateToHome: () => window.history.back(), 
    setUniversityData: () => console.log("Mock Context Function Called"),
}); 


// =======================================================
// [0. MOCK DATA - 사용자 제공 데이터 통합]
// =======================================================
const UNIVERSITIES = [
    {
        id: "hansung",
        name: "한성대학교",
        tracks: [
            // [Track 1] 웹 공학 트랙
            {
                id: "web",
                name: "웹공학 트랙",
                courses: [
                    { id: "TR_B01", title: "컴퓨터프로그래밍", grade: "1학년", category: "basic", credit: 3, desc: "C언어 기초 및 프로그래밍 입문", prereqs: [], resources: [] },
                    { id: "TR_B02", title: "웹프로그래밍기초", grade: "1학년", category: "basic", credit: 3, desc: "HTML/CSS 및 웹 표준의 이해", prereqs: [], resources: [{ type: "doc", title: "MDN Web Docs", url: "https://developer.mozilla.org/ko/", source: "MDN", tags: ["HTML", "CSS"] }] },
                    { id: "CS_C01", title: "자료구조", grade: "2학년", category: "common", credit: 3, desc: "배열, 리스트, 스택, 큐, 트리 등 데이터 구조 학습", prereqs: ["TR_B01"], resources: [{ type: "lecture", title: "자료구조와 알고리즘", url: "https://www.inflearn.com/", source: "인프런", tags: ["CS지식"] }, { type: "job", title: "백엔드 개발자", url: "https://www.wanted.co.kr", source: "원티드", tags: ["Java", "Python"] }] },
                    { id: "WEB_M01", title: "웹프로그래밍", grade: "2학년", category: "required", credit: 3, desc: "JavaScript 기초 및 DOM 조작, 프론트엔드 입문", prereqs: ["TR_B02"], resources: [{ type: "doc", title: "Modern JS Tutorial", url: "https://ko.javascript.info/", source: "JS Info", tags: ["JS"] }] },
                    { id: "WEB_M02", title: "웹서버프로그래밍", grade: "2학년", category: "required", credit: 3, desc: "Node.js/Express 또는 JSP를 이용한 백엔드 기초", prereqs: ["WEB_M01"], resources: [] },
                    { id: "CS_C02", title: "데이터베이스", grade: "2학년", category: "common", credit: 3, desc: "관계형 데이터베이스 설계 및 SQL", prereqs: [], resources: [] },
                    { id: "WEB_A01", title: "웹프레임워크1", grade: "3학년", category: "major_required", credit: 3, desc: "React.js를 활용한 SPA 개발 심화", prereqs: ["WEB_M02"], resources: [{ type: "lecture", title: "React 완벽 가이드", url: "https://react.dev", source: "공식문서", tags: ["React"] }, { type: "job", title: "프론트엔드 엔지니어", url: "https://toss.im/career", source: "토스", tags: ["React", "Next.js"] }] },
                    { id: "WEB_A02", title: "웹프레임워크2", grade: "3학년", category: "major_required", credit: 3, desc: "상태관리(Redux/Recoil) 및 성능 최적화", prereqs: ["WEB_A01"], resources: [] },
                    { id: "WEB_A03", title: "클라우드컴퓨팅", grade: "3학년", category: "major_required", credit: 3, desc: "AWS/Azure 기초 및 배포 실습", prereqs: [], resources: [{ type: "doc", title: "AWS 기초", url: "https://aws.amazon.com", source: "AWS", tags: ["DevOps"] }] },
                    { id: "WEB_CAP", title: "웹공학 캡스톤디자인", grade: "4학년", category: "capstone", credit: 3, desc: "졸업 작품 기획, 개발 및 배포", prereqs: ["WEB_A02", "WEB_A03"], resources: [{ type: "job", title: "웹 개발자 신입 채용", url: "https://www.naver-corp.com", source: "네이버", tags: ["Fullstack"] }] }
                ]
            },
            // [Track 2] 모바일 SW 트랙
            {
                id: "mobile",
                name: "모바일 SW 트랙",
                courses: [
                    { id: "TR_B01_MOB", title: "컴퓨터프로그래밍", grade: "1학년", category: "basic", credit: 3, desc: "C언어 기초", prereqs: [], resources: [] },
                    { id: "MOB_M01", title: "객체지향언어1", grade: "2학년", category: "common", credit: 3, desc: "Java 프로그래밍 기초 및 OOP 개념", prereqs: ["TR_B01_MOB"], resources: [] },
                    { id: "MOB_M03", title: "안드로이드프로그래밍", grade: "2학년", category: "major_required", credit: 3, desc: "Android Studio 활용 앱 개발 기초", prereqs: ["MOB_M01"], resources: [{ type: "doc", title: "Android Docs", url: "https://developer.android.com", source: "Google", tags: ["Kotlin"] }] },
                    { id: "MOB_A01", title: "고급모바일프로그래밍", grade: "3학년", category: "major_required", credit: 3, desc: "심화 안드로이드 기능 구현", prereqs: ["MOB_M03"], resources: [] },
                    { id: "MOB_CAP", title: "모바일 캡스톤디자인", grade: "4학년", category: "capstone", credit: 3, desc: "모바일 앱 서비스 프로젝트", prereqs: ["MOB_A01"], resources: [] }
                ]
            },
            // [Track 3] 빅 데이터 트랙
            {
                id: "bigdata",
                name: "빅데이터 트랙",
                courses: [
                    { id: "TR_B01_DATA", title: "컴퓨터프로그래밍", grade: "1학년", category: "basic", credit: 3, desc: "프로그래밍 입문", prereqs: [] },
                    { id: "DATA_B01", title: "빅데이터기초", grade: "2학년", category: "common", credit: 3, desc: "빅데이터의 개념 및 파이썬 기초", prereqs: [], resources: [] },
                    { id: "DATA_M01", title: "데이터마이닝", grade: "2학년", category: "required", credit: 3, desc: "데이터 패턴 분석 및 추출 기법", prereqs: ["DATA_B01"], resources: [] },
                    { id: "DATA_A01", title: "인공지능", grade: "3학년", category: "major_required", credit: 3, desc: "머신러닝/딥러닝 기초 이론", prereqs: ["DATA_M01"], resources: [{ type: "lecture", title: "모두를 위한 딥러닝", url: "https://pytorch.org", source: "PyTorch", tags: ["AI"] }] },
                    { id: "DATA_CAP", title: "빅데이터 캡스톤디자인", grade: "4학년", category: "capstone", credit: 3, desc: "데이터 분석 기반 프로젝트", prereqs: ["DATA_A01"], resources: [] }
                ]
            }
        ]
    },
    // 한국대학교 데이터
    {
        id: "korea",
        name: "한국대학교",
        tracks: [
            {
                id: "ai_track",
                name: "인공지능 트랙",
                courses: [
                    { id: "K_AI_01", title: "파이썬 프로그래밍", grade: "1학년", category: "basic", credit: 3, desc: "데이터 분석을 위한 Python 기초 문법", prereqs: [] },
                    { id: "K_AI_03", title: "머신러닝 개론", grade: "2학년", category: "major_required", credit: 3, desc: "지도학습, 비지도학습 알고리즘의 이해", prereqs: ["K_AI_01"], resources: [] },
                    { id: "K_AI_05", title: "딥러닝 심화", grade: "3학년", category: "major_required", credit: 3, desc: "CNN, RNN 및 최신 딥러닝 모델 구현", prereqs: ["K_AI_03"], resources: [] },
                    { id: "K_AI_CAP", title: "AI 캡스톤디자인", grade: "4학년", category: "capstone", credit: 3, desc: "AI 모델 서빙 및 서비스 개발", prereqs: ["K_AI_05"], resources: [] }
                ]
            },
            {
                id: "game_track",
                name: "게임 개발 트랙",
                courses: [
                    { id: "K_GM_01", title: "C# 프로그래밍", grade: "1학년", category: "basic", credit: 3, desc: "게임 스크립팅을 위한 C# 기초", prereqs: [] },
                    { id: "K_GM_02", title: "유니티 엔진 기초", grade: "2학년", category: "major_required", credit: 3, desc: "Unity 엔진 인터페이스 및 2D 게임 제작", prereqs: ["K_GM_01"], resources: [{ type: "doc", title: "Unity Manual", url: "https://docs.unity3d.com", source: "Unity", tags: ["Engine"] }] },
                    { id: "K_GM_04", title: "3D 게임 프로그래밍", grade: "3학년", category: "major_required", credit: 3, desc: "3D 공간 수학 및 물리 엔진 활용", prereqs: ["K_GM_02"] },
                    { id: "K_GM_CAP", title: "게임 출시 프로젝트", grade: "4학년", category: "capstone", credit: 3, desc: "게임 스토어 출시 및 배포 실습", prereqs: ["K_GM_04"], resources: [] }
                ]
            }
        ]
    }
];


// -------------------------------------------------------
// 상수 설정
// -------------------------------------------------------
const INITIAL_UNIVERSITY_ID = "hansung";
const INITIAL_TRACK_ID = "web";

const CATEGORY_STYLES = {
    basic: { bg: '#FFF8E1', border: '#FFD54F' },
    common: { bg: '#FBE9E7', border: '#FF8A65' },
    required: { bg: '#E3F2FD', border: '#42A5F5' },
    major_required: { bg: '#FCE4EC', border: '#EC407A' },
    capstone: { bg: '#FFEBEA', border: '#E57373' }
};
const PROGRESS_MOCK_DATA = { 
    web: 29, mobile: 25, bigdata: 40, 'ai_track': 20, 'game_track': 17 
};

// =======================================================
// [1. UTILITY FUNCTIONS - ELK LAYOUT]
// =======================================================
const elk = new ELK();

const getLayoutedElements = async (courses) => {
    if (!courses || courses.length === 0) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];
    const courseMap = new Map();
    courses.forEach(course => courseMap.set(course.id, course));

    courses.forEach(course => {
        const styles = CATEGORY_STYLES[course.category] || CATEGORY_STYLES.common;
        nodes.push({
            id: course.id,
            data: { label: course.title, courseData: course },
            position: { x: 0, y: 0 },
            style: { 
                backgroundColor: styles.bg, 
                border: `2px solid ${styles.border}`,
                width: 150,
                padding: 0,
                borderRadius: 8,
            },
            type: 'courseNode' 
        });

        course.prereqs.forEach((prereqId, index) => {
            if (courseMap.has(prereqId)) {
                edges.push({
                    id: `e-${prereqId}-${course.id}-${index}`,
                    source: prereqId,
                    target: course.id,
                    type: 'smoothstep',
                    markerEnd: { type: MarkerType.ArrowClosed, color: '#999' },
                    style: { stroke: '#ccc', strokeWidth: 2 },
                });
            }
        });
    });

    const elkOptions = {
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT',
        'elk.spacing.nodeNode': '40',
        'elk.spacing.nodeNodeBetweenLayers': '80',
        'elk.layered.layering.strategy': 'NETWORK_SIMPLEX',
        'elk.padding': '[top=20,left=20,bottom=20,right=20]',
    };

    const graph = {
        id: 'root',
        layoutOptions: elkOptions,
        children: nodes.map(node => ({
            ...node,
            width: 150, height: 70,
        })),
        edges: edges,
    };

    try {
        const layoutedGraph = await elk.layout(graph);

        return {
            nodes: layoutedGraph.children.map(node => ({
                ...node,
                position: { x: node.x + 20, y: node.y + 20 },
            })),
            edges: layoutedGraph.edges,
        };
    } catch (error) {
        console.error("ELK layout error:", error);
        const fallbackNodes = {};
        let yOffset = 50;
        
        nodes.forEach(node => {
            const grade = node.data.courseData.grade;
            if (!fallbackNodes[grade]) {
                fallbackNodes[grade] = 0;
            }
            node.position = { x: fallbackNodes[grade] * 200, y: yOffset };
            fallbackNodes[grade]++;
        });
        
        return { nodes, edges };
    }
};

// =======================================================
// [2. INTEGRATED COMPONENTS]
// =======================================================

const CustomCourseNode = ({ data, selected }) => {
    const { courseData } = data;
    const styles = CATEGORY_STYLES[courseData.category] || CATEGORY_STYLES.common;
    const isCompleted = false; 

    return (
        <div 
            style={{ 
                width: 150, height: 70, backgroundColor: styles.bg, 
                border: `2px solid ${styles.border}`, borderRadius: 8, padding: 0,
                cursor: 'pointer', overflow: 'hidden', display: 'flex',
                flexDirection: 'column',
                boxShadow: selected ? '0 0 0 3px #1e88e5' : '0 1px 3px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{ backgroundColor: styles.border, color: 'white', fontSize: '10px', padding: '2px 8px', textAlign: 'left', fontWeight: 'bold' }}>
                {courseData.grade} ({courseData.credit}학점)
            </div>
            <div style={{ flexGrow: 1, padding: '4px 8px', textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: 1.2, fontWeight: 'bold' }}>{courseData.title}</h4>
            </div>
            <button 
                style={{ 
                    border: 'none', backgroundColor: isCompleted ? '#4CAF50' : '#2196F3',
                    color: 'white', fontSize: '10px', padding: '2px 0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                }}
            >
                <CornerRightDown size={10} style={{marginRight: '3px'}} /> 
                {isCompleted ? '완료 취소' : '수강하기'}
            </button>
        </div>
    );
};

const IntegratedRoadmapVisualization = ({ selectedTrack, onNodeClick }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesState] = useEdgesState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const courses = selectedTrack?.courses || [];
    
    useEffect(() => {
        if (courses.length === 0) { setNodes([]); setEdges([]); return; }
        
        setIsLoading(true);
        setSelectedNodeId(null);

        const runLayout = async () => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(courses);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
            setIsLoading(false);
        };
        runLayout();
    }, [courses]);

    const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);
    const nodeTypes = useMemo(() => ({ courseNode: CustomCourseNode }), []);
    
    const handleNodeClick = useCallback((e, node) => {
        onNodeClick(node.data.courseData);
        setSelectedNodeId(node.id);
    }, [onNodeClick]);

    if (isLoading) {
        return <div style={{...styles.roadmapVisualization, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0'}}>
            <Clock size={32} color="#444" style={{marginRight: '10px'}} />
            <span style={{color: '#444'}}>그래프 레이아웃 계산 중...</span>
        </div>;
    }

    const mappedNodes = nodes.map(node => ({ ...node, selected: node.id === selectedNodeId, }));

    return (
        <ReactFlow
            nodes={mappedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesState}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            style={{ width: '100%', height: '100%' }}
        >
            <Controls showInteractive={false} />
            <Background variant="dots" gap={16} size={1} color="#e6e6e6" />
        </ReactFlow>
    );
};

const getResourceIcon = (type) => {
    switch (type) {
        case 'job': return { icon: Briefcase, color: '#4CAF50', bg: '#E8F5E9', tagsBg: '#CCEECC' }; 
        case 'lecture': return { icon: Monitor, color: '#9C27B0', bg: '#F3E5F5', tagsBg: '#E1BEE7' };
        case 'doc': return { icon: BookOpen, color: '#2196F3', bg: '#E3F2FD', tagsBg: '#BBDEFB' };
        default: return { icon: Search, color: '#666', bg: '#EEE', tagsBg: '#CCC' };
    }
}

const MockSidebar = ({ selectedCourse }) => {
    return (
        <div style={styles.sidebarInner}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 15px 0'}}>
                 <h4 style={styles.sidebarTitle}>과목 상세 정보</h4>
                 <div style={{cursor: 'pointer'}}>❌</div>
            </div>
            
            {selectedCourse ? (
                <div>
                    <h3 style={{color: '#333', margin: '0 0 5px 0', fontSize: '18px'}}>{selectedCourse.title}</h3>
                    <p style={{fontSize: '14px', color: '#666'}}>{selectedCourse.desc}</p>
                    
                    <div style={{display: 'flex', gap: '15px', marginTop: '10px', marginBottom: '20px'}}>
                        <p style={{fontSize: '14px', color: '#666', margin: 0}}>
                            <BookOpen size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                            {selectedCourse.credit}학점
                        </p>
                        <p style={{fontSize: '14px', color: '#666', margin: 0}}>
                            <CornerRightDown size={14} style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                            {selectedCourse.category === 'major_required' ? 'Advanced' : 'Basic/Common'}
                        </p>
                    </div>

                    <h4 style={{ margin: '20px 0 10px 0', fontWeight: 'bold' }}>🔗 관련 리소스</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {(selectedCourse.resources && selectedCourse.resources.length > 0) ? (
                            selectedCourse.resources.map((res, index) => {
                                const { icon: Icon, color, bg } = getResourceIcon(res.type);
                                return (
                                    <a key={index} href={res.url} target="_blank" rel="noopener noreferrer" style={styles.resourceCard}>
                                        <div style={{display: 'flex', gap: '10px', alignItems: 'center', width: '100%'}}>
                                            <div style={{backgroundColor: bg, padding: '10px', borderRadius: '8px', flexShrink: 0}}>
                                                <Icon size={24} color={color} />
                                            </div>
                                            <div style={{flexGrow: 1}}>
                                                <p style={{margin: 0, fontWeight: 'bold', color: '#333'}}>{res.title}</p>
                                                <p style={{margin: '2px 0 5px 0', fontSize: '12px', color: '#888'}}>{res.source}</p>
                                                
                                                {res.tags && res.tags.length > 0 && (
                                                    <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                                                        {res.tags.map((tag, tagIndex) => (
                                                            <span key={tagIndex} style={styles.tagStyle}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span style={{fontSize: '18px', color: '#aaa', marginLeft: 'auto', flexShrink: 0}}>↗️</span>
                                        </div>
                                    </a>
                                );
                            })
                        ) : (
                            <p style={{ color: '#888' }}>제공된 학습 리소스가 없습니다.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p style={{ color: '#888', marginTop: '20px' }}>로드맵에서 과목 노드를 클릭하세요. 상세 정보가 여기에 표시됩니다.</p>
            )}
        </div>
    );
};


// =======================================================
// [3. MAIN COMPONENT] RoadmapPage
// =======================================================
export default function RoadmapPage() {
    // 🚨 [Context 사용]: Context에서 넘어온 대학 데이터를 사용하여 상태 초기화
    const { 
        universityData: contextUniData, 
        selectedTrackId: contextTrackId, 
        navigateToHome: contextNavigateToHome,
        setUniversityData: contextSetUniversityData
    } = useContext(AppContext);

    // 1. 상태 설정
    // 🚨 [핵심 수정]: Context에서 넘어온 uniData가 있으면 그 ID를 사용합니다. 없으면 INITIAL_UNIVERSITY_ID("hansung")를 사용합니다.
    const [selectedUniversityId, setSelectedUniversityId] = useState(contextUniData?.id || INITIAL_UNIVERSITY_ID);
    const [currentViewingTrackId, setCurrentViewingTrackId] = useState(contextTrackId || INITIAL_TRACK_ID); 
    const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);

    // 2. 현재 선택된 대학 및 트랙 계산
    // Context에서 받은 ID로 대학을 찾고, 없으면 INITIAL_UNIVERSITY_ID의 대학을 fallback으로 사용
    const currentUniversityData = UNIVERSITIES.find(u => u.id === selectedUniversityId) || UNIVERSITIES.find(u => u.id === INITIAL_UNIVERSITY_ID);
    
    const currentTracks = useMemo(() => {
        const uniTracks = currentUniversityData?.tracks || [];
        const allTrack = { id: 'all', name: '전체 보기', progress: 0 };
        return [allTrack, ...uniTracks]; 
    }, [currentUniversityData]);


    const selectedTrack = useMemo(() => {
        const trackData = currentUniversityData.tracks.find(t => t.id === currentViewingTrackId);
        
        if (currentViewingTrackId === 'all') {
            return { 
                id: 'all', 
                name: '전체 보기', 
                courses: currentUniversityData.tracks.flatMap(t => t.courses) 
            };
        }
        return trackData;
    }, [currentViewingTrackId, currentUniversityData]);
    
    // 3. Progress 값 계산
    const totalCourses = currentUniversityData.tracks.flatMap(t => t.courses).length;
    const completedCourses = Math.floor(totalCourses * 0.12);
    const progressPercent = Math.floor(100 * (completedCourses / totalCourses)); 

    // 4. 핸들러
    const handleTrackSelect = (trackId) => {
        setCurrentViewingTrackId(trackId);
        setSelectedCourseDetail(null);
    };

    const handleUniversityChange = (e) => {
        const newUniId = e.target.value;
        const newUni = UNIVERSITIES.find(u => u.id === newUniId);
        
        // Context에 선택된 대학 정보 저장 (실제 환경)
        if (newUni && contextSetUniversityData) {
            contextSetUniversityData({ id: newUni.id, name: newUni.name });
        }

        setSelectedUniversityId(newUniId);
        // 새로운 대학의 첫 번째 트랙으로 초기화
        setCurrentViewingTrackId(newUni?.tracks[0]?.id || 'all'); 
        setSelectedCourseDetail(null);
    }

    const navigateToHome = contextNavigateToHome;

    return (
        <div style={styles.pageContainer}> 
            {/* 1. 상단 헤더 영역 */}
            <header style={styles.header}>
                <div style={styles.leftSection}>
                    <ChevronLeft size={24} style={styles.icon} onClick={navigateToHome} />
                    <h1 style={styles.pageTitle}>커리큘럼 로드맵</h1>
                    <span style={styles.universityNameBox}>
                        <Home size={16} color="#1e88e5" style={{marginRight: '5px'}}/>
                        {currentUniversityData.name}
                    </span>
                </div>
                
                <div style={styles.rightSection}>
                    {/* 학교 선택 드롭다운 박스 */}
                    <div style={styles.schoolSelectBox}>
                         <p style={styles.selectLabel}>학교 선택</p>
                         <div style={styles.universityDisplay}>
                            <Zap size={16} color="#444" />
                            {/* 🚨 [핵심 확인]: 드롭다운의 value는 selectedUniversityId 상태를 따릅니다. */}
                            <select style={styles.select} value={selectedUniversityId} onChange={handleUniversityChange}>
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
                {currentTracks.map(track => (
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
                             <span style={{
                                 ...styles.trackProgressText,
                                 backgroundColor: currentViewingTrackId === track.id ? '#546e7a' : '#fff',
                                 color: currentViewingTrackId === track.id ? 'white' : '#1e88e5'
                             }}>
                            {PROGRESS_MOCK_DATA[track.id] || 0}%
                        </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* 3. 로드맵 및 사이드바 영역 */}
            <div style={styles.mainContentArea}>
                <div style={styles.roadmapVisualization}>
                    {/* 로드맵 시각화 컴포넌트 */}
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

// =======================================================
// [4. Styling] (이미지 UI 기반)
// =======================================================
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
        backgroundColor: '#37474f', 
        color: 'white',
        borderColor: '#37474f',
        fontWeight: 'bold',
        boxShadow: '0 0 0 2px #37474f' 
    },
    trackProgressText: { 
        marginLeft: '8px', 
        fontSize: '12px', 
        color: 'white',
        backgroundColor: '#546e7a',
        padding: '2px 6px',
        borderRadius: '4px'
    },
    
    mainContentArea: { display: 'flex', gap: '20px', flex: 1, minHeight: 'calc(100vh - 180px)' }, 
    roadmapVisualization: { flex: 3, backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }, 
    sidebarContainer: { flex: 1, minWidth: '250px' },
    sidebarInner: { padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', height: '100%' },
    sidebarTitle: { borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 15px 0', color: '#333' },
    footer: { marginTop: '20px', padding: '10px 0', fontSize: '12px', color: '#aaa', textAlign: 'left', borderTop: '1px solid #eee' },
    tagStyle: {
        fontSize: '10px',
        padding: '3px 6px',
        borderRadius: '4px',
        backgroundColor: '#e6f0ff',
        color: '#1e88e5',
    },
    resourceCard: {
        display: 'block',
        textDecoration: 'none',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '10px',
        transition: 'box-shadow 0.2s',
    }
};