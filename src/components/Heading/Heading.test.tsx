import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("defaults to an h2", () => {
    render(<Heading data-testid="h">Title</Heading>);
    expect(screen.getByTestId("h").tagName).toBe("H2");
  });

  it("renders the tag matching the level prop", () => {
    render(
      <Heading level={1} data-testid="h">
        Title
      </Heading>,
    );
    expect(screen.getByTestId("h").tagName).toBe("H1");
  });

  it("sizes larger levels with a larger font-size token", () => {
    render(
      <Heading level={1} data-testid="h">
        Title
      </Heading>,
    );
    expect(screen.getByTestId("h").style.fontSize).toBe("var(--dym-font-size-4xl)");
  });

  it("allows overriding the rendered element independent of level", () => {
    render(
      <Heading level={1} as="div" data-testid="h">
        Title
      </Heading>,
    );
    expect(screen.getByTestId("h").tagName).toBe("DIV");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Heading level={1}>Page title</Heading>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
