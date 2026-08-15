import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { FieldWrapper, describedByIds } from "../internal/FieldWrapper";

export interface TextAreaOwnProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  invalid?: boolean;
}

export type TextAreaProps = TextAreaOwnProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextAreaOwnProps>;

export const TextArea = /* @__PURE__ */ forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { label, helperText, errorText, invalid, id, className, required, rows = 4, ...rest },
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
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={cx("dym-TextArea", isInvalid && "dym-TextArea--invalid", className)}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedByIds(fieldId, helperText, errorText)}
          required={required}
          {...rest}
        />
      </FieldWrapper>
    );
  },
);
