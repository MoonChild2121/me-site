import { pxToRem } from "@/utils/pxToRem";

export const colors = {
  neutral: "#f9f7f2",
  primary: "#1a1a1a",
  secondary: "#635f58",
  tertiary: "#a69076",
} as const;

export const fonts = {
  body: "var(--font-family-body)",
  label: "var(--font-family-label)",
  headline: "var(--font-family-headline)",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Figma px → rem (`px / 14`). Mirror keys in `design-tokens.css` as `--font-size-*`. */
export const fontSizesPx = {
  xs: 12,
  sm: 13,
  body: 14,
  logo: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
  "4xl": 48,
  hero: 128,
} as const;

export const fontSizes = {
  xs: pxToRem(fontSizesPx.xs),
  sm: pxToRem(fontSizesPx.sm),
  body: pxToRem(fontSizesPx.body),
  logo: pxToRem(fontSizesPx.logo),
  md: pxToRem(fontSizesPx.md),
  lg: pxToRem(fontSizesPx.lg),
  xl: pxToRem(fontSizesPx.xl),
  "2xl": pxToRem(fontSizesPx["2xl"]),
  "3xl": pxToRem(fontSizesPx["3xl"]),
  "4xl": pxToRem(fontSizesPx["4xl"]),
  hero: pxToRem(fontSizesPx.hero),
} as const;
