/**
 * Semantic tokens map primitive values (base.ts) to purpose. Components
 * consume ONLY semantic tokens, never `color.neutral.500` directly — this
 * indirection is what makes light/dark theming (and future brand re-themes)
 * a data change instead of a component rewrite.
 */
import { color } from "./base";

export interface SemanticColorTokens {
  "bg-canvas": string;
  "bg-surface": string;
  "bg-surface-raised": string;
  "bg-subtle": string;
  "bg-inverse": string;
  overlay: string;
  "border-default": string;
  "border-subtle": string;
  "border-focus": string;
  "text-primary": string;
  "text-secondary": string;
  "text-disabled": string;
  "text-inverse": string;
  "text-on-brand": string;
  "brand-default": string;
  "brand-hover": string;
  "brand-active": string;
  "brand-subtle": string;
  "success-default": string;
  "success-subtle": string;
  "success-text": string;
  "warning-default": string;
  "warning-subtle": string;
  "warning-text": string;
  "danger-default": string;
  "danger-hover": string;
  "danger-subtle": string;
  "danger-text": string;
  "info-default": string;
  "info-subtle": string;
  "info-text": string;
}

export const lightColorTokens: SemanticColorTokens = {
  "bg-canvas": color.neutral[50],
  "bg-surface": color.neutral[0],
  "bg-surface-raised": color.neutral[0],
  "bg-subtle": color.neutral[100],
  "bg-inverse": color.neutral[900],
  overlay: "rgb(0 0 0 / 0.4)",
  "border-default": color.neutral[200],
  "border-subtle": color.neutral[100],
  "border-focus": color.brand[500],
  "text-primary": color.neutral[900],
  "text-secondary": color.neutral[600],
  "text-disabled": color.neutral[400],
  "text-inverse": color.neutral[0],
  "text-on-brand": color.neutral[0],
  "brand-default": color.brand[600],
  "brand-hover": color.brand[700],
  "brand-active": color.brand[800],
  "brand-subtle": color.brand[50],
  "success-default": color.success[500],
  "success-subtle": color.success[100],
  "success-text": color.success[700],
  "warning-default": color.warning[500],
  "warning-subtle": color.warning[100],
  "warning-text": color.warning[700],
  "danger-default": color.danger[500],
  "danger-hover": color.danger[700],
  "danger-subtle": color.danger[100],
  "danger-text": color.danger[700],
  "info-default": color.info[500],
  "info-subtle": color.info[100],
  "info-text": color.info[700],
};

export const darkColorTokens: SemanticColorTokens = {
  "bg-canvas": color.neutral[950],
  "bg-surface": color.neutral[900],
  "bg-surface-raised": color.neutral[800],
  "bg-subtle": color.neutral[800],
  "bg-inverse": color.neutral[50],
  overlay: "rgb(0 0 0 / 0.6)",
  "border-default": color.neutral[700],
  "border-subtle": color.neutral[800],
  "border-focus": color.brand[400],
  "text-primary": color.neutral[50],
  "text-secondary": color.neutral[300],
  "text-disabled": color.neutral[600],
  "text-inverse": color.neutral[900],
  "text-on-brand": color.neutral[0],
  "brand-default": color.brand[500],
  "brand-hover": color.brand[400],
  "brand-active": color.brand[300],
  "brand-subtle": color.brand[900],
  "success-default": color.success[500],
  "success-subtle": "#0f2e1c",
  "success-text": "#4ade80",
  "warning-default": color.warning[500],
  "warning-subtle": "#3a2a0a",
  "warning-text": "#fbbf24",
  "danger-default": color.danger[500],
  "danger-hover": "#f87171",
  "danger-subtle": "#3a1414",
  "danger-text": "#f87171",
  "info-default": color.info[500],
  "info-subtle": "#122a4d",
  "info-text": "#60a5fa",
};
