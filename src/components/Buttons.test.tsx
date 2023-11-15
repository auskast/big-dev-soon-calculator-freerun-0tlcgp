import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import type { Button } from "@/hooks/useCalculator";

import { Buttons } from "./Buttons";
import { CalculatorContext, CalculatorProvider } from "./CalculatorContext";

it("renders accessible buttons", () => {
  render(<Buttons />, {
    wrapper: (props) => <CalculatorProvider {...props} />,
  });

  expect(acButton()).toBeInTheDocument();
  expect(cButton()).toBeInTheDocument();
  expect(percentButton()).toBeInTheDocument();
  expect(multiplyButton()).toBeInTheDocument();
  expect(threeButton()).toBeInTheDocument();
  expect(decimalButton()).toBeInTheDocument();
  expect(equalButton()).toBeInTheDocument();
});

const buttonEvents: {
  button: () => HTMLElement;
  key: string;
  event: Button;
}[] = [
  {
    button: () => acButton(),
    key: "{Escape}",
    event: "AC",
  },
  {
    button: () => cButton(),
    key: "{Backspace}",
    event: "C",
  },
  {
    button: () => percentButton(),
    key: "%",
    event: "%",
  },
  {
    button: () => multiplyButton(),
    key: "*",
    event: "*",
  },
  {
    button: () => threeButton(),
    key: "3",
    event: 3,
  },
  {
    button: () => decimalButton(),
    key: ".",
    event: ".",
  },
  {
    button: () => equalButton(),
    key: "{Enter}",
    event: "=",
  },
];

it("handles pointer events", async () => {
  const onButtonPress = vi.fn();

  render(<Buttons />, {
    wrapper: (props) => (
      <CalculatorContext.Provider
        value={{ input: "", operations: [], onButtonPress }}
        {...props}
      />
    ),
  });

  for (const { button, event } of buttonEvents) {
    await userEvent.click(button());
    expect(onButtonPress).toHaveBeenCalledWith(event);
  }
});

it("handles keyboard events", async () => {
  const onButtonPress = vi.fn();

  const { container } = render(<Buttons />, {
    wrapper: (props) => (
      <CalculatorContext.Provider
        value={{ input: "", operations: [], onButtonPress }}
        {...props}
      />
    ),
  });

  for (const { key, event } of buttonEvents) {
    await userEvent.keyboard(key);
    expect(onButtonPress).toHaveBeenCalledWith(event);
  }
});

const acButton = () => screen.getByRole("button", { name: /^AC$/i });
const cButton = () => screen.getByRole("button", { name: /^C$/i });
const percentButton = () => screen.getByRole("button", { name: /percentage/i });
const multiplyButton = () => screen.getByRole("button", { name: /times/i });
const threeButton = () => screen.getByRole("button", { name: /3/i });
const decimalButton = () => screen.getByRole("button", { name: /\./i });
const equalButton = () => screen.getByRole("button", { name: /equals/i });
