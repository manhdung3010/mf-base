module.exports = {
  content: [
    './apps/**/src/**/*.{js,jsx,ts,tsx}',
    './shared/**/src/**/*.{js,jsx,ts,tsx}',
    './apps/**/public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}; 