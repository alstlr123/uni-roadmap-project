// src/pages/RoadmapPage.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Home, Clock, Search, BookOpen, Monitor, Briefcase, CornerRightDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ELK from "elkjs/lib/elk.bundled.js";

// ========================= MOCK DATA ========================= //
const UNIVERSITIES = [
  {
    id: "hansung",
    name: "한성대학교",
    tracks: [
      {
        id: "web",
        name: "웹공학 트랙",
        courses: [
          {
            id: "TR_B01",
            title: "컴퓨터프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "C언어 기초 및 프로그래밍 입문",
            prereqs: [],
            resources: [],
          },
          {
            id: "TR_B02",
            title: "웹프로그래밍기초",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "HTML/CSS 및 웹 표준의 이해",
            prereqs: [],
            resources: [
              {
                type: "doc",
                title: "MDN Web Docs",
                url: "https://developer.mozilla.org/ko/",
                source: "MDN",
                tags: ["HTML", "CSS"],
              },
            ],
          },
          {
            id: "CS_C01",
            title: "자료구조",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "배열, 리스트, 스택, 큐, 트리 등 데이터 구조 학습",
            prereqs: ["TR_B01"],
            resources: [
              {
                type: "lecture",
                title: "자료구조와 알고리즘",
                url: "https://www.inflearn.com/",
                source: "인프런",
                tags: ["CS지식"],
              },
              {
                type: "job",
                title: "백엔드 개발자",
                url: "https://www.wanted.co.kr",
                source: "원티드",
                tags: ["Java", "Python"],
              },
            ],
          },
          {
            id: "WEB_M01",
            title: "웹프로그래밍",
            grade: "2학년",
            category: "required",
            credit: 3,
            desc: "JavaScript 기초 및 DOM 조작, 프론트엔드 입문",
            prereqs: ["TR_B02"],
            resources: [
              {
                type: "doc",
                title: "Modern JS Tutorial",
                url: "https://ko.javascript.info/",
                source: "JS Info",
                tags: ["JS"],
              },
            ],
          },
          {
            id: "WEB_M02",
            title: "웹서버프로그래밍",
            grade: "2학년",
            category: "required",
            credit: 3,
            desc: "Node.js/Express 또는 JSP를 이용한 백엔드 기초",
            prereqs: ["WEB_M01"],
            resources: [],
          },
          {
            id: "CS_C02",
            title: "데이터베이스",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "관계형 데이터베이스 설계 및 SQL",
            prereqs: [],
            resources: [],
          },
          {
            id: "WEB_A01",
            title: "웹프레임워크1",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "React.js를 활용한 SPA 개발 심화",
            prereqs: ["WEB_M02"],
            resources: [
              {
                type: "lecture",
                title: "React 완벽 가이드",
                url: "https://react.dev",
                source: "공식문서",
                tags: ["React"],
              },
              {
                type: "job",
                title: "프론트엔드 엔지니어",
                url: "https://toss.im/career",
                source: "토스",
                tags: ["React", "Next.js"],
              },
            ],
          },
          {
            id: "WEB_A02",
            title: "웹프레임워크2",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "상태관리(Redux/Recoil) 및 성능 최적화",
            prereqs: ["WEB_A01"],
            resources: [],
          },
          {
            id: "WEB_A03",
            title: "클라우드컴퓨팅",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "AWS/Azure 기초 및 배포 실습",
            prereqs: [],
            resources: [
              {
                type: "doc",
                title: "AWS 기초",
                url: "https://aws.amazon.com",
                source: "AWS",
                tags: ["DevOps"],
              },
            ],
          },
          {
            id: "WEB_CAP",
            title: "웹공학 캡스톤디자인",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "졸업 작품 기획, 개발 및 배포",
            prereqs: ["WEB_A02", "WEB_A03"],
            resources: [
              {
                type: "job",
                title: "웹 개발자 신입 채용",
                url: "https://www.naver-corp.com",
                source: "네이버",
                tags: ["Fullstack"],
              },
            ],
          },
        ],
      },
      {
        id: "mobile",
        name: "모바일 소프트웨어 트랙",
        courses: [
          {
            id: "TR_B01_MOB",
            title: "컴퓨터프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "C언어 기초",
            prereqs: [],
            resources: [],
          },
          {
            id: "MOB_M01",
            title: "객체지향언어1",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "Java 프로그래밍 기초 및 OOP 개념",
            prereqs: ["TR_B01_MOB"],
            resources: [],
          },
          {
            id: "MOB_M03",
            title: "안드로이드프로그래밍",
            grade: "2학년",
            category: "major_required",
            credit: 3,
            desc: "Android Studio 활용 앱 개발 기초",
            prereqs: ["MOB_M01"],
            resources: [
              {
                type: "doc",
                title: "Android Docs",
                url: "https://developer.android.com",
                source: "Google",
                tags: ["Kotlin"],
              },
            ],
          },
          {
            id: "MOB_A01",
            title: "고급모바일프로그래밍",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "심화 안드로이드 기능 구현",
            prereqs: ["MOB_M03"],
            resources: [],
          },
          {
            id: "MOB_CAP",
            title: "모바일 캡스톤디자인",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "모바일 앱 서비스 프로젝트",
            prereqs: ["MOB_A01"],
            resources: [],
          },
        ],
      },
      {
        id: "bigdata",
        name: "빅데이터 트랙",
        courses: [
          {
            id: "TR_B01_DATA",
            title: "컴퓨터프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "프로그래밍 입문",
            prereqs: [],
          },
          {
            id: "DATA_B01",
            title: "빅데이터기초",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "빅데이터의 개념 및 파이썬 기초",
            prereqs: [],
            resources: [],
          },
          {
            id: "DATA_M01",
            title: "데이터마이닝",
            grade: "2학년",
            category: "required",
            credit: 3,
            desc: "데이터 패턴 분석 및 추출 기법",
            prereqs: ["DATA_B01"],
            resources: [],
          },
          {
            id: "DATA_A01",
            title: "인공지능",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "머신러닝/딥러닝 기초 이론",
            prereqs: ["DATA_M01"],
            resources: [
              {
                type: "lecture",
                title: "모두를 위한 딥러닝",
                url: "https://pytorch.org",
                source: "PyTorch",
                tags: ["AI"],
              },
            ],
          },
          {
            id: "DATA_CAP",
            title: "빅데이터 캡스톤디자인",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "데이터 분석 기반 프로젝트",
            prereqs: ["DATA_A01"],
            resources: [],
          },
        ],
      },
    ],
  },
];

