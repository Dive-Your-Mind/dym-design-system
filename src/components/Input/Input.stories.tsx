import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Single-line text field with an associated label and optional helper/error text, wired with aria-describedby and aria-invalid. Keyboard: Tab to focus, native text-editing keys apply.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@dym.com" },
};

export const WithHelperText: Story = {
  args: { label: "Email", helperText: "We'll never share your email." },
};

export const Required: Story = {
  args: { label: "Email", required: true },
};

export const ErrorState: Story = {
  args: { label: "Email", errorText: "Enter a valid email address.", defaultValue: "not-an-email" },
};

export const Disabled: Story = {
  args: { label: "Email", disabled: true, defaultValue: "you@dym.com" },
};
