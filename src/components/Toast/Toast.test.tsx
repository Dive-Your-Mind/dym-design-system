import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button/Button";

function Demo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Saved", description: "Your changes were saved." })}>
      Save
    </Button>
  );
}

describe("Toast", () => {
  it("throws when useToast is used outside a ToastProvider", () => {
    function Bare() {
      useToast();
      return null;
    }
    expect(() => render(<Bare />)).toThrow(/useToast must be used within/);
  });

  it("shows a toast after calling toast()", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });

  it("dismisses when the close button is activated", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Saved");
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    await waitFor(() => expect(screen.queryByText("Saved")).not.toBeInTheDocument());
  });

  it("has no accessibility violations when a toast is shown", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("Saved");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
