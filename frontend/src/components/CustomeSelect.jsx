import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({ options, onChange, icon, width = "w-48" }) {
    const [selected, setSelected] = useState(options[0]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
        onChange?.(option);
    };

    // Close on outside click
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
        <div ref={ref} className={`relative ${width}`}>
            {/* Selected */}
            <div
                className="flex items-center px-3 py-2.5 border border-gray-300 dark:border-gray-800 text-sm rounded-md cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2 flex-1">
                    {icon}
                    <span className="text-gray-900 dark:text-white">{selected}</span>
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </div>

            {/* Options */}
            {open && (
                <ul
                    className={`absolute mt-1 w-full border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg z-10 text-sm`}
                >
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(option)}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white
                                ${option === selected ? "bg-gray-200 dark:bg-gray-800" : ""}
                                ${idx === 0 ? "rounded-t-lg" : ""}
                                ${idx === options.length - 1 ? "rounded-b-lg" : ""}
                                `}
                        >
                            {option}
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}
