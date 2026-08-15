import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { useState } from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

function ControlledGroup() {
  const [value, setValue] = useState("a");
  return (
    <RadioGroup label="Choose one" value={value} onChange={setValue}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  );
}

describe("Radio + RadioGroup", () => {
  it("exposes role=radiogroup with an accessible name", () => {
    render(<ControlledGroup />);
    expect(screen.getByRole("radiogroup", { name: "Choose one" })).toBeInTheDocument();
  });

  it("only allows one option selected at a time within a group", async () => {
    const user = userEvent.setup();
    render(<ControlledGroup />);
    const a = screen.getByLabelText("Option A");
    const b = screen.getByLabelText("Option B");
    expect(a).toBeChecked();
    await user.click(b);
    expect(b).toBeChecked();
    expect(a).not.toBeChecked();
  });

  it("shares the same name attribute across grouped radios", () => {
    render(<ControlledGroup />);
    const a = screen.getByLabelText("Option A") as HTMLInputElement;
    const b = screen.getByLabelText("Option B") as HTMLInputElement;
    expect(a.name).toBe(b.name);
    expect(a.name).not.toBe("");
  });

  it("is operable via arrow keys within a group", async () => {
    const user = userEvent.setup();
    render(<ControlledGroup />);
    screen.getByLabelText("Option A").focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByLabelText("Option B")).toHaveFocus();
    expect(screen.getByLabelText("Option B")).toBeChecked();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ControlledGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
