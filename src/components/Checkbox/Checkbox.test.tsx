import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("associates its label and toggles on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("is operable via keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms");
    checkbox.focus();
    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
  });

  it("fires onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByLabelText("Accept terms"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("sets the DOM indeterminate property", () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByLabelText("Select all") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
