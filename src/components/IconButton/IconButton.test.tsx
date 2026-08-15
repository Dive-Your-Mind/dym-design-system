import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { IconButton } from "./IconButton";

const DummyIcon = () => <svg data-testid="dummy-icon" />;

describe("IconButton", () => {
  it("uses aria-label as its accessible name", () => {
    render(<IconButton icon={<DummyIcon />} aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("hides the icon from the accessibility tree (name comes from aria-label)", () => {
    render(<IconButton icon={<DummyIcon />} aria-label="Close" />);
    expect(screen.getByTestId("dummy-icon").closest("[aria-hidden]")).toBeInTheDocument();
  });

  it("fires onClick when activated", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<IconButton icon={<DummyIcon />} aria-label="Close" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<IconButton icon={<DummyIcon />} aria-label="Close" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
