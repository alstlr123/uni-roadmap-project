import React, { createContext, useState, useContext } from 'react';

// Context 생성
const AppContext = createContext();

// Provider 컴포넌트 (앱 전체를 감쌀 껍데기)
export const AppProvider = ({ children }) => {
  const [selectedUniv, setSelectedUniv] = useState(null);

  return (
    <AppContext.Provider value={{ selectedUniv, setSelectedUniv }}>
      {children}
    </AppContext.Provider>
  );
};

// 팀원들이 쉽게 쓸 수 있게 만든 커스텀 훅
export const useApp = () => useContext(AppContext);