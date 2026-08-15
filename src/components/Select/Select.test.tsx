import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Select } from "./Select";

const options = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico", disabled: true },
];

describe("Select", () => {
  it("associates its label with the trigger", () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByRole("combobox", { name: "Country" })).toBeInTheDocument();
  });

  it("shows the placeholder when no value is selected", () => {
    render(<Select label="Country" options={options} placeholder="Pick a country" />);
    expect(screen.getByText("Pick a country")).toBeInTheDocument();
  });

  it("opens the listbox and selects an option via click", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Select label="Country" options={options} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: "Canada" });
    await user.click(option);

    expect(onValueChange).toHaveBeenCalledWith("ca");
  });

  it("is operable via keyboard (Enter to open, Arrow to move, Enter to select)", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Select label="Country" options={options} onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox");
    trigger.focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalled();
  });

  it("associates helper text via aria-describedby", () => {
    render(<Select label="Country" options={options} helperText="Choose your billing country" />);
    const trigger = screen.getByRole("combobox");
    const describedBy = trigger.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("Choose your billing country");
  });

  it("marks the field invalid and surfaces the error as an alert", () => {
    render(<Select label="Country" options={options} errorText="Country is required" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Country is required");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Select label="Country" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
