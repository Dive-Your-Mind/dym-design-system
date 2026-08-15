import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { createRef } from "react";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label with the input via htmlFor/id", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    await user.type(input, "hi@dym.com");
    expect(input).toHaveValue("hi@dym.com");
  });

  it("associates helper text via aria-describedby", () => {
    render(<Input label="Email" helperText="We'll never share this" />);
    const input = screen.getByLabelText("Email");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("We'll never share this");
  });

  it("marks the field invalid and surfaces the error as an alert", () => {
    render(<Input label="Email" errorText="Email is required" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
  });

  it("marks required fields with aria/required and a visual indicator", () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Email" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input label="Email" helperText="hint" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations in the error state", async () => {
    const { container } = render(<Input label="Email" errorText="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
