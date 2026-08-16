import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text field. Same label/helper/error wiring as Input. Keyboard: Tab to focus, native text-editing keys apply.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: { label: "Bio", placeholder: "Tell us about yourself" },
};

export const ErrorState: Story = {
  args: { label: "Bio", errorText: "Bio must be under 280 characters." },
};
