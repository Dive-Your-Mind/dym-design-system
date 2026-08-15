import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Primary action trigger. Use `primary` for the single most important action on a screen, `secondary`/`ghost` for supporting actions, and `danger` for destructive actions. Fully keyboard operable (Tab, Enter, Space) and exposes `aria-busy` while `isLoading`.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button", variant: "primary" },
};

export const Variants: Story = {
  render: () => (
    <Stack direction="horizontal" gap="3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="3" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
};

export const Loading: Story = {
  args: { children: "Saving…", isLoading: true },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};
