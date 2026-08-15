import { forwardRef, type CSSProperties } from "react";
import { Box, type BoxProps, type SpaceScale } from "../Box/Box";
import { cx } from "../../utils/cx";

export interface GridOwnProps {
  /** Number of equal-width columns, or an explicit `grid-template-columns` string. */
  columns?: number | string;
  gap?: SpaceScale;
  columnGap?: SpaceScale;
  rowGap?: SpaceScale;
}

export type GridProps = GridOwnProps & Omit<BoxProps, keyof GridOwnProps>;

/** CSS Grid layout primitive for two-dimensional layouts. */
export const Grid = /* @__PURE__ */ forwardRef<HTMLElement, GridProps>(function Grid(
  { columns, gap, columnGap, rowGap, className, style, ...rest },
  ref,
) {
  const computedStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns,
    gap: gap === undefined ? undefined : `var(--dym-space-${gap})`,
    columnGap: columnGap === undefined ? undefined : `var(--dym-space-${columnGap})`,
    rowGap: rowGap === undefined ? undefined : `var(--dym-space-${rowGap})`,
    ...style,
  };

  return <Box ref={ref} className={cx("dym-Grid", className)} style={computedStyle} {...rest} />;
});
