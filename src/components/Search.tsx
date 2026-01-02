import { useEffect, useRef, useState } from "react";
import search from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
import type {
  DailyForecast,
  HourlyForecast as HourlyForecastType,
  WeatherResponse,
  Location,
} from "@/types/weather";
import {
  fetchDailyForecast,
  fetchHourlyForecast,
  fetchWeather,
  searchLocations,
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
  onLoadingChange: (loading: boolean) => void;
  units: UnitsState;
};

export default function Search({
  onWeatherFetch,
  onLoadingChange,
  units,
}: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const listboxId = "search-listbox";

  // search function
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) {
      if (e.key === "Enter") {
        return;
      }
      return;
    }

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
          handleSelectionLocation(selected);
          // console.log("Selected:", selected);
        }
        break;
      case "Escape":
        setShowResults(false);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if results are showing and user presses enter, select the highlighted location
    if (showResults && locations.length > 0) {
      handleSelectionLocation(locations[selectedIndex]);
      return;
    }

    // otherwise, perform a new search
    await performSearch(searchQuery);

    // keep focus on input after search
    inputRef.current?.focus();

    // console.log("Submitted:", locations[selectedIndex]);
    // console.log("Checking when this works", locations[selectedIndex]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0);

    // hide results when user input changes
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleSelectionLocation = async (location: Location) => {
    setSearchQuery(location.name);
    setShowResults(false);
    // clear results after selection
    setLocations([]);

    onLoadingChange(true);

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
      onLoadingChange(false);
    }
  };

  // scroll selected item into view when selectedIndex changes
  useEffect(() => {
    if (showResults && locations.length > 0) {
      const selectedElement = document.getElementById(
        `option-${selectedIndex}`
      );
      if (selectedElement && listboxRef.current) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, showResults, locations.length]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 md:flex-row md:gap-4"
    >
      <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-neutral-800 text-neutral-200 w-full relative">
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
          onKeyDown={handleKeyDown}
          onBlur={() => setShowResults(false)}
          placeholder="Search for a place..."
          className="outline-none flex-1 text-preset-5 placeholder:text-neutral-200 text-neutral-200 bg-transparent"
        />

        {/* results container */}
        {showResults && (isSearching || locations.length > 0) && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-2 space-y-1 absolute left-0 top-[66px] w-full z-50 max-h-[300px] flex"
          >
            <div className="w-full overflow-hidden overflow-y-auto scrollbar">
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
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectionLocation(location);
                    }}
                    className={`rounded-lg py-2.5 px-2 cursor-pointer ${
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
          </div>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl px-6 py-4 w-full bg-blue-500 text-neutral-0 text-preset-5 md:w-auto cursor-pointer hover:bg-blue-700"
      >
        {isSearching ? "Searching" : "Search"}
      </button>
    </form>
  );
}