const INITIAL_UNIVERSITY_ID = "hansung";
const INITIAL_TRACK_ID = "web";

const CATEGORY_STYLES = {
  basic: { bg: "#FFF8E1", border: "#FFD54F" },
  common: { bg: "#FBE9E7", border: "#FF8A65" },
  required: { bg: "#E3F2FD", border: "#42A5F5" },
  major_required: { bg: "#FCE4EC", border: "#EC407A" },
  capstone: { bg: "#FFEBEA", border: "#E57373" },
};

const PROGRESS_MOCK_DATA = {
  web: 29,
  mobile: 25,
  bigdata: 40,
};

const elk = new ELK();

// ------- 레이아웃 계산 ------- //
const getLayoutedElements = async (courses) => {
  if (!courses || courses.length === 0) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];
  const map = new Map();
  courses.forEach((c) => map.set(c.id, c));

  courses.forEach((course) => {
    const stylesC = CATEGORY_STYLES[course.category] || CATEGORY_STYLES.common;

    nodes.push({
      id: course.id,
      data: { label: course.title, courseData: course },
      position: { x: 0, y: 0 },
      style: {
        backgroundColor: stylesC.bg,
        border: `2px solid ${stylesC.border}`,
        width: 150,
        padding: 0,
        borderRadius: 8,
      },
      type: "courseNode",
    });

    course.prereqs.forEach((pid, index) => {
      if (map.has(pid)) {
        edges.push({
          id: `e-${pid}-${course.id}-${index}`,
          source: pid,
          target: course.id,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed, color: "#999" },
          style: { stroke: "#ccc", strokeWidth: 2 },
        });
      }
    });
  });

  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.spacing.nodeNode": "40",
      "elk.spacing.nodeNodeBetweenLayers": "80",
      "elk.layered.layering.strategy": "NETWORK_SIMPLEX",
      "elk.padding": "[top=20,left=20,bottom=20,right=20]",
    },
    children: nodes.map((n) => ({ ...n, width: 150, height: 70 })),
    edges,
  };

  try {
    const layouted = await elk.layout(graph);
    return {
      nodes: layouted.children.map((n) => ({
        ...n,
        position: { x: n.x + 20, y: n.y + 20 },
      })),
      edges: layouted.edges,
    };
  } catch (e) {
    console.error("ELK error", e);
    let yOffset = 50;
    const perGrade = {};
    nodes.forEach((n) => {
      const grade = n.data.courseData.grade;
      if (!perGrade[grade]) perGrade[grade] = 0;
      n.position = { x: perGrade[grade] * 200, y: yOffset };
      perGrade[grade]++;
    });
    return { nodes, edges };
  }
};

