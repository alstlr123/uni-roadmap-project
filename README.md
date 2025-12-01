# 🎓 Uni-Roadmap Project: 대학 커리큘럼 로드맵 시각화 시스템

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) 
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 🚀 프로젝트 개요 (Project Overview)

**Uni-Roadmap**은 대학생들이 복잡한 전공 커리큘럼과 트랙별 이수 요구 사항을 **직관적인 시각화 로드맵**으로 쉽게 이해하고 관리할 수 있도록 돕는 웹 애플리케이션입니다. 선수 과목 관계를 명확히 파악하고 개인의 진도율을 추적하여 체계적인 수강 계획을 수립할 수 있습니다.

### 주요 기능

* **학교 검색 및 선택:** 랜딩 페이지에서 원하는 대학교의 커리큘럼을 빠르게 검색하고 선택할 수 있습니다.
* **인터랙티브 로드맵:** **React Flow**를 활용하여 과목 간의 선수-후수 관계를 그래프 형태로 명확하게 시각화합니다.
* **트랙별 필터링:** 웹 공학, 모바일 SW, 빅데이터 등 트랙별로 로드맵을 분리하여 집중적인 학습 경로를 제공합니다.
* **진도율 추적:** 수강 완료한 과목을 체크하여 전체 이수율을 실시간으로 계산하고 대시보드에서 보여줍니다.
* **과목 상세 정보:** 과목 노드 클릭 시, 강의 개요, 학점, 관련 외부 자료 등의 상세 정보를 제공합니다.

---

## ⚙️ 기술 스택 (Technology Stack)

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | `React` | 사용자 인터페이스 구축을 위한 핵심 라이브러리 |
| **Styling** | `Tailwind CSS` | 빠르고 효율적인 반응형 디자인 및 스타일링 |
| **Bundling** | `Vite` | 초고속 개발 환경 및 번들링 |
| **Graph** | `React Flow` | 노드 기반의 인터랙티브 로드맵 시각화 |
| **Layout** | `ELK.js` | 그래프 노드를 자동으로 정렬하는 레이아웃 알고리즘 적용 |
| **Icons** | `Lucide React` | 현대적이고 깔끔한 아이콘 라이브러리 |

---

## 🛠️ 설치 및 실행 (Setup & Run)

이 프로젝트는 `Node.js` 및 `npm` 또는 `yarn`이 설치되어 있어야 합니다.

```bash
# 1. 저장소 복제
git clone [프로젝트_GitHub_주소]
cd uni-roadmap-new

# 2. 의존성 설치
npm install
# 또는 yarn install

# 3. 개발 서버 실행
npm run dev
# 또는 yarn dev