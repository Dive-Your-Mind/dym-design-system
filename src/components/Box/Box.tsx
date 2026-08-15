import { forwardRef, type ElementType, type HTMLAttributes, type CSSProperties } from "react";
import { cx } from "../../utils/cx";

/**
 * String-keyed mirror of the space scale (src/tokens/base.ts `space`).
 * Kept as an explicit string union rather than `keyof typeof space` because
 * numeric-looking object keys collapse to a `number` type under `keyof`,
 * while this prop is meant to be written as `padding="4"` in JSX.
 */
export type SpaceScale =
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";
export type BoxBackground = "canvas" | "surface" | "surface-raised" | "subtle" | "inverse";
export type BoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type BoxShadow = "sm" | "md" | "lg" | "xl";

export interface BoxOwnProps {
  /** Element (or component) to render as. Defaults to "div". */
  as?: ElementType;
  padding?: SpaceScale;
  paddingX?: SpaceScale;
  paddingY?: SpaceScale;
  paddingTop?: SpaceScale;
  paddingBottom?: SpaceScale;
  paddingLeft?: SpaceScale;
  paddingRight?: SpaceScale;
  margin?: SpaceScale;
  marginX?: SpaceScale;
  marginY?: SpaceScale;
  background?: BoxBackground;
  radius?: BoxRadius;
  /** Applies a 1px border using the default border token. */
  border?: boolean;
  shadow?: BoxShadow;
}

export type BoxProps = BoxOwnProps & Omit<HTMLAttributes<HTMLElement>, keyof BoxOwnProps>;

const spaceVar = (token: SpaceScale | undefined) =>
  token === undefined ? undefined : `var(--dym-space-${token})`;

/**
 * Layout primitive rendering as any element, styled exclusively through
 * design tokens. The foundation `Stack` and `Grid` are built on top of it.
 */
export const Box = /* @__PURE__ */ forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Component = "div",
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginX,
    marginY,
    background,
    radius,
    border,
    shadow,
    className,
    style,
    ...rest
  },
  ref,
) {
  // Resolved as discrete longhands (never the `padding`/`margin` shorthand):
  // mixing a shorthand assignment with an undefined longhand causes the
  // browser to drop the whole shorthand's computed value (observed in both
  // jsdom and real browsers), so per-side values must be independent.
  const computedStyle: CSSProperties = {
    paddingTop: spaceVar(paddingTop ?? paddingY ?? padding),
    paddingBottom: spaceVar(paddingBottom ?? paddingY ?? padding),
    paddingLeft: spaceVar(paddingLeft ?? paddingX ?? padding),
    paddingRight: spaceVar(paddingRight ?? paddingX ?? padding),
    marginTop: spaceVar(marginY ?? margin),
    marginBottom: spaceVar(marginY ?? margin),
    marginLeft: spaceVar(marginX ?? margin),
    marginRight: spaceVar(marginX ?? margin),
    backgroundColor: background ? `var(--dym-color-bg-${background})` : undefined,
    borderRadius: radius ? `var(--dym-radius-${radius})` : undefined,
    border: border ? "1px solid var(--dym-color-border-default)" : undefined,
    boxShadow: shadow ? `var(--dym-shadow-${shadow})` : undefined,
    ...style,
  };

  return (
    <Component ref={ref} className={cx("dym-Box", className)} style={computedStyle} {...rest} />
  );
});
