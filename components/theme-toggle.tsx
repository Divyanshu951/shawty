"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = ({ collapseMenu }: { collapseMenu: boolean }) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(() => (theme === "dark" ? "light" : "dark"))}
      className="text-on-surface-variant hover:bg-surface-variant/50 flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 transition-colors duration-200"
    >
      {theme === "dark" ? (
        <Sun
          size={18}
          className="scale-100 rotate-0 transition-all duration-700 dark:-rotate-90"
        />
      ) : (
        <Moon
          size={18}
          className="scale-0 rotate-90 transition-all duration-700 dark:scale-100 dark:rotate-0"
        />
      )}
      {!collapseMenu && (
        <span className="font-body-sm text-body-sm">Switch Theme</span>
      )}
    </button>
  );
};

export default ThemeToggle;
