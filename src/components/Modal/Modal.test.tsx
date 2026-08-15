import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

function ControlledModal({ description }: { description?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Delete item"
      description={description}
      trigger={<Button>Open modal</Button>}
      footer={<Button onClick={() => setOpen(false)}>Confirm</Button>}
    >
      <p>Are you sure?</p>
    </Modal>
  );
}

describe("Modal", () => {
  it("is closed by default and opens when the trigger is activated", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog", { name: "Delete item" })).toBeInTheDocument();
  });

  it("moves focus into the dialog when opened", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the close button is activated", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("returns focus to the trigger after closing", async () => {
    const user = userEvent.setup();
    render(<ControlledModal />);
    const trigger = screen.getByRole("button", { name: "Open modal" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });

  it("has no accessibility violations while open", async () => {
    const user = userEvent.setup();
    render(<ControlledModal description="This cannot be undone." />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    // Dialog content renders into a portal on document.body, outside the
    // render() container, so scan the whole document instead.
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
