import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Background colors for all shades
    {
      pattern:
        /bg-(red|green|blue|yellow|purple|pink|indigo|gray|slate|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Text colors for all shades
    {
      pattern:
        /text-(red|green|blue|yellow|purple|pink|indigo|gray|slate|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Border colors for all shades
    {
      pattern:
        /border-(red|green|blue|yellow|purple|pink|indigo|gray|slate|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Gradient colors
    {
      pattern:
        /from-(red|green|blue|yellow|purple|pink|indigo|gray|slate|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /to-(red|green|blue|yellow|purple|pink|indigo|gray|slate|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Makkah theme colors
    {
      pattern:
        /bg-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /text-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /from-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /to-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Positioning classes
    {
      pattern:
        /^(left|right|top|bottom)-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    {
      pattern:
        /^(inset|inset-x|inset-y)-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    // Transform classes
    {
      pattern:
        /^(translate-x|translate-y|-translate-x|-translate-y)-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    // Z-index classes
    {
      pattern: /^z-(0|10|20|30|40|50|auto)$/,
    },
    // Padding classes
    {
      pattern:
        /^p(l|r|t|b|x|y)?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    // Margin classes
    {
      pattern:
        /^m(l|r|t|b|x|y)?-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    // Common utility classes
    "absolute",
    "relative",
    "fixed",
    "sticky",
    "block",
    "inline",
    "inline-block",
    "flex",
    "inline-flex",
    "grid",
    "inline-grid",
    "hidden",
    "visible",
    "invisible",
    "transform",
    "transform-gpu",
    "transform-none",
    "transition",
    "transition-all",
    "transition-colors",
    "transition-opacity",
    "transition-shadow",
    "transition-transform",
    "duration-75",
    "duration-100",
    "duration-150",
    "duration-200",
    "duration-300",
    "duration-500",
    "duration-700",
    "duration-1000",
    "ease-linear",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "cursor-pointer",
    "cursor-default",
    "cursor-not-allowed",
    "select-none",
    "select-all",
    "select-auto",
    "select-text",
    "pointer-events-none",
    "pointer-events-auto",
    {
      pattern:
        /from-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /to-(makkah-olive|makkah-beige|makkah-sand|makkah-marble|makkah-gold)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Professional color palette patterns
    {
      pattern: /bg-(surface|outline)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /text-(surface|outline)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(surface|outline)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /from-(surface|outline)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /to-(surface|outline)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Status colors with opacity variants
    {
      pattern:
        /bg-(success|warning|info|error)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /text-(success|warning|info|error)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(success|warning|info|error)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    // Chart colors with opacity variants
    {
      pattern: /bg-chart-[1-5]\/[0-9]{1,2}/,
    },
    {
      pattern: /text-chart-[1-5]\/[0-9]{1,2}/,
    },
    {
      pattern: /border-chart-[1-5]\/[0-9]{1,2}/,
    },
    {
      pattern: /from-chart-[1-5]\/[0-9]{1,2}/,
    },
    {
      pattern: /to-chart-[1-5]\/[0-9]{1,2}/,
    },
    // Professional semantic colors
    {
      pattern: /bg-(surface|outline)(-dark|-darker|-light)?/,
    },
    {
      pattern: /text-(surface|outline)(-dark|-darker|-light)?/,
    },
    {
      pattern: /border-(surface|outline)(-dark|-darker|-light)?/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Use CSS variable
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Use CSS variable
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Professional Color Palette (using CSS variables)
        surface: {
          DEFAULT: "hsl(var(--surface))",
          50: "hsl(var(--surface-50))",
          100: "hsl(var(--surface-100))",
          200: "hsl(var(--surface-200))",
          300: "hsl(var(--surface-300))",
          400: "hsl(var(--surface-400))",
          500: "hsl(var(--surface-500))",
          600: "hsl(var(--surface-600))",
          700: "hsl(var(--surface-700))",
          800: "hsl(var(--surface-800))",
          900: "hsl(var(--surface-900))",
        },
        outline: {
          DEFAULT: "hsl(var(--outline))",
          50: "hsl(var(--outline-50))",
          100: "hsl(var(--outline-100))",
          200: "hsl(var(--outline-200))",
          300: "hsl(var(--outline-300))",
          400: "hsl(var(--outline-400))",
          500: "hsl(var(--outline-500))",
          600: "hsl(var(--outline-600))",
          700: "hsl(var(--outline-700))",
          800: "hsl(var(--outline-800))",
          900: "hsl(var(--outline-900))",
        },

        // Custom theme colors for reusability
        "dark-green": {
          primary: "var(--dark-green-primary)", // #1D493E
          secondary: "var(--dark-green-secondary)", // #244E47
        },
        "light-cream": "var(--light-cream)", // #EBEBDF
        "dark-cream": "var(--dark-cream)", // #DDD7CB
        "medium-cream": "var(--medium-cream)", // #DDD7CB
        "beige-border": "var(--beige-border)", // #C9C3B7

        // Makkah-inspired color palette
        makkah: {
          olive: {
            50: "#f7f8f5",
            100: "#eef1e8",
            200: "#dde3d3",
            300: "#c5ceb4",
            400: "#a7b48f",
            500: "#8b9b6f",
            600: "#6d7c57",
            700: "#556246",
            800: "#465139",
            900: "#3c4431",
          },
          beige: {
            50: "#fdfcf8",
            100: "#faf7f0",
            200: "#f4ede0",
            300: "#ebdcc8",
            400: "#dfc5a8",
            500: "#d3ae87",
            600: "#c2936b",
            700: "#a17856",
            800: "#85644a",
            900: "#6e533f",
          },
          sand: {
            50: "#fdfbf7",
            100: "#faf6ee",
            200: "#f4ebdb",
            300: "#ebdbc0",
            400: "#dfc59f",
            500: "#d2ad7c",
            600: "#c19259",
            700: "#a0774a",
            800: "#836240",
            900: "#6d5137",
          },
          marble: {
            50: "#fefffe",
            100: "#fdfdfc",
            200: "#fbfbf8",
            300: "#f7f7f2",
            400: "#f1f1e9",
            500: "#e8e8de",
            600: "#d4d4c7",
            700: "#b5b5a4",
            800: "#949485",
            900: "#7a7a6e",
          },
          gold: {
            50: "#fffbf2",
            100: "#fef6e3",
            200: "#fcebc2",
            300: "#f9d896",
            400: "#f5c068",
            500: "#f2a943",
            600: "#e59028",
            700: "#be731e",
            800: "#985d1d",
            900: "#7c4d1c",
          },
        },

        // Enhanced chart colors with Makkah theme
        chart: {
          "1": "hsl(var(--chart-1))", // Olive green
          "2": "hsl(var(--chart-2))", // Beige
          "3": "hsl(var(--chart-3))", // Sand
          "4": "hsl(var(--chart-4))", // Gold
          "5": "hsl(var(--chart-5))", // Marble
        },

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // Status colors aligned with Makkah theme
        success: {
          DEFAULT: "#6d7c57", // Soft olive green
          foreground: "#f7f8f5",
          50: "#f7f8f5",
          100: "#eef1e8",
          200: "#dde3d3",
          300: "#c5ceb4",
          400: "#a7b48f",
          500: "#8b9b6f",
          600: "#6d7c57",
          700: "#556246",
          800: "#465139",
          900: "#3c4431",
        },
        warning: {
          DEFAULT: "#f2a943", // Warm gold
          foreground: "#7c4d1c",
          50: "#fffbf2",
          100: "#fef6e3",
          200: "#fcebc2",
          300: "#f9d896",
          400: "#f5c068",
          500: "#f2a943",
          600: "#e59028",
          700: "#be731e",
          800: "#985d1d",
          900: "#7c4d1c",
        },
        info: {
          DEFAULT: "#d3ae87", // Soft beige
          foreground: "#6e533f",
          50: "#fdfcf8",
          100: "#faf7f0",
          200: "#f4ede0",
          300: "#ebdcc8",
          400: "#dfc5a8",
          500: "#d3ae87",
          600: "#c2936b",
          700: "#a17856",
          800: "#85644a",
          900: "#6e533f",
        },
        error: {
          DEFAULT: "#be731e", // Warm earth tone instead of harsh red
          foreground: "#fffbf2",
          50: "#fffbf2",
          100: "#fef6e3",
          200: "#fcebc2",
          300: "#f9d896",
          400: "#f5c068",
          500: "#f2a943",
          600: "#e59028",
          700: "#be731e",
          800: "#985d1d",
          900: "#7c4d1c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
