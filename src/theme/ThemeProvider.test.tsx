import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ThemeProvider, useTheme, type ThemePreference } from "./ThemeProvider";

function Probe() {
  const { theme } = useTheme();
  return <div data-testid="probe">{theme}</div>;
}

function Harness({ initial }: { initial: ThemePreference }) {
  const [preference, setPreference] = useState<ThemePreference>(initial);
  return (
    <ThemeProvider key={preference} defaultPreference={preference}>
      <button onClick={() => setPreference("dark")}>go dark</button>
      <button onClick={() => setPreference("light")}>go light</button>
      <Probe />
    </ThemeProvider>
  );
}

describe("ThemeProvider", () => {
  it("applies data-theme=light by default and resolves the token value", () => {
    render(
      <ThemeProvider defaultPreference="light">
        <div data-testid="child">content</div>
      </ThemeProvider>,
    );
    const root = screen.getByTestId("child").parentElement;
    expect(root).toHaveAttribute("data-theme", "light");
  });

  it("applies data-theme=dark when preference is dark", () => {
    render(
      <ThemeProvider defaultPreference="dark">
        <div data-testid="child">content</div>
      </ThemeProvider>,
    );
    const root = screen.getByTestId("child").parentElement;
    expect(root).toHaveAttribute("data-theme", "dark");
  });

  it("updates the resolved theme when preference changes at runtime", async () => {
    const user = userEvent.setup();
    render(<Harness initial="light" />);
    expect(screen.getByTestId("probe")).toHaveTextContent("light");

    await user.click(screen.getByText("go dark"));
    expect(screen.getByTestId("probe")).toHaveTextContent("dark");
  });

  it("throws if useTheme is used outside a ThemeProvider", () => {
    function Bare() {
      useTheme();
      return null;
    }
    expect(() => render(<Bare />)).toThrow(/useTheme must be used within/);
  });
});
