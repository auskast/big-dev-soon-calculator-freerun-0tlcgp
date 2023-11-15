import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CalculatorProvider, useCalculatorContext } from "./CalculatorContext";

describe("useCalculatorContext()", () => {
  const TestComponent = () => {
    const { input, operations, onButtonPress } = useCalculatorContext();

    return (
      <>
        <span data-testid="input">{input}</span>
        <span data-testid="operations">{JSON.stringify(operations)}</span>
        <button onClick={() => onButtonPress(5)}>5</button>
        <button onClick={() => onButtonPress("+")}>+</button>
        <button onClick={() => onButtonPress("=")}>=</button>
      </>
    );
  };

  const inputEl = () => screen.getByTestId("input");
  const operationsEl = () => screen.getByTestId("operations");
  const fiveButton = () => screen.getByRole("button", { name: "5" });
  const plusButton = () => screen.getByRole("button", { name: "+" });
  const equalsButton = () => screen.getByRole("button", { name: "=" });

  it("provides the calculator context to child elements", async () => {
    render(
      <CalculatorProvider>
        <TestComponent />
      </CalculatorProvider>,
    );

    expect(inputEl()).toHaveTextContent("0");
    expect(operationsEl()).toHaveTextContent("[]");

    await userEvent.click(fiveButton());

    expect(inputEl()).toHaveTextContent("5");
    expect(operationsEl()).toHaveTextContent("[]");

    await userEvent.click(plusButton());

    expect(inputEl()).toHaveTextContent("0");
    expect(operationsEl()).toHaveTextContent('["5","+"]');

    await userEvent.click(fiveButton());

    expect(inputEl()).toHaveTextContent("5");
    expect(operationsEl()).toHaveTextContent('["5","+"]');

    await userEvent.click(equalsButton());

    expect(inputEl()).toHaveTextContent("10");
    expect(operationsEl()).toHaveTextContent("[]");
  });

  it("throws when not wrapped in a `CalculatorProvider`", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "`useCalculatorContext()` must be used inside a `CalculatorProvider`",
    );
  });
});
