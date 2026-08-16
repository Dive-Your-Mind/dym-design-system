import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Heading> = {
  title: "Foundations/Heading",
  component: Heading,
  parameters: {
    docs: {
      description: {
        component:
          "Semantic heading component. `level` controls both the rendered tag (h1-h6) and the default size — keep it matched to document structure, not desired visual size. Use `as` only when you need a different tag with the same visual size (rare).",
      },
    },
  },
  argTypes: {
    level: { control: { type: "number", min: 1, max: 6, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: { level: 2, children: "Section heading" },
};

export const AllLevels: Story = {
  render: () => (
    <Stack gap="2">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </Stack>
  ),
};
