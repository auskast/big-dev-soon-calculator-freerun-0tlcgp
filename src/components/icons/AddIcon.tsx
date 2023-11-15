import * as React from "react";

export interface AddIconProps extends React.ComponentPropsWithoutRef<"svg"> {}

export const AddIcon = ({
  width = 24,
  height = 24,
  ...props
}: AddIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.9286 19.5V13.0714H4.5V10.9286H10.9286V4.5H13.0714V10.9286H19.5V13.0714H13.0714V19.5H10.9286Z" />
    </svg>
  );
};
