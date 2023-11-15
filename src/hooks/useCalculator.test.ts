import { act, renderHook } from "@testing-library/react";
import { expect, it } from "vitest";

import type { Button, CalculatorHookState } from "@/hooks/useCalculator";
import { useCalculator } from "@/hooks/useCalculator";

it("has initial state", () => {
  const { result } = renderHook(useCalculator);

  expect(result.current.input).toBe("0");
  expect(result.current.operations).toHaveLength(0);
});

type TestStep = { input: Button; state: Partial<CalculatorHookState> };

const testCases: {
  description: string;
  sequence: TestStep[];
  only?: boolean;
}[] = [
  {
    description: "accepts up to 14 digits",
    sequence: [
      ...Array(14)
        .fill(1)
        .map(
          (input, i) =>
            ({
              input,
              state: {
                input: Array(i + 1)
                  .fill(input)
                  .join(""),
              },
            }) satisfies TestStep,
        ),
      { input: 1, state: { input: "11111111111111" } },
    ],
  },
  {
    description: "accepts at most one `.`",
    sequence: [
      { input: 1, state: { input: "1" } },
      { input: ".", state: { input: "1." } },
      { input: ".", state: { input: "1." } },
      { input: 1, state: { input: "1.1" } },
      { input: ".", state: { input: "1.1" } },
    ],
  },
  {
    description: "clears input on next digit after `=`",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "=", state: { input: "3", operations: [] } },
      { input: 2, state: { input: "2", operations: [] } },
    ],
  },
  {
    description: "clears input on next `.` after `=`",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "=", state: { input: "3", operations: [] } },
      { input: ".", state: { input: "0.", operations: [] } },
    ],
  },
  {
    description: "uses input on next operation after `=`",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "=", state: { input: "3", operations: [] } },
      { input: "*", state: { input: "0", operations: ["3", "*"] } },
    ],
  },
  {
    description: "can add 2 numbers",
    sequence: [
      { input: "+", state: { input: "0", operations: [] } },
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "=", state: { input: "3", operations: [] } },
    ],
  },
  {
    description: "can add 3 numbers",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "+", state: { input: "0", operations: ["1", "+", "2", "+"] } },
      { input: 3, state: { input: "3", operations: ["1", "+", "2", "+"] } },
      { input: "=", state: { input: "6", operations: [] } },
    ],
  },
  {
    description: "can add 0",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: "=", state: { input: "1", operations: [] } },
    ],
  },
  {
    description: "can add decimals",
    sequence: [
      { input: 3, state: { input: "3", operations: [] } },
      { input: ".", state: { input: "3.", operations: [] } },
      { input: 5, state: { input: "3.5", operations: [] } },
      { input: "+", state: { input: "0", operations: ["3.5", "+"] } },
      { input: 2, state: { input: "2", operations: ["3.5", "+"] } },
      { input: ".", state: { input: "2.", operations: ["3.5", "+"] } },
      { input: 2, state: { input: "2.2", operations: ["3.5", "+"] } },
      { input: "=", state: { input: "5.7", operations: [] } },
    ],
  },
  {
    description: "can subtract 2 numbers",
    sequence: [
      { input: "-", state: { input: "0", operations: [] } },
      { input: 9, state: { input: "9", operations: [] } },
      { input: "-", state: { input: "0", operations: ["9", "-"] } },
      { input: "-", state: { input: "0", operations: ["9", "-"] } },
      { input: 1, state: { input: "1", operations: ["9", "-"] } },
      { input: "=", state: { input: "8", operations: [] } },
    ],
  },
  {
    description: "can subtract 3 numbers",
    sequence: [
      { input: 9, state: { input: "9", operations: [] } },
      { input: "-", state: { input: "0", operations: ["9", "-"] } },
      { input: 1, state: { input: "1", operations: ["9", "-"] } },
      { input: "-", state: { input: "0", operations: ["9", "-", "1", "-"] } },
      { input: 3, state: { input: "3", operations: ["9", "-", "1", "-"] } },
      { input: "=", state: { input: "5", operations: [] } },
    ],
  },
  {
    description: "can subtract 0",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "-", state: { input: "0", operations: ["1", "-"] } },
      { input: "=", state: { input: "1", operations: [] } },
    ],
  },
  {
    description: "can subtract decimals",
    sequence: [
      { input: 3, state: { input: "3", operations: [] } },
      { input: ".", state: { input: "3.", operations: [] } },
      { input: 5, state: { input: "3.5", operations: [] } },
      { input: "-", state: { input: "0", operations: ["3.5", "-"] } },
      { input: 2, state: { input: "2", operations: ["3.5", "-"] } },
      { input: ".", state: { input: "2.", operations: ["3.5", "-"] } },
      { input: 2, state: { input: "2.2", operations: ["3.5", "-"] } },
      { input: "=", state: { input: "1.3", operations: [] } },
    ],
  },
  {
    description: "can multiply 2 numbers",
    sequence: [
      { input: "*", state: { input: "0", operations: [] } },
      { input: 1, state: { input: "1", operations: [] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: 2, state: { input: "2", operations: ["1", "*"] } },
      { input: "=", state: { input: "2", operations: [] } },
    ],
  },
  {
    description: "can multiply 3 numbers",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: 2, state: { input: "2", operations: ["1", "*"] } },
      { input: "*", state: { input: "0", operations: ["1", "*", "2", "*"] } },
      { input: 3, state: { input: "3", operations: ["1", "*", "2", "*"] } },
      { input: "=", state: { input: "6", operations: [] } },
    ],
  },
  {
    description: "can multiply 0",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: "=", state: { input: "0", operations: [] } },
    ],
  },
  {
    description: "can multiply decimals",
    sequence: [
      { input: 3, state: { input: "3", operations: [] } },
      { input: ".", state: { input: "3.", operations: [] } },
      { input: 5, state: { input: "3.5", operations: [] } },
      { input: "*", state: { input: "0", operations: ["3.5", "*"] } },
      { input: 2, state: { input: "2", operations: ["3.5", "*"] } },
      { input: ".", state: { input: "2.", operations: ["3.5", "*"] } },
      { input: 2, state: { input: "2.2", operations: ["3.5", "*"] } },
      { input: "=", state: { input: "7.7", operations: [] } },
    ],
  },
  {
    description: "can divide 2 numbers",
    sequence: [
      { input: "/", state: { input: "0", operations: [] } },
      { input: 2, state: { input: "2", operations: [] } },
      { input: "/", state: { input: "0", operations: ["2", "/"] } },
      { input: "/", state: { input: "0", operations: ["2", "/"] } },
      { input: 2, state: { input: "2", operations: ["2", "/"] } },
      { input: "=", state: { input: "1", operations: [] } },
    ],
  },
  {
    description: "can divide 3 numbers",
    sequence: [
      { input: 6, state: { input: "6", operations: [] } },
      { input: "/", state: { input: "0", operations: ["6", "/"] } },
      { input: 2, state: { input: "2", operations: ["6", "/"] } },
      { input: "/", state: { input: "0", operations: ["6", "/", "2", "/"] } },
      { input: 3, state: { input: "3", operations: ["6", "/", "2", "/"] } },
      { input: "=", state: { input: "1", operations: [] } },
    ],
  },
  {
    description: "can divide 0",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "/", state: { input: "0", operations: ["1", "/"] } },
      { input: "=", state: { input: "Err", operations: [] } },
    ],
  },
  {
    description: "can divide decimals",
    sequence: [
      { input: 3, state: { input: "3", operations: [] } },
      { input: ".", state: { input: "3.", operations: [] } },
      { input: 5, state: { input: "3.5", operations: [] } },
      { input: "/", state: { input: "0", operations: ["3.5", "/"] } },
      { input: 2, state: { input: "2", operations: ["3.5", "/"] } },
      { input: ".", state: { input: "2.", operations: ["3.5", "/"] } },
      { input: 2, state: { input: "2.2", operations: ["3.5", "/"] } },
      { input: "=", state: { input: "1.59090909", operations: [] } },
    ],
  },
  {
    description: "blocks operations on error",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "/", state: { input: "0", operations: ["1", "/"] } },
      { input: "=", state: { input: "Err", operations: [] } },
      { input: "=", state: { input: "Err", operations: [] } },
      { input: "+", state: { input: "Err", operations: [] } },
      { input: "%", state: { input: "Err", operations: [] } },
    ],
  },
  {
    description: "allows number on error",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "/", state: { input: "0", operations: ["1", "/"] } },
      { input: "=", state: { input: "Err", operations: [] } },
      { input: 3, state: { input: "3", operations: [] } },
    ],
  },
  {
    description: "allows decimal on error",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "/", state: { input: "0", operations: ["1", "/"] } },
      { input: "=", state: { input: "Err", operations: [] } },
      { input: ".", state: { input: "0.", operations: [] } },
    ],
  },
  {
    description: "can add and multiply in the correct order",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 2, state: { input: "2", operations: ["1", "+"] } },
      { input: "*", state: { input: "0", operations: ["1", "+", "2", "*"] } },
      { input: 3, state: { input: "3", operations: ["1", "+", "2", "*"] } },
      { input: "=", state: { input: "7", operations: [] } },
    ],
  },
  {
    description: "can add and divide in the correct order",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "+", state: { input: "0", operations: ["1", "+"] } },
      { input: 6, state: { input: "6", operations: ["1", "+"] } },
      { input: "/", state: { input: "0", operations: ["1", "+", "6", "/"] } },
      { input: 3, state: { input: "3", operations: ["1", "+", "6", "/"] } },
      { input: "=", state: { input: "3", operations: [] } },
    ],
  },
  {
    description: "can perform many operations in the correct order",
    sequence: [
      { input: 3, state: { input: "3", operations: [] } },
      { input: "+", state: { input: "0", operations: ["3", "+"] } },
      { input: 4, state: { input: "4", operations: ["3", "+"] } },
      { input: "*", state: { input: "0", operations: ["3", "+", "4", "*"] } },
      { input: 8, state: { input: "8", operations: ["3", "+", "4", "*"] } },
      {
        input: "/",
        state: { input: "0", operations: ["3", "+", "4", "*", "8", "/"] },
      },
      {
        input: 1,
        state: { input: "1", operations: ["3", "+", "4", "*", "8", "/"] },
      },
      {
        input: 6,
        state: { input: "16", operations: ["3", "+", "4", "*", "8", "/"] },
      },
      {
        input: "+",
        state: {
          input: "0",
          operations: ["3", "+", "4", "*", "8", "/", "16", "+"],
        },
      },
      {
        input: 6,
        state: {
          input: "6",
          operations: ["3", "+", "4", "*", "8", "/", "16", "+"],
        },
      },
      {
        input: "/",
        state: {
          input: "0",
          operations: ["3", "+", "4", "*", "8", "/", "16", "+", "6", "/"],
        },
      },
      {
        input: 2,
        state: {
          input: "2",
          operations: ["3", "+", "4", "*", "8", "/", "16", "+", "6", "/"],
        },
      },
      { input: "=", state: { input: "8", operations: [] } },
    ],
  },
  {
    description: "handles large numbers with exponents",
    sequence: [
      ...Array(14)
        .fill(9)
        .map(
          (input, i) =>
            ({
              input,
              state: {
                input: Array(i + 1)
                  .fill(input)
                  .join(""),
              },
            }) satisfies TestStep,
        ),
      {
        input: "*",
        state: { input: "0", operations: ["99999999999999", "*"] },
      },
      ...Array(14)
        .fill(9)
        .map(
          (input, i) =>
            ({
              input,
              state: {
                input: Array(i + 1)
                  .fill(input)
                  .join(""),
                operations: ["99999999999999", "*"],
              },
            }) satisfies TestStep,
        ),
      { input: "=", state: { input: "1.000000000e+28", operations: [] } },
    ],
  },
  {
    description: "converts number to percent",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: 5, state: { input: "15", operations: [] } },
      { input: "%", state: { input: "0.15", operations: [] } },
      { input: "%", state: { input: "0.0015", operations: [] } },
    ],
  },
  {
    description: "clears current calculation",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: 3, state: { input: "3", operations: ["1", "*"] } },
      { input: "C", state: { input: "0", operations: ["1", "*"] } },
      { input: "C", state: { input: "0", operations: ["1", "*"] } },
    ],
  },
  {
    description: "resets calculator",
    sequence: [
      { input: 1, state: { input: "1", operations: [] } },
      { input: "*", state: { input: "0", operations: ["1", "*"] } },
      { input: 3, state: { input: "3", operations: ["1", "*"] } },
      { input: "AC", state: { input: "0", operations: [] } },
    ],
  },
];

testCases.forEach((tc) => {
  const fn = tc.only ? it.only : it;
  fn(tc.description, () => {
    const { result } = renderHook(useCalculator);

    for (const { input, state } of tc.sequence) {
      act(() => result.current.onButtonPress(input));

      expect(result.current).toMatchObject(state);
    }
  });
});
