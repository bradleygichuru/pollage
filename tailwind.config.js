/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {fontFamily: {
      'jetbrains': ['JetBrains Mono', 'monospace'] ,
      'nuto':['Nunito Sans', 'sans-serif']
    },},
  },
  daisyui: {
    
  },
  plugins: [require("daisyui")],
}
