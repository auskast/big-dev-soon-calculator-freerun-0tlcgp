"use client";

import * as React from "react";

import clsx from "clsx";

import type { Command, Operator } from "./CalculatorContext";
import { useCalculatorContext } from "./CalculatorContext";

export const Buttons = () => {
  const { onButtonPress } = useCalculatorContext();

  return (
    <div className="grid grid-cols-4 gap-8 p-8 -ml-8 -mr-8 -mb-8 bg-[#fafafa] rounded-3xl">
      <CommandButton command="AC" onPress={onButtonPress} />
      <CommandButton command="C" onPress={onButtonPress} />
      <CommandButton command="%" onPress={onButtonPress} />
      <OperatorButton operator="/" onPress={onButtonPress} />
      <NumberButton digit={7} onPress={onButtonPress} />
      <NumberButton digit={8} onPress={onButtonPress} />
      <NumberButton digit={9} onPress={onButtonPress} />
      <OperatorButton operator="*" onPress={onButtonPress} />
      <NumberButton digit={4} onPress={onButtonPress} />
      <NumberButton digit={5} onPress={onButtonPress} />
      <NumberButton digit={6} onPress={onButtonPress} />
      <OperatorButton operator="-" onPress={onButtonPress} />
      <NumberButton digit={1} onPress={onButtonPress} />
      <NumberButton digit={2} onPress={onButtonPress} />
      <NumberButton digit={3} onPress={onButtonPress} />
      <OperatorButton operator="+" onPress={onButtonPress} />
      <NumberButton digit={0} onPress={onButtonPress} className="col-span-2" />
      <NumberButton digit="." onPress={onButtonPress} />
      <OperatorButton operator="=" onPress={onButtonPress} />
    </div>
  );
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  buttonType: "command" | "operator" | "equal" | "digit";
}

const Button = ({ buttonType, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "leading-[72px] drop-shadow-button rounded-md heading-md inline-block text-center",
        buttonType === "equal" ? "bg-red-400" : "bg-white",
        {
          "text-blue-400": buttonType === "command",
          "text-red-400": buttonType === "operator",
          "text-white": buttonType === "equal",
        },
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

const NumberButton = ({ digit, onPress, ...props }: NumberButtonProps) => (
  <Button buttonType="digit" {...props} onPointerDown={() => onPress(digit)}>
    {digit}
  </Button>
);

interface OperatorButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  operator: Operator;
  onPress: (op: Operator) => void;
}

const OperatorButton = ({
  operator,
  onPress,
  ...props
}: OperatorButtonProps) => (
  <Button
    buttonType={operator === "=" ? "equal" : "operator"}
    {...props}
    onPointerDown={() => onPress(operator)}
  >
    {operator}
  </Button>
);

interface CommandButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  command: Command;
  onPress: (cmd: Command) => void;
}

const CommandButton = ({ command, onPress, ...props }: CommandButtonProps) => (
  <Button
    buttonType="command"
    {...props}
    onPointerDown={() => onPress(command)}
  >
    {command}
  </Button>
);
