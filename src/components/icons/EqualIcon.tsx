import * as React from "react";

export interface EqualIconProps extends React.ComponentPropsWithoutRef<"svg"> {}

export const EqualIcon = ({
  width = 24,
  height = 24,
  ...props
}: EqualIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 9.55289H4.5V7.41003H19.5V9.55289ZM19.5 15.9815H4.5V13.8386H19.5V15.9815Z" />
    </svg>
  );
};
