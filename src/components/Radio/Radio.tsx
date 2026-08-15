import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { useRadioGroup } from "./RadioGroup";

export interface RadioOwnProps {
  label?: string;
  value: string;
}

export type RadioProps = RadioOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof RadioOwnProps | "type">;

export const Radio = /* @__PURE__ */ forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, value, id, name, className, checked, onChange, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const group = useRadioGroup();

  const resolvedName = name ?? group?.name;
  const resolvedChecked = checked ?? (group ? group.value === value : undefined);

  return (
    <span className="dym-Radio">
      <input
        ref={ref}
        type="radio"
        id={fieldId}
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        onChange={(e) => {
          onChange?.(e);
          group?.onChange?.(value);
        }}
        className={cx("dym-Radio-input", className)}
        {...rest}
      />
      {label && (
        <label htmlFor={fieldId} className="dym-Radio-label">
          {label}
        </label>
      )}
    </span>
  );
});
