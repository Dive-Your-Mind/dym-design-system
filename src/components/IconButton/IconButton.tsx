import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonOwnProps {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: ReactNode;
  /** Required — an icon-only button has no visible text, so this is its accessible name. */
  "aria-label": string;
}

export type IconButtonProps = IconButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof IconButtonOwnProps | "aria-label">;

export const IconButton = /* @__PURE__ */ forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = "ghost", size = "md", icon, className, type = "button", ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "dym-IconButton",
          `dym-IconButton--${variant}`,
          `dym-IconButton--${size}`,
          className,
        )}
        {...rest}
      >
        <span aria-hidden="true">{icon}</span>
      </button>
    );
  },
);
