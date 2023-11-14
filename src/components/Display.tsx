"use client";

import { useCalculatorContext } from "./CalculatorContext";

export interface DisplayProps {}

export const Display = () => {
  const { input, operator, prevValue } = useCalculatorContext();

  return (
    <div className="flex flex-col gap-2 text-right my-4">
      <div className="min-h-[24px]">
        <span className="heading-md">{prevValue}</span>
        {operator}
      </div>
      <div className="heading-lg">{input}</div>
    </div>
  );
};
