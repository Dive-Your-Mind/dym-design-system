import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner/Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and disables the button, without shifting layout. */
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

export const Button = /* @__PURE__ */ forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled,
    leftIcon,
    rightIcon,
    className,
    children,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "dym-Button",
        `dym-Button--${variant}`,
        `dym-Button--${size}`,
        isLoading && "dym-Button--loading",
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading && <Spinner size="sm" className="dym-Button-spinner" />}
      <span className="dym-Button-content">
        {leftIcon && (
          <span className="dym-Button-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="dym-Button-icon" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
});
