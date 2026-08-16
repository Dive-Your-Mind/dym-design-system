import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button/Button";

const meta: Meta<typeof ToastProvider> = {
  title: "Components/Toast",
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component:
          "`ToastProvider` is placed once near the app root; descendants call `useToast().toast(...)` to show a toast. Built on @radix-ui/react-toast. Keyboard: F8 moves focus to the toast viewport; Tab reaches the dismiss button; Escape dismisses.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({ title: "Saved", description: "Your changes were saved.", variant: "success" })
      }
    >
      Show toast
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
