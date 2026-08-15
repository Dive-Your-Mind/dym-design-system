import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("associates its label and exposes a switch role", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeInTheDocument();
  });

  it("toggles aria-checked on click", async () => {
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" />);
    const el = screen.getByRole("switch");
    expect(el).toHaveAttribute("aria-checked", "false");
    await user.click(el);
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  it("is operable via keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" />);
    const el = screen.getByRole("switch");
    el.focus();
    await user.keyboard(" ");
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  it("fires onCheckedChange", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch label="Enable notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
