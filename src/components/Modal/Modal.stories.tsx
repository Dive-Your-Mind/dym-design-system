import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          "Modal dialog built on @radix-ui/react-dialog. Traps focus while open, closes on Escape or overlay click, and restores focus to the trigger on close. Keyboard: Escape to close, Tab/Shift+Tab cycles only within the dialog while open.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Delete item"
          description="This action cannot be undone."
          trigger={<Button variant="danger">Delete…</Button>}
          footer={
            <Stack direction="horizontal" gap="2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </Stack>
          }
        >
          Are you sure you want to delete this item?
        </Modal>
      );
    }
    return <Demo />;
  },
};
