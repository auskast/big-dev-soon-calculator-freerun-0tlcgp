"use client";

import { useCalculatorContext } from "./CalculatorContext";
import type { IconOperator } from "./icons/operatorIcons";
import { operatorIcons } from "./icons/operatorIcons";

export const Display = () => {
  const { input, operations } = useCalculatorContext();

  return (
    <div className="flex flex-col gap-2 text-right my-4">
      <div className="min-h-[55px] flex gap-1 overflow-x-auto justify-end items-center">
        {operations.map((op, key) => {
          if (/\d/.test(op)) {
            return (
              <span key={key} className="heading-sm md:heading-md">
                {op}
              </span>
            );
          }

          if (isIconOperator(op)) {
            const Icon = operatorIcons[op];

            return (
              <Icon
                key={key}
                className="fill-red-400 dark:fill-red-200 w-4 md:w-6 h-4 md:h-6"
              />
            );
          }

          return (
            <span
              key={key}
              className="text-red-400 dark:text-red-200 text-xl md:text-3xl"
            >
              {op}
            </span>
          );
        })}
      </div>
      <div className="heading-md md:heading-lg">{input}</div>
    </div>
  );
};

function isIconOperator(op: string): op is IconOperator {
  return op in operatorIcons;
}
