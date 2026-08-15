import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Box } from "../Box/Box";

const meta: Meta<typeof Stack> = {
  title: "Foundations/Stack",
  component: Stack,
  parameters: {
    docs: {
      description: {
        component:
          "Flexbox spacing primitive — lay out children in a row or column with a consistent token-based gap. Use it for one-dimensional layouts (a toolbar, a form's fields, a card's content). For two-dimensional layouts (rows and columns together), use `Grid` instead.",
      },
    },
  },
  argTypes: {
    direction: { control: "radio", options: ["vertical", "horizontal"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "space-between", "space-around"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

function Chip({ children }: { children: string }) {
  return (
    <Box padding="2" background="subtle" radius="sm">
      {children}
    </Box>
  );
}

export const Vertical: Story = {
  args: { gap: "3" },
  render: (args) => (
    <Stack {...args}>
      <Chip>One</Chip>
      <Chip>Two</Chip>
      <Chip>Three</Chip>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { direction: "horizontal", gap: "3", align: "center" },
  render: (args) => (
    <Stack {...args}>
      <Chip>One</Chip>
      <Chip>Two</Chip>
      <Chip>Three</Chip>
    </Stack>
  ),
};
