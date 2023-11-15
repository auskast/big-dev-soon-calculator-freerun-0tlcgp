"use client";

import { useCalculatorContext } from "./CalculatorContext";
import type { IconOperator } from "./icons/operatorIcons";
import { operatorIcons } from "./icons/operatorIcons";

export const Display = () => {
  const { input, operations } = useCalculatorContext();

  return (
    <div className="flex flex-col gap-2 text-right my-4">
      <div className="min-h-[55px] flex gap-1 overflow-x-auto justify-end">
        {operations.map((op, key) => {
          if (/\d/.test(op)) {
            return (
              <span key={key} className="heading-md">
                {op}
              </span>
            );
          }

          if (isIconOperator(op)) {
            const Icon = operatorIcons[op];

            return (
              <Icon
                key={key}
                width={24}
                height={24}
                className="fill-red-400 self-center"
              />
            );
          }

          return (
            <span key={key} className="text-red-400 text-3xl self-center">
              {op}
            </span>
          );
        })}
      </div>
      <div className="heading-lg">{input}</div>
    </div>
  );
};

function isIconOperator(op: string): op is IconOperator {
  return op in operatorIcons;
}
