import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "./ThemeProvider";

const meta: Meta<typeof ThemeProvider> = {
  title: "Foundations/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          "Wraps your app (or a subtree) and applies the resolved light/dark theme via a `data-theme` attribute. Use the theme toolbar control above to preview both themes. Defaults to following the OS `prefers-color-scheme`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--dym-space-6)",
        borderRadius: "var(--dym-radius-md)",
        border: "1px solid var(--dym-color-border-default)",
        background: "var(--dym-color-bg-surface)",
        color: "var(--dym-color-text-primary)",
      }}
    >
      This surface is styled entirely from design tokens — its background,
      border, and text color all update when you switch the theme toolbar
      control.
    </div>
  ),
};
