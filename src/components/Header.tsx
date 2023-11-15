import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="flex heading-sm font-bold items-center">
      <span className="flex-grow">Calc</span>
      <ThemeToggle />
    </header>
  );
};
