import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type BadgeVariant = "default" | "brand" | "success" | "danger" | "warning" | "info";

export interface BadgeOwnProps {
  variant?: BadgeVariant;
}

export type BadgeProps = BadgeOwnProps & Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeOwnProps>;

/** Small status/count label. Not interactive — use Button for clickable chips. */
export const Badge = /* @__PURE__ */ forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx("dym-Badge", `dym-Badge--${variant}`, className)} {...rest} />
  );
});
