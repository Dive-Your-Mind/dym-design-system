import { type ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface FieldWrapperProps {
  fieldId: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Shared label + helper/error text chrome for Input, TextArea, and Select.
 * Not exported from the package — an internal implementation detail so the
 * three fields render identical, tested a11y wiring instead of diverging.
 */
export function FieldWrapper({
  fieldId,
  label,
  helperText,
  errorText,
  required,
  children,
}: FieldWrapperProps) {
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;
  const labelId = `${fieldId}-label`;

  return (
    <div className="dym-Field">
      {label && (
        <label htmlFor={fieldId} id={labelId} className="dym-Field-label">
          {label}
          {required && (
            <span className="dym-Field-required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {errorText ? (
        <p id={errorId} className="dym-Field-error" role="alert">
          {errorText}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={cx("dym-Field-helper")}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

/** Matches the `id` FieldWrapper puts on its rendered `<label>`. */
export function fieldLabelId(fieldId: string): string {
  return `${fieldId}-label`;
}

export function describedByIds(
  fieldId: string,
  helperText?: string,
  errorText?: string,
): string | undefined {
  if (errorText) return `${fieldId}-error`;
  if (helperText) return `${fieldId}-helper`;
  return undefined;
}
