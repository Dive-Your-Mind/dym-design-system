import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface LinkOwnProps {
  /** Renders with underline always visible instead of only on hover. */
  underline?: "always" | "hover";
}

export type LinkProps = LinkOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkOwnProps>;

export const Link = /* @__PURE__ */ forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { underline = "hover", className, target, rel, children, ...rest },
  ref,
) {
  const isExternal = target === "_blank";
  return (
    <a
      ref={ref}
      target={target}
      rel={isExternal ? cx("noopener", "noreferrer", rel) : rel}
      className={cx("dym-Link", `dym-Link--underline-${underline}`, className)}
      {...rest}
    >
      {children}
    </a>
  );
});
