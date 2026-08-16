import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Renders a user's image, falling back to initials if the image fails to load or `src` is omitted. `name` is required and drives both the fallback initials and the image's alt text — never pass a generic name like \"User\".",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: { name: "Ada Lovelace" },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="3" align="center">
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" />
    </Stack>
  ),
};
