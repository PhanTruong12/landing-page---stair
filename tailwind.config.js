/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        card: "16px",
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        /** Tiêu đề — phong cách gallery / editorial */
        display: [
          '"Syne"',
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        display: [
          "clamp(2.1rem, 1.2rem + 4vw, 3.6rem)",
          { lineHeight: "1.02", letterSpacing: "-0.04em" },
        ],
        heading: [
          "clamp(1.625rem, 1.2rem + 1.4vw, 2.375rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em" },
        ],
      },
      colors: {
        gold: {
          DEFAULT: "#2563EB",
          light: "#60A5FA",
          deep: "#1D4ED8",
        },
        marble: {
          DEFAULT: "#F8FAFC",
          muted: "#EEF2FF",
          card: "#FFFFFF",
        },
        charcoal: {
          DEFAULT: "#0F172A",
          soft: "#334155",
        },
        /** Nền tối — section contrast */
        ink: {
          DEFAULT: "#0B1220",
          soft: "#111B2E",
          muted: "#1B243B",
        },
        page: {
          DEFAULT: "#EEF2FF",
        },
        text: {
          main: "#0B1220",
          secondary: "#475569",
        },
        accent: {
          bronze: "#1D4ED8",
          bronzeDark: "#1E3A8A",
          emerald: "#06B6D4",
          orange: "#1D4ED8",
        },
      },
      boxShadow: {
        brand:
          "0 1px 2px rgba(18, 17, 16, 0.05), 0 12px 40px rgba(18, 17, 16, 0.06)",
        accent: "0 16px 40px -8px rgba(18, 17, 16, 0.35)",
        soft: "0 2px 10px rgba(18, 17, 16, 0.04)",
        card: "0 4px 28px rgba(18, 17, 16, 0.07), 0 1px 2px rgba(18, 17, 16, 0.04)",
        elevated:
          "0 20px 50px -12px rgba(18, 17, 16, 0.14), 0 8px 24px rgba(18, 17, 16, 0.06)",
        float: "0 8px 32px -6px rgba(18, 17, 16, 0.1), 0 2px 8px rgba(18, 17, 16, 0.04)",
        cardHover:
          "0 28px 60px -16px rgba(18, 17, 16, 0.2), 0 12px 28px rgba(18, 17, 16, 0.08)",
        heroCta: "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(80% 60% at 50% 0%, rgba(37,99,235,0.16) 0%, transparent 55%)",
        "mesh-page":
          "radial-gradient(80% 50% at 50% -20%, rgba(15,23,42,0.05) 0%, transparent 50%), radial-gradient(60% 40% at 100% 0%, rgba(15,23,42,0.03) 0%, transparent 45%)",
        "section-calc":
          "linear-gradient(168deg, #E0E7FF 0%, #F8FAFC 45%, #E2E8F0 100%)",
        "section-calc-dark":
          "linear-gradient(165deg, #111B2E 0%, #0B1220 48%, #05070B 100%)",
        "section-gallery":
          "radial-gradient(ellipse 90% 70% at 50% -15%, rgba(37,99,235,0.12) 0%, transparent 55%), linear-gradient(180deg, #F8FAFC 0%, #E8F1FF 50%, #FFFFFF 100%)",
        "section-process":
          "radial-gradient(ellipse 80% 50% at 0% 0%, rgba(6,182,212,0.08) 0%, transparent 50%), linear-gradient(145deg, #FFFFFF 0%, #E0E7FF 48%, #F1F5F9 100%)",
        "section-lead":
          "radial-gradient(ellipse 75% 60% at 50% 110%, rgba(37,99,235,0.10) 0%, transparent 55%), linear-gradient(185deg, #FFFFFF 0%, #E0E7FF 55%, #F1F5F9 100%)",
      },
    },
  },
  plugins: [],
}
