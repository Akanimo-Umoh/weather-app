import logo from "../assets/images/logo.svg";
import units from "../assets/images/icon-units.svg";
import dropdown from "../assets/images/icon-dropdown.svg";
import check from "../assets/images/icon-checkmark.svg";
import { useEffect, useRef, useState } from "react";

export type UnitsState = {
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "in";
};

export type NavProps = {
  onUnitsChange?: (units: UnitsState) => void;
};

export default function Nav({ onUnitsChange }: NavProps) {
  const [toggle, setToggle] = useState(false);
  // const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [unitsState, setUnitsState] = useState<UnitsState>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const isImperial =
    unitsState.temperature === "fahrenheit" &&
    unitsState.wind === "mph" &&
    unitsState.precipitation === "in";

  const unitCategories = [
    {
      name: "Temperature",
      key: "temperature" as const,
      options: [
        { value: "celsius" as const, label: "Celsius (°C)" },
        { value: "fahrenheit" as const, label: "Fahrenheit (°F)" },
      ],
    },
    {
      name: "Wind Speed",
      key: "wind" as const,
      options: [
        { value: "kmh" as const, label: "km/h" },
        { value: "mph" as const, label: "mph" },
      ],
    },
    {
      name: "Precipitation",
      key: "precipitation" as const,
      options: [
        { value: "mm" as const, label: "Millimeters (mm)" },
        { value: "in" as const, label: "Inches (in)" },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUnits = () => {
    const newUnits: UnitsState = isImperial
      ? {
          temperature: "celsius",
          wind: "kmh",
          precipitation: "mm",
        }
      : {
          temperature: "fahrenheit",
          wind: "mph",
          precipitation: "in",
        };
    setUnitsState(newUnits);

    // notify parent component of units change
    if (onUnitsChange) {
      onUnitsChange(newUnits);
    }

    // close dropdown after selection
    setToggle(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!toggle) {
      // Open dropdown with Enter or Space
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setToggle(true);
        setSelectedIndex(0);
      }
      return;
    }

    // Navigate within dropdown
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (selectedIndex === 0) {
          toggleUnits();
        }
        break;
      case "Escape":
        e.preventDefault();
        setToggle(false);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 pt-4 md:px-6 md:pt-6 xl:px-0">
      <div className="weather now">
        <img
          src={logo}
          alt=""
          className="w-[137.9px] h-7 md:w-[197px] md:h-10"
        />
      </div>

      <div ref={dropdownRef} className="relative">
        <div
          ref={triggerRef}
          onClick={() => {
            setToggle((prev) => !prev);
            if (!toggle) setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-expanded={toggle}
          aria-haspopup="true"
          className="w-fit bg-neutral-800 rounded-[6px] flex items-center justify-center gap-1.5 px-2.5 py-2 md:px-4 md:py-3 md:rounded-lg cursor-pointer focus:outline-none focus"
        >
          <img src={units} alt="units" className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="font-dm font-medium text-neutral-0 text-[14px] leading-[120%] md:text-[16px]">
            Units
          </span>
          <img
            src={dropdown}
            alt="dropdown"
            className="w-[9px] h-3.5 md:w-3 md:h-4.5"
          />
        </div>

        {/* units dropdown */}
        {toggle && (
          <div className="absolute right-0 mt-2.5 z-50">
            <div className="w-[214px] py-1.5 px-2 bg-neutral-800 border border-neutral-600 rounded-xl">
              <p
                onClick={toggleUnits}
                onMouseEnter={() => setSelectedIndex(0)}
                className={`text-preset-7 text-neutral-0 px-2 py-2.5 rounded-lg unit ${
                  selectedIndex === 0 ? "active-unit border" : ""
                }`}
              >
                {isImperial ? "Switch to Metric" : "Switch to Imperial"}
              </p>

              {unitCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-2">
                    <p className="text-preset-8 text-neutral-300 px-2 pt-1.5">
                      {category.name}
                    </p>

                    <div className="flex flex-col gap-1">
                      {category.options.map((option) => (
                        <div
                          key={option.value}
                          className={`unit ${
                            unitsState[category.key] === option.value
                              ? "active-unit"
                              : ""
                          }`}
                        >
                          <p className="text-preset-7">{option.label}</p>
                          {unitsState[category.key] === option.value && (
                            <img src={check} alt="selected" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {index < unitCategories.length - 1 && (
                    <hr className="border-neutral-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
