import { useState, useEffect } from "react";

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const htmlElement = document.getElementById("root-html");
    if (htmlElement) {
      // Toggle 'dark' class based on `isOn`
      if (isOn) {
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", "dark"); // Save preference
      } else {
        htmlElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isOn]);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex items-center gap-2 mt-8 md:mt-0">
      <button
        type="button"
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOn ? "bg-blue-600" : "bg-gray-200"
          }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOn ? "translate-x-6" : "translate-x-1"
            }`}
        />
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {isOn ? "Dark" : "Light"}
      </span>
    </div>
  );
}