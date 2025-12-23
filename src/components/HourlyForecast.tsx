import dropdown from "../assets/images/icon-dropdown.svg";
import sunny from "../assets/images/icon-sunny.webp";
import storm from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import cloudy from "../assets/images/icon-partly-cloudy.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import overcast from "../assets/images/icon-overcast.webp";
import { useEffect, useRef, useState } from "react";
import HourlyForecastSkeleton from "./skeletons/HourlyForecastSkeleton";

export default function HourlyForecast({ isLoading = false }) {
  const [toggle, setToggle] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hourlyCasts = [
    {
      icon: overcast,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: cloudy,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: sunny,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: overcast,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: snow,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: fog,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: snow,
      time: "3 PM",
      degree: "20°",
    },
    {
      icon: overcast,
      time: "3 PM",
      degree: "20°",
    },
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected index when dropdown opens
  const handleToggle = () => {
    if (!toggle) {
      const currentIndex = days.indexOf(selectedDay);
      setSelectedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
    setToggle((prev) => !prev);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setToggle(false);
  };

  // Keyboard navigation for dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!toggle) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < days.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        handleDaySelect(days[selectedIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setToggle(false);
        break;
    }
  };

  return (
    <div className="py-5 px-4 bg-neutral-800 rounded-[20px] md:p-6 w-full">
      <div className="flex items-center justify-between">
        <p className="text-preset-5 text-neutral-0">Hourly forecast</p>

        <div ref={dropdownRef} className="relative">
          <div
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={toggle}
            className="bg-neutral-600 rounded-lg py-2 px-4 flex items-center justify-center gap-3 cursor-pointer"
          >
            <p className="font-dm font-medium text-neutral-0">
              {isLoading ? "–" : selectedDay}
            </p>
            <img src={dropdown} alt="dropdown" className="w-3 h-4.5" />
          </div>

          {toggle && (
            <div className="absolute right-0 mt-2.5">
              <div
                role="listbox"
                className="w-[214px] rounded-xl p-2 space-y-1 bg-neutral-800 border border-neutral-600"
              >
                {days.map((day, index) => (
                  <div
                    key={index}
                    role="option"
                    aria-selected={selectedDay === day}
                    onClick={() => handleDaySelect(day)}
                    className={`py-2.5 px-2 rounded-lg hover:bg-neutral-700 cursor-pointer ${
                      selectedIndex === index
                        ? "active-day"
                        : "hover:bg-neutral-700"
                    }
                    `}
                  >
                    <p className="text-preset-7 text-neutral-0">{day}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* hourly ctn */}
      {isLoading ? (
        <HourlyForecastSkeleton />
      ) : (
        <div className="mt-4 space-y-4">
          {hourlyCasts.map((cast, index) => (
            <div
              key={index}
              className="bg-neutral-700 border border-neutral-600 py-2.5 pl-3 pr-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center justify-center gap-2">
                <img src={cast.icon} alt="" className="w-10 h-10" />
                <p className="text-preset-5">{cast.time}</p>
              </div>

              <p className="text-preset-7">{cast.degree}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
