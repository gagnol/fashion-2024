import type { Config } from 'tailwindcss'
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
      screens: {
        'sm': '640px',   // Small devices (landscape phones, 640px and up)
        'md': '768px',   // Medium devices (tablets, 768px and up)
        'lg': '1024px',  // Large devices (desktops, 1024px and up)
        'xl': '1280px',  // Extra large devices (large desktops, 1280px and up)
        '2xl': '1536px', // 2XL devices (larger desktops, 1536px and up)
      },
    },
  },
  variants: {
    extend: {
     display: ['responsive'],
      margin: ['responsive'],
      padding: ['responsive'],
         },
  },
  plugins: [require('tailwind-scrollbar-hide')],
 
}
export default config
