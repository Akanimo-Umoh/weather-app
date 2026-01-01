import { useEffect, useRef, useState } from "react";
import search from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
import type {
  DailyForecast,
  HourlyForecast as HourlyForecastType,
  WeatherResponse,
} from "@/types/weather";
import {
  fetchDailyForecast,
  fetchHourlyForecast,
  fetchWeather,
  searchLocations,
  type Location,
} from "@/services/weatherService";
import type { UnitsState } from "./Nav";

export type SearchProps = {
  onWeatherFetch: (
    weather: WeatherResponse,
    forecast: DailyForecast,
    hourlyForecast: HourlyForecastType,
    location: {
      name: string;
      country: string;
      latitude: number;
      longitude: number;
    }
  ) => void;
  units: UnitsState;
};

export default function Search({ onWeatherFetch, units }: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<number | null>(null);
  const ignoreBlurRef = useRef(false);
  const isSelectingRef = useRef(false);
  const listboxRef = useRef<HTMLDivElement>(null);

  const listboxId = "search-listbox";

  // Reusable search function
  const performSearch = async (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setLocations([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    const results = await searchLocations(trimmedQuery);
    setLocations(results);
    setIsSearching(false);
  };

  // useEffect for debounced auto-search
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // handle empty queries
    searchTimeoutRef.current = window.setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < locations.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (locations.length > 0) {
          e.preventDefault();
          const selected = locations[selectedIndex];
          // clear pending searches before selecting
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }

          handleSelectionLocation(selected);
          // console.log("Selected:", selected);
        }

        break;
      case "Escape":
        setShowResults(false);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ignoreBlurRef.current = true;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    performSearch(searchQuery);
    // console.log("Submitted:", locations[selectedIndex]);
    // console.log("Checking when this works", locations[selectedIndex]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0);
    setShowResults(true);
  };

  const handleSelectionLocation = async (location: Location) => {
    isSelectingRef.current = true;

    // clear any pending searches
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setSearchQuery(location.name);
    setShowResults(false);

    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        fetchWeather(location.latitude, location.longitude, units),
        fetchDailyForecast(location.latitude, location.longitude, units),
        fetchHourlyForecast(location.latitude, location.longitude, units),
      ]);

      onWeatherFetch(weatherData, forecastData, hourlyData, {
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (!showResults || !listboxRef.current) return;

    const activeOption = document.getElementById(`option-${selectedIndex}`);

    activeOption?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex, showResults]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 md:flex-row md:gap-4"
    >
      <div
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowResults(true)}
        onBlur={() => {
          setTimeout(() => {
            if (!ignoreBlurRef.current) {
              setShowResults(false);
            }
            ignoreBlurRef.current = false;
          }, 200);
        }}
        className="flex items-center gap-4 px-6 py-4 rounded-xl bg-neutral-800 text-neutral-200 w-full relative"
      >
        <label aria-hidden="true" htmlFor="search" className="">
          <img src={search} alt="search" className="w-5 h-5" />
        </label>
        <input
          ref={inputRef}
          type="text"
          id="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showResults}
          aria-controls={listboxId}
          aria-activedescendant={
            showResults && locations[selectedIndex]
              ? `option-${selectedIndex}`
              : undefined
          }
          autoComplete="off"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for a place..."
          className="outline-none flex-1 text-preset-5 placeholder:text-neutral-200 text-neutral-200 bg-transparent"
        />

        {/* results container */}
        {showResults && (isSearching || locations.length > 0) && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-2 space-y-1 absolute left-0 top-[66px] w-full z-50 max-h-[200px] overflow-y-auto scrollbar"
          >
            {isSearching ? (
              <div className="py-2.5 px-2 flex items-center gap-2.5">
                <img
                  src={loadingIcon}
                  alt="searching"
                  aria-hidden="true"
                  className="animate-spin"
                />
                <p className="text-preset-7 text-neutral-0">
                  Search in progress
                </p>
              </div>
            ) : locations.length > 0 ? (
              // Results found
              locations.map((location, index) => (
                <div
                  key={index}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    if (searchTimeoutRef.current) {
                      clearTimeout(searchTimeoutRef.current);
                    }
                    handleSelectionLocation(location);
                  }}
                  className={`rounded-lg py-2.5 px-2 cursor-pointer transition-colors ${
                    selectedIndex === index
                      ? "bg-neutral-600 border border-neutral-600"
                      : "hover:bg-neutral-700 hover:border hover:border-neutral-700"
                  }`}
                >
                  <p className="text-preset-7 text-white">{location.name}</p>
                  <p className="text-preset-8 text-neutral-400">
                    {location.region && `${location.region}, `}
                    {location.country}
                  </p>
                </div>
              ))
            ) : searchQuery.trim() ? (
              // No results found
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-preset-6 text-neutral-0 font-medium">
                    No results found
                  </p>
                  <p className="text-preset-7 text-neutral-400 mt-1">
                    Try searching for a different city
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <button
        type="submit"
        onKeyDown={handleKeyDown}
        className="rounded-xl px-6 py-4 w-full bg-blue-500 text-neutral-0 text-preset-5 md:w-auto"
      >
        Search
      </button>
    </form>
  );
}
