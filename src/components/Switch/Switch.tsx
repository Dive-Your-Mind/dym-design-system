import { forwardRef, useId } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cx } from "../../utils/cx";

export interface SwitchOwnProps {
  label?: string;
}

export type SwitchProps = SwitchOwnProps & Omit<RadixSwitch.SwitchProps, keyof SwitchOwnProps>;

/** Toggle control for a single on/off setting, built on @radix-ui/react-switch. */
export const Switch = /* @__PURE__ */ forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = `${fieldId}-label`;

  return (
    <span className="dym-Switch">
      <RadixSwitch.Root
        ref={ref}
        id={fieldId}
        // A <label for> pointing at a role="switch" button isn't reliably
        // recognized as an accessible-name source (confirmed via axe) —
        // aria-labelledby is the naming source that works for every AT.
        aria-labelledby={label ? labelId : undefined}
        className={cx("dym-Switch-root", className)}
        {...rest}
      >
        <RadixSwitch.Thumb className="dym-Switch-thumb" />
      </RadixSwitch.Root>
      {label && (
        <label htmlFor={fieldId} id={labelId} className="dym-Switch-label">
          {label}
        </label>
      )}
    </span>
  );
});
