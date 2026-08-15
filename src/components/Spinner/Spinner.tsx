import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerOwnProps {
  size?: SpinnerSize;
  /** Accessible label for screen readers. Defaults to "Loading". */
  label?: string;
}

export type SpinnerProps = SpinnerOwnProps & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

/** Indeterminate loading indicator. */
export const Spinner = /* @__PURE__ */ forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = "md", label = "Loading", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx("dym-Spinner", `dym-Spinner--${size}`, className)}
      {...rest}
    />
  );
});
