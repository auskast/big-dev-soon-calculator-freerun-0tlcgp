"use client";

import * as React from "react";

import BigDecimal from "js-big-decimal";

export type Operator = "AC" | "C" | "%" | "+" | "-" | "*" | "/" | "=";

type CalculatorState = {
  stack: BigDecimal[];
  lastOperator: Operator;
  operations: (Operator | string)[];
  input: string;
  shouldClear: boolean;
  isError: boolean;
};

const initialState: CalculatorState = {
  stack: [],
  lastOperator: "+",
  operations: [],
  input: "0",
  shouldClear: false,
  isError: false,
};

type CalculatorAction =
  | { type: Operator }
  | { type: "=" }
  | { type: "." }
  | { type: "digit"; digit: number };

function reducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "AC":
      return initialState;
    case "C":
      return {
        ...state,
        input: initialState.input,
      };
    case "%":
      return state.isError
        ? state
        : {
            ...state,
            input: String(Number(state.input) / 100),
          };
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      return state.isError ? state : performOperation(state, action.type);
    case ".":
      if (state.shouldClear || state.isError) {
        return {
          ...initialState,
          input: "0.",
        };
      }

      if (state.input.includes(".")) {
        return state;
      }

      return {
        ...state,
        input: state.input + ".",
        shouldClear: false,
        isError: false,
      };
    case "digit":
      if (state.shouldClear || state.isError) {
        return {
          ...initialState,
          input: formatNumber(action.digit),
        };
      }

      return {
        ...state,
        input:
          state.input === initialState.input
            ? formatNumber(action.digit)
            : state.input.length < 14
              ? state.input + action.digit
              : state.input,
      };
  }
}

function performOperation(
  state: CalculatorState,
  operator: Operator,
): CalculatorState {
  const input = new BigDecimal(state.input.replace(/\.$/, ""));
  const isEqual = operator === "=";

  if (input.getValue() === "0" && !isEqual) return state;

  let stack = [...state.stack];

  switch (state.lastOperator) {
    case "+":
      stack.push(input);
      break;
    case "-":
      stack.push(input.negate());
      break;
    case "*":
      stack.push(stack.pop()!.multiply(input));
      break;
    case "/": {
      if (input.compareTo(new BigDecimal(0)) === 0) {
        return {
          ...initialState,
          input: "Err",
          shouldClear: true,
          isError: true,
        };
      }

      stack.push(stack.pop()!.divide(input));
      break;
    }
  }

  return isEqual
    ? {
        ...initialState,
        input: formatNumber(
          stack.reduce((sum, val) => sum.add(val), new BigDecimal(0)),
        ),
        shouldClear: true,
      }
    : {
        ...state,
        stack,
        lastOperator: operator,
        operations: [...state.operations, formatNumber(input), operator],
        input: initialState.input,
        shouldClear: false,
      };
}

function formatNumber(num: BigDecimal | number): string {
  let [whole, decimal = ""] = (
    num instanceof BigDecimal ? num : new BigDecimal(num)
  )
    .getValue()
    .split(".");

  decimal = decimal.replace(/0+$/, "");
  const str = [whole, decimal].join(".").replace(/\.$/, "");

  if (str.length > 14) {
    return Number(str).toExponential(9);
  }

  return str;
}

export type Button = Exclude<CalculatorAction["type"], "digit"> | number;

export type CalculatorHookState = Pick<
  CalculatorState,
  "input" | "operations"
> & {
  onButtonPress: (button: Button) => void;
};

export function useCalculator(): CalculatorHookState {
  const [{ input, operations }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  return {
    input,
    operations,
    onButtonPress: (button) => {
      if (typeof button === "number") {
        dispatch({ type: "digit", digit: button });
      } else {
        dispatch({ type: button });
      }
    },
  };
}
