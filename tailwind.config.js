/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (logo-inspired)
        gold: {
          DEFAULT: "#4A5D73",
          light: "#6B7F95",
          deep: "#3B4A5A",
        },
        page: {
          DEFAULT: "#F8FAFC",
        },
        text: {
          main: "#1F2937",
          secondary: "#6B7280",
        },
        accent: {
          orange: "#F59E0B",
          emerald: "#10B981",
        },
      },
      boxShadow: {
        brand: "0 1px 2px rgba(31, 41, 55, 0.06), 0 12px 30px rgba(31, 41, 55, 0.08)",
        accent: "0 14px 40px rgba(245, 158, 11, 0.22)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(80% 70% at 50% 0%, rgba(74,93,115,0.22) 0%, rgba(0,0,0,0) 55%)",
      },
    },
  },
  plugins: [],
}

