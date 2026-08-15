import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("defaults to a vertical (column) flex layout", () => {
    render(<Stack data-testid="stack" />);
    const el = screen.getByTestId("stack");
    expect(el.style.display).toBe("flex");
    expect(el.style.flexDirection).toBe("column");
  });

  it("switches to row direction when direction=horizontal", () => {
    render(<Stack data-testid="stack" direction="horizontal" />);
    expect(screen.getByTestId("stack").style.flexDirection).toBe("row");
  });

  it("applies gap as a token reference", () => {
    render(<Stack data-testid="stack" gap="4" />);
    expect(screen.getByTestId("stack").style.gap).toBe("var(--dym-space-4)");
  });

  it("applies align and justify", () => {
    render(<Stack data-testid="stack" align="center" justify="space-between" />);
    const el = screen.getByTestId("stack");
    expect(el.style.alignItems).toBe("center");
    expect(el.style.justifyContent).toBe("space-between");
  });

  it("renders children", () => {
    render(
      <Stack>
        <span>one</span>
        <span>two</span>
      </Stack>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Stack gap="2">
        <span>one</span>
        <span>two</span>
      </Stack>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
