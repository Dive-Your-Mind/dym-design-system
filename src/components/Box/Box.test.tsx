import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { createRef } from "react";
import { Box } from "./Box";

describe("Box", () => {
  it("renders as a div by default", () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId("box").tagName).toBe("DIV");
  });

  it("renders as the element passed via `as`", () => {
    render(<Box as="section" data-testid="box" />);
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("applies padding/background/radius as token-based inline styles", () => {
    render(<Box data-testid="box" padding="4" background="surface" radius="md" />);
    const el = screen.getByTestId("box");
    expect(el.style.paddingTop).toBe("var(--dym-space-4)");
    expect(el.style.paddingLeft).toBe("var(--dym-space-4)");
    expect(el.style.backgroundColor).toBe("var(--dym-color-bg-surface)");
    expect(el.style.borderRadius).toBe("var(--dym-radius-md)");
  });

  it("merges a passed className with its own", () => {
    render(<Box data-testid="box" className="extra" />);
    expect(screen.getByTestId("box")).toHaveClass("dym-Box", "extra");
  });

  it("forwards a ref to the underlying DOM element", () => {
    const ref = createRef<HTMLElement>();
    render(<Box ref={ref} data-testid="box" />);
    expect(ref.current).toBe(screen.getByTestId("box"));
  });

  it("does not warn/error when passed no layout props", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Box data-testid="box" />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Box padding="4">Accessible content</Box>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
