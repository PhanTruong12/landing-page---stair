/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Premium dark palette
        gold: {
          DEFAULT: "#EA580C",
          light: "#F07A3D",
          deep: "#D64300",
        },
        page: {
          DEFAULT: "#F8FAFC",
        },
        text: {
          main: "#1F2937",
          secondary: "#6B7280",
        },
        accent: {
          orange: "#EA580C",
          emerald: "#10B981",
        },
        zinc: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1A6",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          850: "#1F1F23",
          900: "#18181B",
          950: "#09090B",
        },
      },
      boxShadow: {
        brand: "0 1px 2px rgba(31, 41, 55, 0.06), 0 12px 30px rgba(31, 41, 55, 0.08)",
        accent: "0 14px 40px rgba(234, 88, 12, 0.25)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(80% 70% at 50% 0%, rgba(234, 88, 12, 0.15) 0%, rgba(0,0,0,0) 55%)",
      },
    },
  },
  plugins: [],
}

