import { useId } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cx } from "../../utils/cx";
import { FieldWrapper, describedByIds, fieldLabelId } from "../internal/FieldWrapper";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3 4.5l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 6l3 3 5-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Single-select dropdown, built on @radix-ui/react-select for correct
 * listbox semantics, positioning, and keyboard navigation.
 */
export function Select({
  label,
  helperText,
  errorText,
  placeholder = "Select…",
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  id,
}: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const isInvalid = Boolean(errorText);

  return (
    <FieldWrapper
      fieldId={fieldId}
      label={label}
      helperText={helperText}
      errorText={errorText}
      required={required}
    >
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        name={name}
      >
        <RadixSelect.Trigger
          id={fieldId}
          className={cx("dym-Select-trigger", isInvalid && "dym-Select-trigger--invalid")}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedByIds(fieldId, helperText, errorText)}
          // See Switch.tsx — a <label for> pointing at a role-overridden
          // button isn't reliably picked up as the accessible name.
          aria-labelledby={label ? fieldLabelId(fieldId) : undefined}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="dym-Select-icon">
            <ChevronIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="dym-Select-content" position="popper" sideOffset={4}>
            <RadixSelect.Viewport className="dym-Select-viewport">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="dym-Select-item"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="dym-Select-itemIndicator">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </FieldWrapper>
  );
}
