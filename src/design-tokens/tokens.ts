import { pxToRem } from '@/utils/pxToRem';

/* ── Palette ── */

export const colors = {
  neutral: '#f9f7f2',
  primary: '#1a1a1a',
  secondary: '#635f58',
  tertiary: '#a69076',
} as const;

/* ── Typography ── */

export const fonts = {
  body: 'var(--font-family-body)',
  label: 'var(--font-family-label)',
  headline: 'var(--font-family-headline)',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizesPx = {
  xs: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 48,
  hero: 96,
} as const;

export const fontSizes = {
  xs: pxToRem(fontSizesPx.xs),
  base: pxToRem(fontSizesPx.base),
  md: pxToRem(fontSizesPx.md),
  lg: pxToRem(fontSizesPx.lg),
  xl: pxToRem(fontSizesPx.xl),
  '2xl': pxToRem(fontSizesPx['2xl']),
  '3xl': pxToRem(fontSizesPx['3xl']),
  '4xl': pxToRem(fontSizesPx['4xl']),
  hero: pxToRem(fontSizesPx.hero),
} as const;

export const leading = {
  none: 1,
  tight: 1.15,
  snug: 1.3,
  normal: 1.6,
  relaxed: 1.7,
} as const;

export const tracking = {
  tight: '-0.02em',
  snug: '-0.01em',
  meta: '0.03em',
  label: '0.06em',
} as const;

/* ── Spacing (px values — use pxToRem() when needed in JS) ── */

export const spacingPx = {
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  60: 60,
  64: 64,
  72: 72,
  100: 100,
} as const;

/* ── Semantic spacing (px values, maps to CSS --gap-*, --padding-*, --section-*) ── */

export const gap = {
  xs: spacingPx[4],
  sm: spacingPx[8],
  md: spacingPx[12],
  lg: spacingPx[20],
  xl: spacingPx[32],
} as const;

export const padding = {
  xs: spacingPx[6],
  sm: spacingPx[10],
  md: spacingPx[16],
  lg: spacingPx[22],
  xl: spacingPx[32],
  page: spacingPx[56],
} as const;

export const section = {
  xs: spacingPx[10],
  sm: spacingPx[16],
  md: spacingPx[32],
  lg: spacingPx[56],
  xl: spacingPx[64],
} as const;

/* ── Radius (px values) ── */

export const radiiPx = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 16,
  pill: 999,
} as const;

/* ── Motion ── */

export const duration = {
  fast: '120ms',
  normal: '200ms',
  slow: '340ms',
} as const;

export const easing = {
  default: 'ease',
  out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;
