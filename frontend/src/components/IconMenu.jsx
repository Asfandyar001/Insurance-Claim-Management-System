import { useState, useEffect, useRef } from "react";

export default function IconMenu({ options, icon }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleSelect = (option) => {
    setOpen(false);
    option.onClick?.();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger (icon) */}
      <div
        className="border border-gray-300 hover:bg-gray-200 dark:border-gray-800 p-2 rounded-md dark:hover:bg-slate-900 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {icon}
      </div>

      {/* Menu */}
      {open && (
        <ul className="absolute right-0 mt-1 w-40 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg z-20 bg-white dark:bg-slate-950">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white
                ${idx === 0 ? "rounded-t-lg" : ""}
                ${idx === options.length - 1 ? "rounded-b-lg" : ""}
              `}
            >
              {option.content || option.label || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
