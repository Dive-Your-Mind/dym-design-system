import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider, type ThemePreference } from "../src/theme/ThemeProvider";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    options: {
      storySort: {
        order: ["Getting Started", "Foundations", "Components", "*"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const preference = context.globals.theme as ThemePreference;
      return (
        <ThemeProvider key={preference} defaultPreference={preference}>
          <div style={{ padding: "1.5rem", minHeight: "100vh" }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
