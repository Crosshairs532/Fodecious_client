/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'f-btn': '#AF491Cff',
      'f-bg': '#FEFEFEff',
      'f-footer': '#3C0D0Dff',
      'f-title': '#6C4C4Cff',
      'f-icon': '#FFE7D5ff',
      'f-error': '#FF0000',
      'f-green': '#32CD32'
    },
    extend: {
      fontFamily: {
        'play-serif': ['Playfair Display', 'serif'],
        'Nunito': ['Nunito', 'sans-serif']
      }

    },
  },
  plugins: [require("daisyui")],
}

