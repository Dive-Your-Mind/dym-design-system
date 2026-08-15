import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { IconButton } from "../IconButton/IconButton";

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7v4M8 5.2v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "Supplementary label shown on hover or keyboard focus, built on @radix-ui/react-tooltip. Keyboard: Tab to focus the trigger shows the tooltip; Escape dismisses it.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="More information">
      <IconButton icon={<InfoIcon />} aria-label="Info" />
    </Tooltip>
  ),
};
