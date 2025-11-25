// 데이터를 넣으면 화살표 리스트를 반환하는 함수
export const getEdges = (courses) => {
  const edges = [];
  
  courses.forEach(course => {
    // 선수과목(prereqs)이 있다면
    if (course.prereqs && course.prereqs.length > 0) {
      course.prereqs.forEach(prereqId => {
        // [시작: 선수과목] -> [끝: 현재과목]
        edges.push({
          from: prereqId,
          to: course.id
        });
      });
    }
  });
  
  return edges; 
  // 결과 예시: [{from: 'TR_B01', to: 'CS_C01'}, {from: 'WEB_M01', to: 'WEB_M02'} ...]
};