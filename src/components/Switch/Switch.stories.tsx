import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle for a single on/off setting that takes effect immediately (no separate save step). Built on @radix-ui/react-switch for correct role="switch" semantics. For a choice inside a form that\'s only applied on submit, use `Checkbox` instead. Keyboard: Tab to focus, Space to toggle.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Enable notifications" },
};

export const CheckedByDefault: Story = {
  args: { label: "Enable notifications", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Enable notifications", disabled: true },
};
