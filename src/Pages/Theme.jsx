import { useState, useEffect } from "react";
import { useContext } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
        <div className=" bg-blue-200">

    {/* Dark mode toggle */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-yellow-400 dark:text-black transition-colors duration-300"
        >
          {darkMode ? "☀ Switch to Light" : "🌙 Switch to Dark"}
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;
