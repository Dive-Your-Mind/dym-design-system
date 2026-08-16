import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Inline navigational link. Automatically adds `rel="noopener noreferrer"` when `target="_blank"`. Keyboard: Tab to focus, Enter to activate (native anchor behavior).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { href: "#", children: "Underline on hover" },
};

export const AlwaysUnderlined: Story = {
  args: { href: "#", underline: "always", children: "Always underlined" },
};

export const External: Story = {
  args: { href: "https://example.com", target: "_blank", children: "Opens in a new tab" },
};
