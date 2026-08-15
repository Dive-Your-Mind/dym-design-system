import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { Box } from "../Box/Box";

const meta: Meta<typeof Grid> = {
  title: "Foundations/Grid",
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          "CSS Grid layout primitive for two-dimensional layouts (dashboards, card grids, form layouts with aligned columns). For a single row or column, prefer `Stack` — it's simpler and communicates one-dimensional intent.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const ThreeColumns: Story = {
  args: { columns: 3, gap: "3" },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} padding="4" background="subtle" radius="sm">
          {i + 1}
        </Box>
      ))}
    </Grid>
  ),
};

export const CustomTemplate: Story = {
  args: { columns: "1fr 2fr", gap: "3" },
  render: (args) => (
    <Grid {...args}>
      <Box padding="4" background="subtle" radius="sm">
        sidebar
      </Box>
      <Box padding="4" background="subtle" radius="sm">
        content
      </Box>
    </Grid>
  ),
};
