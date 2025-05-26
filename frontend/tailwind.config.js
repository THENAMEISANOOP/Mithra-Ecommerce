// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
           500: 'red', // blue-500 as default
          600: '#2563EB', // primary-600 used in the component
          700: '#1D4ED8' 
        },
      },
    },
  },
  plugins: [],
}
