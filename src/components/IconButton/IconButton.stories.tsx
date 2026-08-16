import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "Icon-only action trigger. `aria-label` is required — it is the button's only accessible name since the icon is hidden from assistive tech. Keyboard: Tab to focus, Enter/Space to activate.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: <CloseIcon />, "aria-label": "Close" },
};
