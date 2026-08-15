import { forwardRef, type ElementType, type HTMLAttributes, type CSSProperties } from "react";
import { cx } from "../../utils/cx";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const LEVEL_SIZE: Record<HeadingLevel, string> = {
  1: "4xl",
  2: "3xl",
  3: "2xl",
  4: "xl",
  5: "lg",
  6: "md",
};

export interface HeadingOwnProps {
  /** Semantic heading level (1-6). Determines the rendered tag and default size. */
  level?: HeadingLevel;
  /** Override the rendered element without changing the visual size (rare — prefer matching `level` to `as`). */
  as?: ElementType;
  color?: "primary" | "secondary" | "inverse";
}

export type HeadingProps = HeadingOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof HeadingOwnProps>;

/** Semantic heading component — always renders h1-h6 (or an explicit override) sized from the type scale. */
export const Heading = /* @__PURE__ */ forwardRef<HTMLElement, HeadingProps>(function Heading(
  { level = 2, as, color = "primary", className, style, ...rest },
  ref,
) {
  const Component = as ?? (`h${level}` as ElementType);
  const computedStyle: CSSProperties = {
    fontSize: `var(--dym-font-size-${LEVEL_SIZE[level]})`,
    fontWeight: "var(--dym-font-weight-semibold)",
    lineHeight: "var(--dym-font-line-height-tight)",
    color: `var(--dym-color-text-${color})`,
    margin: 0,
    ...style,
  };

  return (
    <Component ref={ref} className={cx("dym-Heading", className)} style={computedStyle} {...rest} />
  );
});
