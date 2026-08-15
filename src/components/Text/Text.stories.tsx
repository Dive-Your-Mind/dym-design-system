import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Text> = {
  title: "Foundations/Text",
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          "Base typography component for body text, labels, and captions. Not for page/section titles — use `Heading` for those.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] },
    weight: { control: "select", options: ["regular", "medium", "semibold", "bold"] },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "disabled",
        "inverse",
        "on-brand",
        "brand",
        "danger",
        "success",
        "warning",
        "info",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: "The quick brown fox jumps over the lazy dog." },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="2">
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — The quick brown fox
        </Text>
      ))}
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack gap="2">
      {(
        [
          "primary",
          "secondary",
          "disabled",
          "brand",
          "danger",
          "success",
          "warning",
          "info",
        ] as const
      ).map((color) => (
        <Text key={color} color={color}>
          {color} text
        </Text>
      ))}
    </Stack>
  ),
};
