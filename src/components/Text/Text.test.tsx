import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as a span by default", () => {
    render(<Text data-testid="t">hello</Text>);
    expect(screen.getByTestId("t").tagName).toBe("SPAN");
  });

  it("renders as a different element via `as`", () => {
    render(
      <Text as="p" data-testid="t">
        hello
      </Text>,
    );
    expect(screen.getByTestId("t").tagName).toBe("P");
  });

  it("applies size and weight as token references", () => {
    render(
      <Text data-testid="t" size="lg" weight="bold">
        hello
      </Text>,
    );
    const el = screen.getByTestId("t");
    expect(el.style.fontSize).toBe("var(--dym-font-size-lg)");
    expect(el.style.fontWeight).toBe("var(--dym-font-weight-bold)");
  });

  it("applies a semantic color token", () => {
    render(
      <Text data-testid="t" color="danger">
        hello
      </Text>,
    );
    expect(screen.getByTestId("t").style.color).toBe("var(--dym-color-danger-text)");
  });

  it("applies truncation styles when truncate is set", () => {
    render(
      <Text data-testid="t" truncate>
        hello
      </Text>,
    );
    const el = screen.getByTestId("t");
    expect(el.style.overflow).toBe("hidden");
    expect(el.style.textOverflow).toBe("ellipsis");
    expect(el.style.whiteSpace).toBe("nowrap");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text>Accessible text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
