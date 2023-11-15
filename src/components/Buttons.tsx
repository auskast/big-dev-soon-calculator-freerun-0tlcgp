"use client";

import * as React from "react";

import clsx from "clsx";

import type { Operator } from "@/hooks/useCalculator";

import { useCalculatorContext } from "./CalculatorContext";
import type { IconOperator } from "./icons/operatorIcons";
import { operatorIcons } from "./icons/operatorIcons";

export const Buttons = () => {
  const { onButtonPress } = useCalculatorContext();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        onButtonPress(Number(event.key));
      } else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "%" ||
        event.key === "."
      ) {
        onButtonPress(event.key);
      } else if (event.key === "Backspace") {
        onButtonPress("C");
      } else if (event.key === "Escape") {
        onButtonPress("AC");
      } else if (event.key === "Enter") {
        onButtonPress("=");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onButtonPress]);

  return (
    <div
      className={clsx(
        "grid grid-cols-4 gap-8 p-8 -ml-8 -mr-8 -mb-8 rounded-3xl",
        "bg-[#fafafa] dark:bg-calc-surface",
      )}
    >
      <CommandButton command="AC" label="clear all" onPress={onButtonPress} />
      <CommandButton command="C" label="clear input" onPress={onButtonPress} />
      <CommandButton command="%" label="percentage" onPress={onButtonPress} />
      <OperatorButton operator="/" label="divided by" onPress={onButtonPress} />
      <NumberButton digit={7} onPress={onButtonPress} />
      <NumberButton digit={8} onPress={onButtonPress} />
      <NumberButton digit={9} onPress={onButtonPress} />
      <OperatorButton operator="*" label="times" onPress={onButtonPress} />
      <NumberButton digit={4} onPress={onButtonPress} />
      <NumberButton digit={5} onPress={onButtonPress} />
      <NumberButton digit={6} onPress={onButtonPress} />
      <OperatorButton operator="-" label="minus" onPress={onButtonPress} />
      <NumberButton digit={1} onPress={onButtonPress} />
      <NumberButton digit={2} onPress={onButtonPress} />
      <NumberButton digit={3} onPress={onButtonPress} />
      <OperatorButton operator="+" label="plus" onPress={onButtonPress} />
      <NumberButton digit={0} onPress={onButtonPress} className="col-span-2" />
      <NumberButton digit="." onPress={onButtonPress} />
      <OperatorButton operator="=" label="equals" onPress={onButtonPress} />
    </div>
  );
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "min-w-[64px] leading-[72px] drop-shadow-button rounded-md heading-md relative",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 bottom-0 right-0 rounded-md hover:bg-gray-900/8 hover:dark:bg-white/8 transition-colors"
      />
      {children}
    </button>
  );
};

interface NumberButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  digit: number | ".";
  onPress: (num: NumberButtonProps["digit"]) => void;
}

const NumberButton = ({
  digit,
  onPress,
  className,
  ...props
}: NumberButtonProps) => (
  <>
    <Button
      className={clsx("bg-white dark:bg-calc-btn-dark", className)}
      {...props}
      onPointerDown={() => onPress(digit)}
      onKeyDown={(event) => {
        if (event.key === " ") onPress(digit);
      }}
    >
      {digit}
    </Button>
  </>
);

type OperatorOperator = Extract<Operator, "*" | "/" | "-" | "+" | "=">;

interface OperatorButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  operator: OperatorOperator;
  label: string;
  onPress: (op: OperatorOperator) => void;
}

const OperatorButton = ({
  operator,
  label,
  onPress,
  ...props
}: OperatorButtonProps) => (
  <Button
    className={clsx(
      operator === "="
        ? "bg-red-400 dark:bg-red-200 text-white fill-white"
        : "bg-white dark:bg-calc-btn-dark text-red-400: dark:text-red-200 fill-red-400 dark:fill-red-200",
    )}
    {...props}
    onPointerDown={() => onPress(operator)}
    onKeyDown={(event) => {
      if (event.key === " ") onPress(operator);
    }}
  >
    <ButtonIcon operator={operator} aria-label={label} />
  </Button>
);

type CommandOperator = Exclude<Operator, OperatorOperator>;

interface CommandButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  command: CommandOperator;
  label: string;
  onPress: (cmd: CommandOperator) => void;
}

const CommandButton = ({
  command,
  label,
  onPress,
  className,
  ...props
}: CommandButtonProps) => (
  <Button
    className={clsx(
      "bg-white dark:bg-calc-btn-dark text-blue-400 dark:text-blue-200 fill-blue-400 dark:fill-blue-200",
      className,
    )}
    {...props}
    onPointerDown={() => onPress(command)}
    onKeyDown={(event) => {
      if (event.key === " ") onPress(command);
    }}
  >
    {command === "AC" || command === "C" ? (
      command
    ) : (
      <ButtonIcon operator={command} aria-label={label} />
    )}
  </Button>
);

interface ButtonIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  operator: IconOperator;
}

const ButtonIcon = ({ operator, className, ...props }: ButtonIconProps) => {
  const Component = operatorIcons[operator];

  return (
    <Component
      width={40}
      height={40}
      className={clsx("mx-auto", className)}
      {...props}
    />
  );
};
