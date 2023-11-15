import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, useThemeContext } from "./ThemeContext";

const TestComponent = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <>
      <span data-testid="theme">{theme ?? "none"}</span>
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
    </>
  );
};

const themeEl = () => screen.getByTestId("theme");
const lightButton = () => screen.getByRole("button", { name: "light" });
const darkButton = () => screen.getByRole("button", { name: "dark" });

describe("useThemeContext()", () => {
  it("provides the theme context to child elements", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(themeEl()).toHaveTextContent("none");

    await userEvent.click(lightButton());

    expect(themeEl()).toHaveTextContent("light");

    await userEvent.click(darkButton());

    expect(themeEl()).toHaveTextContent("dark");
  });

  it("throws when not wrapped in a `ThemeProvider`", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "`useThemeContext()` must be used inside a `ThemeProvider`",
    );
  });
});

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads the theme from local storage", () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(themeEl()).toHaveTextContent("dark");
  });

  it("ignores invalid theme in local storage", () => {
    localStorage.setItem("theme", "random");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(themeEl()).toHaveTextContent("none");
  });

  it("writes selected theme to local storage", async () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    await userEvent.click(lightButton());

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("changes the document class name on selection", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveClass("light");
    expect(document.documentElement).not.toHaveClass("dark");

    await userEvent.click(darkButton());

    expect(document.documentElement).not.toHaveClass("light");
    expect(document.documentElement).toHaveClass("dark");
  });
});
