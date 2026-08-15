import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("associates the label with the textarea", () => {
    render(<TextArea label="Bio" />);
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<TextArea label="Bio" />);
    const el = screen.getByLabelText("Bio");
    await user.type(el, "Hello world");
    expect(el).toHaveValue("Hello world");
  });

  it("marks the field invalid and surfaces the error as an alert", () => {
    render(<TextArea label="Bio" errorText="Too long" />);
    expect(screen.getByLabelText("Bio")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Too long");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TextArea label="Bio" helperText="Tell us about yourself" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
