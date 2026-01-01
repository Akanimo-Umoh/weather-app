import dropdown from "../assets/images/icon-dropdown.svg";
import { useEffect, useRef, useState } from "react";
import HourlyForecastSkeleton from "./skeletons/HourlyForecastSkeleton";
import type { HourlyForecast as HourlyForecastType } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/services/weatherIcon";

export type HourlyForecastProps = {
  isLoading?: boolean;
  forecast: HourlyForecastType | null;
};

export default function HourlyForecast({
  isLoading = false,
  forecast,
}: HourlyForecastProps) {
  const [toggle, setToggle] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // get unique days from hourly data
  const days = forecast
    ? Array.from(
        new Set(
          forecast.hourly.time.map((time) => {
            const date = new Date(time);
            return date.toLocaleDateString(undefined, { weekday: "long" });
          })
        )
      ).slice(0, 7)
    : [];

  // filter hourly data for selected day
  const getHourlyDataForDay = () => {
    if (!forecast) return [];

    const selectedDayName = days[selectedDayIndex];
    const hourlyData: Array<{
      time: string;
      temperature: number;
      weathercode: number;
    }> = [];

    forecast.hourly.time.forEach((time, index) => {
      const date = new Date(time);
      const dayName = date.toLocaleDateString(undefined, { weekday: "long" });

      if (dayName === selectedDayName) {
        hourlyData.push({
          time: date
            .toLocaleTimeString(undefined, {
              hour: "numeric",
              hour12: true,
            })
            .toUpperCase(),
          temperature: forecast.hourly.temperature_2m[index],
          weathercode: forecast.hourly.weather_code[index],
        });
      }
    });

    return hourlyData;
  };

  const hourlyData = getHourlyDataForDay();

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
      setSelectedIndex(selectedDayIndex);
    }
    setToggle((prev) => !prev);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
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
        handleDaySelect(selectedIndex);
        break;
      case "Escape":
        e.preventDefault();
        setToggle(false);
        break;
    }
  };

  return (
    <div className="py-5 bg-neutral-800 rounded-[20px] w-full md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">
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
              {isLoading ? "–" : days[selectedDayIndex] || "Today"}
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
                    aria-selected={selectedDayIndex === index}
                    onClick={() => handleDaySelect(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
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
      {isLoading || !forecast ? (
        <HourlyForecastSkeleton />
      ) : (
        <div className="mt-4 space-y-4 h-[614px] overflow-y-auto px-4 md:px-6 scrollbar">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-neutral-700 border border-neutral-600 py-2.5 pl-3 pr-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center justify-center gap-2">
                <img
                  src={getWeatherIcon(hour.weathercode)}
                  alt={getWeatherDescription(hour.weathercode)}
                  className="w-10 h-10"
                />
                <p className="text-preset-5">{hour.time}</p>
              </div>

              <p className="text-preset-7">{Math.round(hour.temperature)}°</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
