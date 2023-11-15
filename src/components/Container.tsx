import * as React from "react";

import clsx from "clsx";

export interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "min-w-[440px] w-[616px] h-[841px] rounded-3xl p-8 shadow-container",
        "bg-calc-bg-light dark:bg-calc-bg-dark",
        className,
      )}
      {...props}
    />
  );
};
