import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
const UseDarkSide = () => {
  const [colorTheme, setTheme] = useState(localStorage.theme || "dark");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    localStorage.theme = colorTheme;
    if (colorTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorTheme]);

  const toggleDarkMode = () => {
    const newTheme = colorTheme === "dark" ? "light" : "dark";
    localStorage.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleDarkMode}>
      {colorTheme === "dark" ? (
        <SunIcon className="w-6 h-6 text-yellow-500" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-900" />
      )}
    </button>
  );
};

export default UseDarkSide;
