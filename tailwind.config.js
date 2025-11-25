/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Tailwind가 src 폴더 내 모든 .js, .jsx 파일을 검색하도록 지정
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}