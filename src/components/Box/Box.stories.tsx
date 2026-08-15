import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Foundations/Box",
  component: Box,
  parameters: {
    docs: {
      description: {
        component:
          "Polymorphic layout primitive. Renders as any element via `as` and exposes token-based padding, margin, background, radius, border, and shadow props. Use it for one-off surfaces/spacing; for laying out multiple children with a consistent gap, use `Stack` or `Grid` (both built on top of `Box`) instead of hand-rolling flex/grid styles here.",
      },
    },
  },
  argTypes: {
    background: {
      control: "select",
      options: ["canvas", "surface", "surface-raised", "subtle", "inverse"],
    },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "xl", "full"] },
    shadow: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    padding: "4",
    background: "surface",
    radius: "md",
    border: true,
    children: "A Box surface",
  },
};

export const WithShadow: Story = {
  args: {
    padding: "6",
    background: "surface",
    radius: "lg",
    shadow: "lg",
    children: "Raised surface",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    padding: "4",
    background: "subtle",
    radius: "sm",
    children: "Rendered as a <section>",
  },
};
