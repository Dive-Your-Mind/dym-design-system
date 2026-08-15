import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { FieldWrapper, describedByIds } from "../internal/FieldWrapper";

export interface InputOwnProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  /** Renders the field's error styling and role="alert" text without requiring errorText to be a full sentence. */
  invalid?: boolean;
}

export type InputProps = InputOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;

export const Input = /* @__PURE__ */ forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, errorText, invalid, id, className, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const isInvalid = invalid || Boolean(errorText);

  return (
    <FieldWrapper
      fieldId={fieldId}
      label={label}
      helperText={helperText}
      errorText={errorText}
      required={required}
    >
      <input
        ref={ref}
        id={fieldId}
        className={cx("dym-Input", isInvalid && "dym-Input--invalid", className)}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedByIds(fieldId, helperText, errorText)}
        required={required}
        {...rest}
      />
    </FieldWrapper>
  );
});
