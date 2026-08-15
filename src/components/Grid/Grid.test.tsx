import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders a grid display", () => {
    render(<Grid data-testid="grid" />);
    expect(screen.getByTestId("grid").style.display).toBe("grid");
  });

  it("expands a numeric columns prop into equal-width tracks", () => {
    render(<Grid data-testid="grid" columns={3} />);
    expect(screen.getByTestId("grid").style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
  });

  it("passes through an explicit columns string", () => {
    render(<Grid data-testid="grid" columns="1fr 2fr" />);
    expect(screen.getByTestId("grid").style.gridTemplateColumns).toBe("1fr 2fr");
  });

  it("applies gap tokens", () => {
    render(<Grid data-testid="grid" gap="3" />);
    expect(screen.getByTestId("grid").style.gap).toBe("var(--dym-space-3)");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Grid columns={2} gap="2">
        <div>a</div>
        <div>b</div>
      </Grid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
