import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "Single-select dropdown built on @radix-ui/react-select — correct listbox semantics, keyboard navigation (type-ahead, arrow keys), and viewport-aware positioning.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil", disabled: true },
];

export const Default: Story = {
  args: { label: "Country", options, placeholder: "Select a country" },
};

export const ErrorState: Story = {
  args: { label: "Country", options, errorText: "Country is required" },
};
