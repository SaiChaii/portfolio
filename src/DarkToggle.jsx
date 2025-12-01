import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="
        p-2 rounded-full border 
        bg-white dark:bg-neutral-800 
        border-gray-300 dark:border-neutral-600 
        shadow 
        hover:bg-gray-100 dark:hover:bg-neutral-700 
        transition
      "
    >
      {isDark ? (
        <span className="text-yellow-400 text-xl">☀️</span>
      ) : (
        <span className="text-neutral-700 dark:text-neutral-300 text-xl">
          🌙
        </span>
      )}
    </button>
  );
}
