import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with the given href", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("adds rel=noopener noreferrer for target=_blank links", () => {
    render(
      <Link href="https://example.com" target="_blank">
        External
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  });

  it("does not add rel for same-tab links", () => {
    render(<Link href="/about">About</Link>);
    expect(screen.getByRole("link")).not.toHaveAttribute("rel");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Link href="/about">About</Link>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
