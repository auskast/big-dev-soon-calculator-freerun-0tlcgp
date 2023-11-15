import * as React from "react";

export interface SubtractIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {}

export const SubtractIcon = ({
  width = 24,
  height = 24,
  ...props
}: SubtractIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.5 13V11H19.5V13H4.5Z" />
    </svg>
  );
};
