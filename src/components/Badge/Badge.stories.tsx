import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Small status/count label. Not interactive/focusable — use Button for clickable chips.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Variants: Story = {
  render: () => (
    <Stack direction="horizontal" gap="2">
      <Badge>Default</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </Stack>
  ),
};