// ------- 커스텀 노드 ------- //
const CustomCourseNode = ({ data, selected }) => {
  const { courseData } = data;
  const stylesC = CATEGORY_STYLES[courseData.category] || CATEGORY_STYLES.common;
  const isCompleted = false;

  return (
    <div
      style={{
        width: 150,
        height: 70,
        backgroundColor: stylesC.bg,
        border: `2px solid ${stylesC.border}`,
        borderRadius: 8,
        padding: 0,
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: selected ? "0 0 0 3px #1e88e5" : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          backgroundColor: stylesC.border,
          color: "white",
          fontSize: 10,
          padding: "2px 8px",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        {courseData.grade} ({courseData.credit}학점)
      </div>
      <div style={{ flexGrow: 1, padding: "4px 8px", textAlign: "center" }}>
        <h4
          style={{
            margin: 0,
            fontSize: 14,
            color: "#333",
            lineHeight: 1.2,
            fontWeight: "bold",
          }}
        >
          {courseData.title}
        </h4>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: isCompleted ? "#4CAF50" : "#2196F3",
          color: "white",
          fontSize: 10,
          padding: "2px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <CornerRightDown size={10} style={{ marginRight: 3 }} />
        {isCompleted ? "완료 취소" : "수강하기"}
      </button>
    </div>
  );
};

// ------- 로드맵 그래프 ------- //
const IntegratedRoadmapVisualization = ({ selectedTrack, onNodeClick }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const courses = selectedTrack?.courses || [];

  useEffect(() => {
    if (courses.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }
    setIsLoading(true);
    setSelectedNodeId(null);

    const run = async () => {
      const { nodes: ns, edges: es } = await getLayoutedElements(courses);
      setNodes(ns);
      setEdges(es);
      setIsLoading(false);
    };
    run();
  }, [courses, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ courseNode: CustomCourseNode }), []);

  const handleNodeClick = useCallback(
    (e, node) => {
      onNodeClick(node.data.courseData);
      setSelectedNodeId(node.id);
    },
    [onNodeClick]
  );

  if (isLoading) {
    return (
      <div
        style={{
          ...styles.roadmapVisualization,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Clock size={32} color="#444" style={{ marginRight: 10 }} />
        <span style={{ color: "#444" }}>그래프 레이아웃 계산 중...</span>
      </div>
    );
  }

  const mappedNodes = nodes.map((n) => ({
    ...n,
    selected: n.id === selectedNodeId,
  }));

  return (
    <ReactFlow
      nodes={mappedNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      nodeTypes={nodeTypes}
      fitView
      proOptions={{ hideAttribution: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Controls showInteractive={false} />
      <Background variant="dots" gap={16} size={1} color="#e6e6e6" />
    </ReactFlow>
  );
};

// ------- 사이드바 ------- //
const getResourceIcon = (type) => {
  switch (type) {
    case "job":
      return { icon: Briefcase, color: "#4CAF50", bg: "#E8F5E9" };
    case "lecture":
      return { icon: Monitor, color: "#9C27B0", bg: "#F3E5F5" };
    case "doc":
      return { icon: BookOpen, color: "#2196F3", bg: "#E3F2FD" };
    default:
      return { icon: Search, color: "#666", bg: "#EEE" };
  }
};

const MockSidebar = ({ selectedCourse }) => {
  return (
    <div style={styles.sidebarInner}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: 10,
          margin: "0 0 15px 0",
        }}
      >
        <h4 style={styles.sidebarTitle}>과목 상세 정보</h4>
        <div style={{ fontSize: 12, color: "#aaa" }}>로드맵에서 노드 클릭</div>
      </div>

      {selectedCourse ? (
        <div>
          <h3
            style={{
              color: "#333",
              margin: "0 0 5px 0",
              fontSize: 18,
            }}
          >
            {selectedCourse.title}
          </h3>
          <p style={{ fontSize: 14, color: "#666" }}>{selectedCourse.desc}</p>

          <div
            style={{
              display: "flex",
              gap: 15,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
              <BookOpen
                size={14}
                style={{ marginRight: 5, verticalAlign: "middle" }}
              />
              {selectedCourse.credit}학점
            </p>
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
              <CornerRightDown
                size={14}
                style={{ marginRight: 5, verticalAlign: "middle" }}
              />
              {selectedCourse.category === "major_required"
                ? "Advanced"
                : "Basic/Common"}
            </p>
          </div>

          <h4 style={{ margin: "20px 0 10px 0", fontWeight: "bold" }}>
            🔗 관련 리소스
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {selectedCourse.resources && selectedCourse.resources.length > 0 ? (
              selectedCourse.resources.map((res, idx) => {
                const { icon: Icon, color, bg } = getResourceIcon(res.type);
                return (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.resourceCard}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: bg,
                          padding: 10,
                          borderRadius: 8,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={24} color={color} />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          {res.title}
                        </p>
                        <p
                          style={{
                            margin: "2px 0 5px 0",
                            fontSize: 12,
                            color: "#888",
                          }}
                        >
                          {res.source}
                        </p>
                      </div>
                      <span style={{ fontSize: 12, color: "#aaa" }}>↗️</span>
                    </div>
                  </a>
                );
              })
            ) : (
              <p style={{ color: "#888", marginTop: 20 }}>
                제공된 학습 리소스가 없습니다.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p style={{ color: "#888", marginTop: 20 }}>
          로드맵에서 과목 노드를 클릭하면 상세 정보가 여기에 표시됩니다.
        </p>
      )}
    </div>
  );
};

// ========================= 메인 컴포넌트 ========================= //
export default function RoadmapPage() {
  const navigate = useNavigate();

  const [selectedUniversityId] = useState(INITIAL_UNIVERSITY_ID);
  const [currentViewingTrackId, setCurrentViewingTrackId] = useState(
    INITIAL_TRACK_ID
  );
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);

  const currentUniversityData = UNIVERSITIES.find(
    (u) => u.id === selectedUniversityId
  );

  const currentTracks = useMemo(() => {
    const uniTracks = currentUniversityData?.tracks || [];
    const allTrack = { id: "all", name: "전체 보기" };
    return [allTrack, ...uniTracks];
  }, [currentUniversityData]);

  const selectedTrack = useMemo(() => {
    if (!currentUniversityData) return null;
    if (currentViewingTrackId === "all") {
      return {
        id: "all",
        name: "전체 보기",
        courses: currentUniversityData.tracks.flatMap((t) => t.courses),
      };
    }
    return currentUniversityData.tracks.find(
      (t) => t.id === currentViewingTrackId
    );
  }, [currentViewingTrackId, currentUniversityData]);

  const totalCourses =
    currentUniversityData?.tracks.flatMap((t) => t.courses).length || 0;
  const completedCourses = Math.floor(totalCourses * 0.12);
  const progressPercent =
    totalCourses === 0
      ? 0
      : Math.floor((100 * completedCourses) / totalCourses);

  const handleTrackSelect = (trackId) => {
    setCurrentViewingTrackId(trackId);
    setSelectedCourseDetail(null);
  };

  const PROGRESS = PROGRESS_MOCK_DATA;

  return (
    <main className="page-main">
      <div style={styles.cardWrapper}>
        {/* 뒤로가기 버튼 - 텍스트 화살표 */}
        <button
          className="back-button"
          onClick={() => navigate("/select")}
          style={{ marginBottom: 16 }}
        >
          ← 로드맵 / 시뮬레이션 선택으로 돌아가기
        </button>

        {/* 상단 헤더 */}
        <header style={styles.header}>
          <div style={styles.leftSection}>
            <h1 style={styles.pageTitle}>커리큘럼 로드맵</h1>
            <span style={styles.universityNameBox}>
              <Home size={16} color="#1e88e5" style={{ marginRight: 5 }} />
              {currentUniversityData?.name || "학교"}
            </span>
          </div>

          <div style={styles.rightSection}>
            {/* 진행도만 남기고 학교 선택 박스는 제거 */}
            <div style={styles.progressBox}>
              <p style={styles.progressPercent}>{progressPercent}%</p>
              <p style={styles.progressText}>
                ({completedCourses} / {totalCourses})
              </p>
              <div style={styles.progressBarWrapper}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 트랙 탭 */}
        <nav style={styles.trackNav}>
          {currentTracks.map((track) => (
            <button
              key={track.id}
              style={{
                ...styles.trackButton,
                ...(track.id === "all" ? styles.trackButtonAll : {}),
                ...(currentViewingTrackId === track.id
                  ? styles.activeTrack
                  : {}),
              }}
              onClick={() => handleTrackSelect(track.id)}
            >
              {track.name}
              {track.id !== "all" && (
                <span
                  style={{
                    ...styles.trackProgressText,
                    backgroundColor:
                      currentViewingTrackId === track.id ? "#546e7a" : "#fff",
                    color:
                      currentViewingTrackId === track.id ? "white" : "#1e88e5",
                  }}
                >
                  {PROGRESS[track.id] || 0}%
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* 그래프 + 사이드바 */}
        <div style={styles.mainContentArea}>
          <div style={styles.roadmapVisualization}>
            <IntegratedRoadmapVisualization
              selectedTrack={selectedTrack}
              onNodeClick={setSelectedCourseDetail}
            />
          </div>
          <div style={styles.sidebarContainer}>
            <MockSidebar selectedCourse={selectedCourseDetail} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ========================= 스타일 ========================= //
const styles = {
  cardWrapper: {
    maxWidth: 1100,
    margin: "40px auto 60px",
    background: "#ffffff",
    borderRadius: 32,
    padding: "32px 40px 44px",
    boxShadow: "0 25px 60px rgba(15,23,42,0.16)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0 15px",
    borderBottom: "1px solid #eee",
    marginBottom: 10,
  },
  leftSection: { display: "flex", alignItems: "center", gap: 16 },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
    color: "#111827",
  },
  universityNameBox: {
    fontSize: 14,
    color: "#1e88e5",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "#f9fafb",
    padding: "6px 10px",
    borderRadius: 999,
  },
  rightSection: { display: "flex", alignItems: "center", gap: 12 },
  progressBox: {
    backgroundColor: "#e6f0ff",
    border: "1px solid #cce0ff",
    borderRadius: 12,
    padding: "8px 12px",
    width: 120,
    textAlign: "center",
  },
  progressText: { color: "#4b5563", fontSize: 11, margin: 0 },
  progressPercent: {
    fontWeight: "bold",
    color: "#1e88e5",
    fontSize: 18,
    margin: 0,
  },
  progressBarWrapper: {
    height: 4,
    backgroundColor: "#cce0ff",
    borderRadius: 999,
    width: "100%",
    marginTop: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#1e88e5",
    borderRadius: 999,
    transition: "width 0.5s",
  },
  trackNav: {
    display: "flex",
    gap: 10,
    padding: "14px 0",
    borderBottom: "1px solid #eee",
    marginBottom: 16,
    overflowX: "auto",
  },
  trackButton: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: 13,
    color: "#4b5563",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  trackButtonAll: {
    backgroundColor: "#37474f",
    borderColor: "#37474f",
    color: "white",
    fontWeight: "bold",
  },
  activeTrack: {
    backgroundColor: "#37474f",
    color: "white",
    borderColor: "#37474f",
    fontWeight: "bold",
    boxShadow: "0 0 0 2px #37474f",
  },
  trackProgressText: {
    fontSize: 11,
    padding: "2px 6px",
    borderRadius: 999,
  },
  mainContentArea: {
    display: "flex",
    gap: 20,
    marginTop: 8,
    minHeight: 360,
  },
  roadmapVisualization: {
    flex: 3,
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
  },
  sidebarContainer: { flex: 1, minWidth: 260 },
  sidebarInner: {
    padding: 15,
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    height: "100%",
  },
  sidebarTitle: {
    margin: 0,
    color: "#111827",
    fontSize: 14,
    fontWeight: 700,
  },
  resourceCard: {
    display: "block",
    padding: "10px 10px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    textDecoration: "none",
  },
};
