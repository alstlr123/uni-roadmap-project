export const UNIVERSITIES = [
  {
    id: "hansung",
    name: "한성대학교",
    tracks: [
      // =======================================================
      // [Track 1] 웹 공학 트랙 (파란색/분홍색 흐름)
      // =======================================================
      {
        id: "web",
        name: "웹공학 트랙",
        courses: [
          // --- 1학년 (트랙 기초 - 노란색) ---
          {
            id: "TR_B01",
            title: "컴퓨터프로그래밍", 
            grade: "1학년",
            category: "basic", // 노란색 (트랙기초)
            credit: 3,
            desc: "C언어 기초 및 프로그래밍 입문",
            prereqs: [],
            resources: []
          },
          {
            id: "TR_B02",
            title: "웹프로그래밍기초", 
            grade: "1학년",
            category: "basic", // 노란색
            credit: 3,
            desc: "HTML/CSS 및 웹 표준의 이해",
            prereqs: [],
            resources: [{ type: "doc", title: "MDN Web Docs", url: "https://developer.mozilla.org/ko/", source: "MDN", tags: ["HTML", "CSS"] }]
          },

          // --- 2학년 (전공 공통 & 트랙 필수) ---
          {
            id: "CS_C01",
            title: "자료구조", // 이미지의 '자료구조' (주황색)
            grade: "2학년",
            category: "common", // 전공선택(공통)
            credit: 3,
            desc: "배열, 리스트, 스택, 큐, 트리 등 데이터 구조 학습",
            prereqs: ["TR_B01"], // 컴퓨터프로그래밍 -> 자료구조
            resources: [
               { type: "lecture", title: "자료구조와 알고리즘", url: "https://www.inflearn.com/", source: "인프런", tags: ["CS지식"] },
               { type: "job", title: "백엔드 개발자", url: "https://www.wanted.co.kr", source: "원티드", tags: ["Java", "Python"] }
            ]
          },
          {
            id: "WEB_M01",
            title: "웹프로그래밍", // 이미지의 파란색 테두리
            grade: "2학년",
            category: "required", // 트랙 선택필수 (파랑)
            credit: 3,
            desc: "JavaScript 기초 및 DOM 조작, 프론트엔드 입문",
            prereqs: ["TR_B02"], // 웹프로그래밍기초 -> 웹프로그래밍 (화살표 반영)
            resources: [{ type: "doc", title: "Modern JS Tutorial", url: "https://ko.javascript.info/", source: "JS Info", tags: ["JS"] }]
          },
          {
            id: "WEB_M02",
            title: "웹서버프로그래밍", // 이미지의 파란색 테두리
            grade: "2학년",
            category: "required", // 트랙 선택필수
            credit: 3,
            desc: "Node.js/Express 또는 JSP를 이용한 백엔드 기초",
            prereqs: ["WEB_M01"], // 웹프로그래밍 -> 웹서버프로그래밍
            resources: []
          },
          {
            id: "CS_C02",
            title: "데이터베이스", // 이미지의 주황색(공통)
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "관계형 데이터베이스 설계 및 SQL",
            prereqs: [],
            resources: []
          },

          // --- 3학년 (트랙 심화) ---
          {
            id: "WEB_A01",
            title: "웹프레임워크1", // 이미지의 분홍색 (트랙필수)
            grade: "3학년",
            category: "major_required", // 트랙필수 (분홍)
            credit: 3,
            desc: "React.js를 활용한 SPA 개발 심화",
            prereqs: ["WEB_M02"], // 웹서버프로그래밍 -> 웹프레임워크1
            resources: [
              { type: "lecture", title: "React 완벽 가이드", url: "https://react.dev", source: "공식문서", tags: ["React"] },
              { type: "job", title: "프론트엔드 엔지니어", url: "https://toss.im/career", source: "토스", tags: ["React", "Next.js"] }
            ]
          },
          {
            id: "WEB_A02",
            title: "웹프레임워크2", // 이미지의 분홍색
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "상태관리(Redux/Recoil) 및 성능 최적화",
            prereqs: ["WEB_A01"], // 웹프레임워크1 -> 웹프레임워크2
            resources: []
          },
          {
            id: "WEB_A03",
            title: "클라우드컴퓨팅", // 이미지의 분홍색
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "AWS/Azure 기초 및 배포 실습",
            prereqs: [],
            resources: [{ type: "doc", title: "AWS 기초", url: "https://aws.amazon.com", source: "AWS", tags: ["DevOps"] }]
          },

          // --- 4학년 (캡스톤 - 빨간 하트) ---
          {
            id: "WEB_CAP",
            title: "웹공학 캡스톤디자인",
            grade: "4학년",
            category: "capstone", // 캡스톤 (빨강)
            credit: 3,
            desc: "졸업 작품 기획, 개발 및 배포",
            prereqs: ["WEB_A02"], // 웹프레임워크2 수강 후 권장
            resources: [{ type: "job", title: "웹 개발자 신입 채용", url: "https://www.naver-corp.com", source: "네이버", tags: ["Fullstack"] }]
          }
        ]
      },

      // =======================================================
      // [Track 2] 모바일 SW 트랙 (회색/보라색 흐름)
      // =======================================================
      {
        id: "mobile",
        name: "모바일 SW 트랙",
        courses: [
          // --- 1학년 & 기초 ---
          {
            id: "TR_B01", // 공통 기초는 ID 동일하게 유지
            title: "컴퓨터프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "C언어 기초",
            prereqs: [],
            resources: []
          },
          
          // --- 2학년 ---
          {
            id: "MOB_M01",
            title: "객체지향언어1", // 자바
            grade: "2학년",
            category: "common", // 공통
            credit: 3,
            desc: "Java 프로그래밍 기초 및 OOP 개념",
            prereqs: ["TR_B01"],
            resources: []
          },
          {
            id: "MOB_M02",
            title: "모바일&스마트시스템", // 이미지 회색
            grade: "2학년",
            category: "common", // 이미지상 회색(일반선택)
            credit: 3,
            desc: "모바일 환경의 이해 및 센서 활용",
            prereqs: [],
            resources: []
          },
          {
            id: "MOB_M03",
            title: "안드로이드프로그래밍", // 이미지 보라색
            grade: "2학년",
            category: "major_required", // 트랙필수
            credit: 3,
            desc: "Android Studio 활용 앱 개발 기초",
            prereqs: ["MOB_M01"], // 객체지향언어 -> 안드로이드 (논리적 연결)
            resources: [{ type: "doc", title: "Android Docs", url: "https://developer.android.com", source: "Google", tags: ["Kotlin"] }]
          },

          // --- 3학년 ---
          {
            id: "MOB_A01",
            title: "고급모바일프로그래밍", // 이미지 보라색
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "심화 안드로이드 기능 구현",
            prereqs: ["MOB_M03"], // 안드로이드 -> 고급모바일
            resources: []
          },
          {
            id: "MOB_A02",
            title: "iOS프로그래밍", // 이미지 보라색
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "Swift 및 Xcode 활용 iOS 앱 개발",
            prereqs: [],
            resources: []
          },

          // --- 4학년 ---
          {
            id: "MOB_CAP",
            title: "모바일 캡스톤디자인",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "모바일 앱 서비스 프로젝트",
            prereqs: ["MOB_A01"],
            resources: []
          }
        ]
      },

      // =======================================================
      // [Track 3] 빅 데이터 트랙 (연보라/노란색 흐름)
      // =======================================================
      {
        id: "bigdata",
        name: "빅데이터 트랙",
        courses: [
          // --- 기초 ---
          {
            id: "TR_B01",
            title: "컴퓨터프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "프로그래밍 입문",
            prereqs: [],
            resources: []
          },
          {
            id: "MATH_01",
            title: "확률및통계",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "데이터 분석을 위한 수학적 기초",
            prereqs: [],
            resources: []
          },
          
          // --- 2학년 ---
          {
            id: "DATA_B01",
            title: "빅데이터기초", // 이미지 연보라
            grade: "2학년",
            category: "common", // 이미지상 일반선택
            credit: 3,
            desc: "빅데이터의 개념 및 파이썬 기초",
            prereqs: [],
            resources: []
          },
          {
            id: "DATA_M01",
            title: "데이터마이닝", // 이미지 파란테두리
            grade: "2학년",
            category: "required", // 선택필수
            credit: 3,
            desc: "데이터 패턴 분석 및 추출 기법",
            prereqs: ["DATA_B01"],
            resources: []
          },
          
          // --- 3학년 ---
          {
            id: "CS_C02", 
            title: "데이터베이스", // 공통과목이지만 빅데이터 중요
            grade: "3학년",
            category: "required", // 빅데이터 트랙에서는 필수로 간주
            credit: 3,
            desc: "SQL 및 데이터 모델링",
            prereqs: [],
            resources: []
          },
          {
            id: "DATA_A01",
            title: "인공지능", // 이미지 연보라
            grade: "3학년",
            category: "major_required", // 트랙필수
            credit: 3,
            desc: "머신러닝/딥러닝 기초 이론",
            prereqs: ["DATA_B01"],
            resources: [{ type: "lecture", title: "모두를 위한 딥러닝", url: "https://pytorch.org", source: "PyTorch", tags: ["AI"] }]
          },

          // --- 4학년 ---
          {
            id: "DATA_CAP",
            title: "빅데이터 캡스톤디자인",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "데이터 분석 기반 프로젝트",
            prereqs: ["DATA_A01"],
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: "korea",
    name: "한국대학교",
    tracks: [
      // -------------------------------------------------------
      // [Track 1] 인공지능(AI) 트랙
      // 특징: 수학 기초 -> 머신러닝 -> 딥러닝으로 이어지는 깊은 연계
      // -------------------------------------------------------
      {
        id: "ai_track",
        name: "인공지능 트랙",
        courses: [
          // 1학년: 기초 다지기
          {
            id: "K_AI_01",
            title: "파이썬 프로그래밍",
            grade: "1학년",
            category: "basic", // 노란색
            credit: 3,
            desc: "데이터 분석을 위한 Python 기초 문법",
            prereqs: [],
            resources: [{ type: "doc", title: "Python 공식문서", url: "https://docs.python.org", source: "Python", tags: ["Basic"] }]
          },
          {
            id: "K_AI_02",
            title: "인공지능 수학",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "선형대수학 및 확률통계 기초",
            prereqs: [],
            resources: []
          },

          // 2학년: 핵심 이론
          {
            id: "K_AI_03",
            title: "머신러닝 개론",
            grade: "2학년",
            category: "major_required", // 분홍색 (필수)
            credit: 3,
            desc: "지도학습, 비지도학습 알고리즘의 이해",
            prereqs: ["K_AI_01", "K_AI_02"], // 파이썬과 수학 둘 다 들어야 함
            resources: [{ type: "lecture", title: "Andrew Ng의 ML 강의", url: "https://www.coursera.org", source: "Coursera", tags: ["ML"] }]
          },
          {
            id: "K_AI_04",
            title: "데이터 시각화",
            grade: "2학년",
            category: "common", // 회색 (일반)
            credit: 3,
            desc: "Matplotlib, Seaborn 활용 데이터 표현",
            prereqs: ["K_AI_01"],
            resources: []
          },

          // 3학년: 심화 및 응용
          {
            id: "K_AI_05",
            title: "딥러닝 심화",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "CNN, RNN 및 최신 딥러닝 모델 구현",
            prereqs: ["K_AI_03"], // 머신러닝 -> 딥러닝
            resources: []
          },
          {
            id: "K_AI_06",
            title: "컴퓨터 비전",
            grade: "3학년",
            category: "required", // 파란색 (선택)
            credit: 3,
            desc: "이미지 처리 및 객체 인식 기술",
            prereqs: ["K_AI_05"],
            resources: []
          },

          // 4학년: 프로젝트
          {
            id: "K_AI_CAP",
            title: "AI 캡스톤디자인",
            grade: "4학년",
            category: "capstone", // 빨간색
            credit: 3,
            desc: "AI 모델 서빙 및 서비스 개발",
            prereqs: ["K_AI_05"],
            resources: [{ type: "job", title: "AI 리서처 채용", url: "https://www.kakao.com", source: "Kakao Brain", tags: ["Research"] }]
          }
        ]
      },

      // -------------------------------------------------------
      // [Track 2] 게임 개발 트랙
      // 특징: C# -> 유니티 -> 그래픽스로 이어지는 실무형
      // -------------------------------------------------------
      {
        id: "game_track",
        name: "게임 개발 트랙",
        courses: [
          // 1학년
          {
            id: "K_GM_01",
            title: "C# 프로그래밍",
            grade: "1학년",
            category: "basic",
            credit: 3,
            desc: "게임 스크립팅을 위한 C# 기초",
            prereqs: [],
            resources: []
          },

          // 2학년
          {
            id: "K_GM_02",
            title: "유니티 엔진 기초",
            grade: "2학년",
            category: "major_required",
            credit: 3,
            desc: "Unity 엔진 인터페이스 및 2D 게임 제작",
            prereqs: ["K_GM_01"], // C# -> 유니티
            resources: [{ type: "doc", title: "Unity Manual", url: "https://docs.unity3d.com", source: "Unity", tags: ["Engine"] }]
          },
          {
            id: "K_GM_03",
            title: "게임 기획",
            grade: "2학년",
            category: "common",
            credit: 3,
            desc: "레벨 디자인 및 게임 시스템 설계",
            prereqs: [],
            resources: []
          },

          // 3학년
          {
            id: "K_GM_04",
            title: "3D 게임 프로그래밍",
            grade: "3학년",
            category: "major_required",
            credit: 3,
            desc: "3D 공간 수학 및 물리 엔진 활용",
            prereqs: ["K_GM_02"], // 유니티 기초 -> 3D
            resources: []
          },
          {
            id: "K_GM_05",
            title: "컴퓨터 그래픽스",
            grade: "3학년",
            category: "required",
            credit: 3,
            desc: "OpenGL/DirectX 렌더링 파이프라인 이해",
            prereqs: ["K_GM_01"],
            resources: []
          },

          // 4학년
          {
            id: "K_GM_CAP",
            title: "게임 출시 프로젝트",
            grade: "4학년",
            category: "capstone",
            credit: 3,
            desc: "게임 스토어 출시 및 배포 실습",
            prereqs: ["K_GM_04"],
            resources: [{ type: "job", title: "게임 클라이언트 개발", url: "https://www.nexon.com", source: "넥슨", tags: ["Client"] }]
          }
        ]
      }
    ]
  }// <--- 나중에 학교 또 추가하려면 여기 콤마 찍고 계속 추가

];