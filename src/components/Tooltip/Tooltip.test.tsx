import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

describe("Tooltip", () => {
  it("is not visible until the trigger is hovered/focused", () => {
    render(
      <Tooltip content="Save your work" delayDuration={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    expect(screen.queryByText("Save your work")).not.toBeInTheDocument();
  });

  it("appears on keyboard focus (not just hover)", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your work" delayDuration={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByText("Save your work")).toBeInTheDocument();
  });

  it("dismisses on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your work" delayDuration={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    await user.tab();
    await screen.findByText("Save your work");
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Save your work")).not.toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your work" delayDuration={0}>
        <Button>Save</Button>
      </Tooltip>,
    );
    await user.tab();
    await screen.findByText("Save your work");
    // "region" is a whole-page landmark-structure rule — irrelevant to a
    // component fragment rendered without a <main>/page layout around it.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
