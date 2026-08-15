import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the image when src is provided", () => {
    render(<Avatar src="/me.jpg" name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveAttribute("src", "/me.jpg");
  });

  it("renders initials when no src is provided", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("falls back to initials if the image fails to load", () => {
    render(<Avatar src="/broken.jpg" name="Ada Lovelace" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar name="Ada Lovelace" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
