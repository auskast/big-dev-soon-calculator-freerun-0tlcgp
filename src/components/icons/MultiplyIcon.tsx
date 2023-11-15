import * as React from "react";

export interface MultiplyIconProps
  extends React.ComponentPropsWithoutRef<"svg"> {}

export const MultiplyIcon = ({
  width = 24,
  height = 24,
  ...props
}: MultiplyIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.5 6L6 4.5L12 10.5L18 4.5L19.5 6L13.5 12L19.5 18L18 19.5L12 13.5L6 19.5L4.5 18L10.5 12L4.5 6Z" />
    </svg>
  );
};
