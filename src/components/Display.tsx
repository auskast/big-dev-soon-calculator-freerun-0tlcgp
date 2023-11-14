type Operation = "add" | "sub" | "mult" | "div";

const operations: Record<Operation, string> = {
  add: "+",
  sub: "-",
  mult: "X",
  div: "/",
};

export interface DisplayProps {
  prevValue?: number;
  operation?: "add" | "sub" | "mult" | "div";
  input?: number;
}

export const Display = ({ prevValue, operation, input = 0 }: DisplayProps) => {
  return (
    <div className="flex flex-col gap-2 text-right my-4">
      <div className="min-h-[24px]">
        <span className="heading-md">{prevValue}</span>
        {operation ? operations[operation] : null}
      </div>
      <div className="heading-lg">{input}</div>
    </div>
  );
};
