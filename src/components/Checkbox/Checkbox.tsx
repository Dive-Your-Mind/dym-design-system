import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface CheckboxOwnProps {
  label?: string;
  /** Visually and semantically a "partially checked" state (does not affect the underlying `checked` value). */
  indeterminate?: boolean;
}

export type CheckboxProps = CheckboxOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof CheckboxOwnProps | "type">;

export const Checkbox = /* @__PURE__ */ forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, indeterminate = false, id, className, ...rest }, forwardedRef) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const innerRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <span className="dym-Checkbox">
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          type="checkbox"
          id={fieldId}
          className={cx("dym-Checkbox-input", className)}
          {...rest}
        />
        {label && (
          <label htmlFor={fieldId} className="dym-Checkbox-label">
            {label}
          </label>
        )}
      </span>
    );
  },
);
