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
    <div className="grid grid-cols-4 gap-8 p-8 -ml-8 -mr-8 -mb-8 bg-[#fafafa] rounded-3xl">
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

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "leading-[72px] drop-shadow-button rounded-md heading-md",
        className,
      )}
      {...props}
    />
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
  <Button
    className={clsx("bg-white", className)}
    {...props}
    onPointerDown={() => onPress(digit)}
  >
    {digit}
  </Button>
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
        ? "bg-red-400 text-white fill-white"
        : "bg-white text-red-400 fill-red-400",
    )}
    {...props}
    onPointerDown={() => onPress(operator)}
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
    className={clsx("bg-white text-blue-400 fill-blue-400", className)}
    {...props}
    onPointerDown={() => onPress(command)}
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
