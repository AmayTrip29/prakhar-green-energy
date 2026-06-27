/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1280px",
      },
    },
    extend: {
      spacing: {
        13: "3.25rem",
      },
      colors: {
        // Brand palette — derived directly from the Prakhar preview site
        forest: {
          DEFAULT: "#0B2E1F", // deep forest green — header/footer/dark sections
          50: "#E7F2EC",
          100: "#C8E3D4",
          200: "#9AC8AE",
          300: "#6AAB87",
          400: "#3D8C62",
          500: "#1F6E45",
          600: "#15573A",
          700: "#10432D",
          800: "#0B2E1F",
          900: "#071F15",
        },
        leaf: {
          DEFAULT: "#1E9E5A", // primary CTA green
          50: "#EAFBF1",
          100: "#CFF5DF",
          200: "#9FEBC0",
          300: "#6BDB9D",
          400: "#3BC97D",
          500: "#1E9E5A",
          600: "#188048",
          700: "#14653A",
          800: "#114F2F",
          900: "#0D3D25",
        },
        amber: {
          DEFAULT: "#F2B229", // gold accent — PrakharShield, secondary CTA
          50: "#FEF8E9",
          100: "#FCEDC2",
          200: "#F9DD8F",
          300: "#F6CC5C",
          400: "#F4BD3F",
          500: "#F2B229",
          600: "#D99A16",
          700: "#AD7912",
          800: "#825A0E",
          900: "#5C3F0A",
        },
        ink: {
          DEFAULT: "#10241A", // near-black text on light backgrounds
          muted: "#4B5D55",
        },
        sand: "#F6F8F5", // off-white section background
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-sora)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(11, 46, 31, 0.08)",
        card: "0 2px 12px -2px rgba(11, 46, 31, 0.10)",
        lift: "0 12px 32px -8px rgba(11, 46, 31, 0.18)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
