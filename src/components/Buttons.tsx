import * as React from "react";

import clsx from "clsx";

export const Buttons = () => {
  return (
    <div className="grid grid-cols-4 gap-8 p-8 -ml-8 -mr-8 -mb-8 bg-[#fafafa] rounded-3xl">
      <Button type="command">&nbsp;</Button>
      <Button type="command">&nbsp;</Button>
      <Button type="command">&nbsp;</Button>
      <Button type="operator">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="operator">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="operator">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="operator">&nbsp;</Button>
      <Button type="digit" className="col-span-2">
        &nbsp;
      </Button>
      <Button type="digit">&nbsp;</Button>
      <Button type="equal">&nbsp;</Button>
    </div>
  );
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"div"> {
  type: "command" | "operator" | "equal" | "digit";
}

const Button = ({ type, className, ...props }: ButtonProps) => {
  return (
    <div
      className={clsx(
        "leading-[72px] drop-shadow-button rounded-md heading-md inline-block text-center",
        type === "equal" ? "bg-red-400" : "bg-white",
        {
          "text-blue-400": type === "command",
          "text-red-400": type === "operator",
          "text-white": type === "equal",
        },
        className,
      )}
      {...props}
    />
  );
};
