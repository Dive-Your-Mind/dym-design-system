import { createContext, useContext, useId, type ReactNode } from "react";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}

export interface RadioGroupProps {
  /** Shared `name` for all Radio children. Auto-generated if omitted. */
  name?: string;
  /** Currently selected value (controlled). */
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible label for the group — required unless `aria-labelledby` is provided elsewhere. */
  label?: string;
  children: ReactNode;
}

export function RadioGroup({ name, value, onChange, label, children }: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange }}>
      <div className="dym-RadioGroup" role="radiogroup" aria-label={label}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
