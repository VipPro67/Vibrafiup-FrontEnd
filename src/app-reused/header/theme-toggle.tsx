"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ThemeToggleButtonProps {
  onClick?: () => void;
  disableOnClick?: boolean;
}

export default function ThemeToggleButton({ onClick, disableOnClick = false }: ThemeToggleButtonProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  const defaultOnClick = useCallback(() => {
    const nextIsDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }, []);

  const handleClick = onClick || defaultOnClick;

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={disableOnClick ? undefined : (onClick || defaultOnClick)}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
