"use client";

import clsx from "clsx";

import { useThemeContext } from "./ThemeContext";
import { DarkModeIcon } from "./icons/DarkModeIcon";
import { LightModeIcon } from "./icons/LightModeIcon";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <span className="py-3 px-4 rounded-[32px] flex gap-8 bg-white dark:bg-calc-surface">
      <button type="button" onClick={() => setTheme("dark")}>
        <DarkModeIcon
          width={32}
          height={32}
          className={clsx(
            theme === "dark"
              ? "fill-white"
              : "fill-gray-900/36 dark:fill-white/36",
            "transition-colors",
          )}
        />
      </button>
      <button type="button" onClick={() => setTheme("light")}>
        <LightModeIcon
          width={32}
          height={32}
          className={clsx(
            theme === "light"
              ? "fill-gray-900"
              : "fill-gray-900/36 dark:fill-white/36",
            "transition-colors",
          )}
        />
      </button>
    </span>
  );
};

export { ThemeToggle };
