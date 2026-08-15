import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Native checkbox styled via `accent-color`, keeping full built-in keyboard and screen-reader behavior. Supports an `indeterminate` visual state for "select all" patterns. Use it for a choice that takes effect on form submit (or an explicit save action); for a setting that takes effect immediately, use `Switch` instead. Keyboard: Tab to focus, Space to toggle.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept the terms and conditions" },
};

export const Checked: Story = {
  args: { label: "Accept the terms and conditions", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Accept the terms and conditions", disabled: true },
};
