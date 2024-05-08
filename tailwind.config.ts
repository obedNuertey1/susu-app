import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderColor:{
        'project-blue': '#38A1FF'
      },
      colors:{
        'project-blue': '#38A1FF',
        'orangered': 'orangered'
      },
      backgroundColor:{
        'project-blue': '#38A1FF'
      }
    },
  },
  plugins: [require("@tailwindcss/typography") ,require("daisyui")],
  daisyui: {
    themes: ["light", "dark",
    {
      mytheme: {
      
"primary": "#db00ff",
      
"secondary": "#ff6900",
      
"accent": "#00fea8",
      
"neutral": "#fff",
      
"base-100": "#262626",
      
"info": "#38A1FF",
      
"success": "#00f56e",
      
"warning": "#ff8b00",
      
"error": "#ff3064",
      },
    },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  }
}
export default config
