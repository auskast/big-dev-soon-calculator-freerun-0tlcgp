import * as React from "react";

import clsx from "clsx";

export interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "max-w-[616px] w-full max-h-[841px] h-full rounded-3xl p-8 shadow-container bg-calc-bg-light",
        className,
      )}
      {...props}
    />
  );
};
