import { forwardRef, type CSSProperties } from "react";
import { Box, type BoxProps, type SpaceScale } from "../Box/Box";
import { cx } from "../../utils/cx";

export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "space-between" | "space-around";

export interface StackOwnProps {
  /** "vertical" (column) or "horizontal" (row). Defaults to "vertical". */
  direction?: "vertical" | "horizontal";
  /** Gap between children, from the space scale. */
  gap?: SpaceScale;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
}

export type StackProps = StackOwnProps & Omit<BoxProps, keyof StackOwnProps>;

const alignMap: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
};

/** Flexbox spacing primitive for laying out children with a consistent gap. */
export const Stack = /* @__PURE__ */ forwardRef<HTMLElement, StackProps>(function Stack(
  { direction = "vertical", gap, align, justify, wrap, className, style, ...rest },
  ref,
) {
  const computedStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
    gap: gap === undefined ? undefined : `var(--dym-space-${gap})`,
    alignItems: align ? alignMap[align] : undefined,
    justifyContent: justify ? justifyMap[justify] : undefined,
    flexWrap: wrap ? "wrap" : undefined,
    ...style,
  };

  return <Box ref={ref} className={cx("dym-Stack", className)} style={computedStyle} {...rest} />;
});
