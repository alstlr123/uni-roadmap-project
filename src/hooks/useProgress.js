import { useState, useEffect } from 'react';

export const useProgress = () => {
  // 1. 로컬 스토리지에서 데이터 불러오기 (없으면 빈 배열)
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('my_courses');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. completed 상태가 변할 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('my_courses', JSON.stringify(completed));
  }, [completed]);

  // 3. 토글 함수 (이미 있으면 삭제, 없으면 추가)
  const toggleCourse = (id) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return { completed, toggleCourse };
};