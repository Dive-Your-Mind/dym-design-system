import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { createRef } from "react";
import { Image } from "./Image";

describe("Image", () => {
  it("renders with the required alt text", () => {
    render(<Image src="/photo.jpg" alt="A scenic mountain" />);
    expect(screen.getByRole("img", { name: "A scenic mountain" })).toHaveAttribute(
      "src",
      "/photo.jpg",
    );
  });

  it("allows an empty alt for decorative images", () => {
    render(<Image src="/photo.jpg" alt="" data-testid="img" />);
    expect(screen.getByTestId("img")).toHaveAttribute("alt", "");
  });

  it("applies fit, shape, bordered, shadow, and block as class names", () => {
    render(
      <Image
        src="/photo.jpg"
        alt="A photo"
        fit="cover"
        shape="circular"
        bordered
        shadow="md"
        block
        data-testid="img"
      />,
    );
    const el = screen.getByTestId("img");
    expect(el).toHaveClass(
      "dym-Image",
      "dym-Image--fit-cover",
      "dym-Image--shape-circular",
      "dym-Image--bordered",
      "dym-Image--shadow-md",
      "dym-Image--block",
    );
  });

  it("merges a passed className with its own", () => {
    render(<Image src="/photo.jpg" alt="A photo" className="extra" data-testid="img" />);
    expect(screen.getByTestId("img")).toHaveClass("dym-Image", "extra");
  });

  it("forwards a ref to the underlying img element", () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image src="/photo.jpg" alt="A photo" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Image src="/photo.jpg" alt="A scenic mountain" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
