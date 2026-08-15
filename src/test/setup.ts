import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// `toHaveNoViolations` is already the { toHaveNoViolations(results) {...} }
// matchers object jest-axe expects passed straight to expect.extend — do
// not re-wrap it in another object literal. Its types target Jest's
// MatcherFunction signature, which doesn't line up structurally with
// Vitest's, hence the cast.
expect.extend(toHaveNoViolations as unknown as Parameters<typeof expect.extend>[0]);

// Radix UI primitives (Select, Dialog, Tooltip, Toast) call browser APIs
// jsdom doesn't implement — stub them so interaction tests can run headless.
if (typeof window !== "undefined") {
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }
  if (!window.HTMLElement.prototype.setPointerCapture) {
    window.HTMLElement.prototype.setPointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
  if (!("ResizeObserver" in window)) {
    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error -- jsdom has no ResizeObserver; a minimal stub is sufficient for tests.
    window.ResizeObserver = MockResizeObserver;
  }
}

if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
