import { Operator } from "@/hooks/useCalculator";

import { AddIcon } from "./AddIcon";
import { DivideIcon } from "./DivideIcon";
import { EqualIcon } from "./EqualIcon";
import { MultiplyIcon } from "./MultiplyIcon";
import { PercentIcon } from "./PercentIcon";
import { SubtractIcon } from "./SubtractIcon";

export type IconOperator = Exclude<Operator, "AC" | "C">;

export const operatorIcons: Record<
  IconOperator,
  React.ComponentType<React.ComponentPropsWithoutRef<"svg">>
> = {
  "%": PercentIcon,
  "/": DivideIcon,
  "*": MultiplyIcon,
  "-": SubtractIcon,
  "+": AddIcon,
  "=": EqualIcon,
};
