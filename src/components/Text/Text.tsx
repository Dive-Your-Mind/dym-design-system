import { forwardRef, type ElementType, type HTMLAttributes, type CSSProperties } from "react";
import { cx } from "../../utils/cx";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextColor =
  | "primary"
  | "secondary"
  | "disabled"
  | "inverse"
  | "on-brand"
  | "brand"
  | "danger"
  | "success"
  | "warning"
  | "info";

export interface TextOwnProps {
  as?: ElementType;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: "left" | "center" | "right";
  /** Truncates overflowing text with an ellipsis on a single line. */
  truncate?: boolean;
}

export type TextProps = TextOwnProps & Omit<HTMLAttributes<HTMLElement>, keyof TextOwnProps>;

const STATUS_COLORS = new Set<TextColor>(["danger", "success", "warning", "info"]);

const colorVar = (color: TextColor | undefined): string | undefined => {
  if (!color) return undefined;
  if (color === "brand") return "var(--dym-color-brand-default)";
  if (STATUS_COLORS.has(color)) return `var(--dym-color-${color}-text)`;
  return `var(--dym-color-text-${color})`;
};

/** Base typography component for body text, labels, and captions. */
export const Text = /* @__PURE__ */ forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = "span",
    size = "md",
    weight = "regular",
    color,
    align,
    truncate,
    className,
    style,
    ...rest
  },
  ref,
) {
  const computedStyle: CSSProperties = {
    fontSize: `var(--dym-font-size-${size})`,
    fontWeight: `var(--dym-font-weight-${weight})`,
    lineHeight: "var(--dym-font-line-height-normal)",
    color: colorVar(color),
    textAlign: align,
    ...(truncate
      ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }
      : {}),
    ...style,
  };

  return (
    <Component ref={ref} className={cx("dym-Text", className)} style={computedStyle} {...rest} />
  );
});
