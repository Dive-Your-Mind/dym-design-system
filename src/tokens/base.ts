/**
 * Primitive token scales. These are raw values with no semantic meaning —
 * semantic.ts maps them to purpose (e.g. "brand primary", "surface").
 *
 * PLACEHOLDER PALETTE: these color values are neutral placeholders pending
 * final DYM brand input (see design.md Open Questions). Swapping brand
 * colors later means editing the `color` scale below — nothing structural.
 */

export const color = {
  neutral: {
    0: "#ffffff",
    50: "#f7f7f8",
    100: "#eeeef0",
    200: "#dcdce1",
    300: "#c1c1c9",
    400: "#9a9aa6",
    500: "#75757f",
    600: "#57575f",
    700: "#3f3f46",
    800: "#28282d",
    900: "#18181b",
    950: "#0d0d0f",
  },
  brand: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  success: {
    100: "#dcfce7",
    500: "#22c55e",
    700: "#15803d",
  },
  warning: {
    100: "#fef3c7",
    500: "#f59e0b",
    700: "#b45309",
  },
  danger: {
    100: "#fee2e2",
    500: "#ef4444",
    700: "#b91c1c",
  },
  info: {
    100: "#dbeafe",
    500: "#3b82f6",
    700: "#1d4ed8",
  },
} as const;

export const space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const radius = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.06)",
  md: "0 2px 8px 0 rgb(0 0 0 / 0.10)",
  lg: "0 8px 24px 0 rgb(0 0 0 / 0.14)",
  xl: "0 16px 48px 0 rgb(0 0 0 / 0.18)",
} as const;

export const font = {
  family: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
  },
  size: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.7",
  },
} as const;

export const motion = {
  duration: {
    fast: "120ms",
    normal: "200ms",
    slow: "320ms",
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    entrance: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const zIndex = {
  dropdown: "1000",
  overlay: "1100",
  modal: "1200",
  toast: "1300",
  tooltip: "1400",
} as const;
