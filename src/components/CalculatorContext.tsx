"use client";

import * as React from "react";

export type Command = "AC" | "C" | "%";
export type Operator = "+" | "-" | "*" | "/" | "=";

type CalculatorState = {
  prevValue?: number;
  operator?: Operator;
  input: string;
};

const initialState: CalculatorState = {
  input: "0",
};

type CalculatorAction =
  | { type: Command }
  | { type: Operator }
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
      return {
        ...state,
        input: String(Number(state.input) / 100),
      };
    case "+":
    case "-":
    case "*":
    case "/":
      return {
        prevValue: Number(state.input),
        operator: action.type,
        input: initialState.input,
      };
    case "=": {
      if (!state.operator || !state.prevValue) return state;

      const inputVal = Number(state.input);

      switch (state.operator) {
        case "+":
          return {
            input: formatNumber(state.prevValue + inputVal),
          };
        case "-":
          return {
            input: formatNumber(state.prevValue - inputVal),
          };
        case "*":
          return {
            input: formatNumber(state.prevValue * inputVal),
          };
        case "/":
          return {
            input: formatNumber(state.prevValue / inputVal),
          };
      }
    }
    case ".":
      if (state.input.includes(".")) {
        return state;
      }

      return {
        ...state,
        input: state.input + ".",
      };
    case "digit":
      return {
        ...state,
        input:
          state.input === "0"
            ? String(action.digit)
            : state.input.length < 14
              ? state.input + action.digit
              : state.input,
      };
  }
}

function formatNumber(num: number): string {
  const str = String(num);
  if (str.length > 14) {
    return num.toExponential(10);
  }
  return str;
}

type Button = Exclude<CalculatorAction["type"], "digit"> | number;

type CalculatorContextValue = CalculatorState & {
  onButtonPress: (button: Button) => void;
};

const CalculatorContext = React.createContext<
  CalculatorContextValue | undefined
>(undefined);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value: CalculatorContextValue = {
    ...state,
    onButtonPress(button) {
      if (typeof button === "number") {
        dispatch({ type: "digit", digit: button });
      } else {
        dispatch({ type: button });
      }
    },
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

export function useCalculatorContext() {
  const context = React.useContext(CalculatorContext);

  if (!context)
    throw new Error(
      "`useCalculatorContext()` must be used inside a `CalculatorProvider`",
    );

  return context;
}
