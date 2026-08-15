import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Indeterminate loading indicator. Exposes `role="status"` with an accessible label so screen readers announce the loading state. Use it for short waits with no known duration (e.g. `Button isLoading`); for page-level or long-running loads, prefer a skeleton or progress indicator that shows more context.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" gap="4" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  ),
};
