import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "`RadioGroup` provides the shared `name` and selection state for `Radio` children — native radio group semantics. Keyboard: Tab into the group once, Arrow Up/Down (or Left/Right) to move between and select options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState("small");
      return (
        <RadioGroup label="Size" value={value} onChange={setValue}>
          <Radio value="small" label="Small" />
          <Radio value="medium" label="Medium" />
          <Radio value="large" label="Large" />
        </RadioGroup>
      );
    }
    return <Demo />;
  },
};
