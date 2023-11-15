"use client";

import * as React from "react";

import type { CalculatorHookState } from "@/hooks/useCalculator";
import { useCalculator } from "@/hooks/useCalculator";

type CalculatorContextValue = CalculatorHookState;

const CalculatorContext = React.createContext<
  CalculatorContextValue | undefined
>(undefined);

const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const calculator = useCalculator();

  return (
    <CalculatorContext.Provider value={calculator}>
      {children}
    </CalculatorContext.Provider>
  );
};

function useCalculatorContext() {
  const context = React.useContext(CalculatorContext);

  if (!context)
    throw new Error(
      "`useCalculatorContext()` must be used inside a `CalculatorProvider`",
    );

  return context;
}

export { CalculatorContext, CalculatorProvider, useCalculatorContext };
