import { useEffect, useRef, useState } from "react";
import search from "../assets/images/icon-search.svg";
import loadingIcon from "../assets/images/icon-loading.svg";
import type { GeocodingResult, WeatherResponse } from "@/types/Weather";
import {
  getWeatherByCoordinates,
  searchLocations,
} from "@/services/weatherService";

interface SearchProps {
  onWeatherData?: (weather: WeatherResponse, location: GeocodingResult) => void;
}

export default function Search({ onWeatherData }: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locations, setLocations] = useState<GeocodingResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<number | null>(null);

  // fetch locations when search query changes
  useEffect(() => {
    // clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // don't search if query is too short
    if (searchQuery.trim().length < 2) {
      setLocations([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // debounce the search
    searchTimeoutRef.current = window.setTimeout(async () => {
      try {
        const results = await searchLocations(searchQuery);
        setLocations(results);
      } catch (error) {
        console.error("Search error:", error);
        setLocations([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // const cities = [
  //   { city: "City Name" },
  //   { city: "London" },
  //   { city: "City Name" },
  //   { city: "Tokyo" },
  //   { city: "Paris" },
  //   { city: "Los Angeles" },
  //   { city: "Lagos" },
  // ];

  // // filter cities based on search query
  // const filteredCitites = cities.filter((city) =>
  //   city.city.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // Reset to first item when dropdown opens
  const handleFocus = () => {
    setShowResults(true);
    setSelectedIndex(0); // Reset to first item when opening
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        e.preventDefault();
        if (locations.length > 0) {
          handleLocationSelect(locations[selectedIndex]);
        }
        break;
      case "Escape":
        setShowResults(false);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(0);

    if (!showResults) {
      setShowResults(true);
    }
  };

  const handleLocationSelect = (location: GeocodingResult) => {
    setSelectedLocation(location);
    const displayName = location.admin1
      ? `${location.name}`
      : `${location.name}`;
    setSearchQuery(displayName);
    setShowResults(false);
  };

  const handleSearch = async () => {
    if (!selectedLocation) {
      // If no location selected but there's a query, try to use the first result
      if (locations.length > 0) {
        await fetchWeather(locations[0]);
      }
      return;
    }

    await fetchWeather(selectedLocation);
  };

  const fetchWeather = async (location: GeocodingResult) => {
    try {
      setIsSearching(true);
      const weatherData = await getWeatherByCoordinates(
        location.latitude,
        location.longitude
      );

      // Pass the weather data to parent component if callback provided
      if (onWeatherData) {
        onWeatherData(weatherData, location);
      }

      console.log("Weather data:", weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-4">
      <div
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            setShowResults(false);
          }, 200);
        }}
        className="flex items-center h-14 text-neutral-200 w-full relative"
      >
        <label htmlFor="search" className="absolute left-6">
          <img src={search} alt="search" className="w-5 h-5" />
        </label>
        <input
          ref={inputRef}
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a place..."
          className="outline-none flex-1 text-preset-5 placeholder:text-neutral-200 text-neutral-200 h-full pr-6 pl-[60px] bg-neutral-800 rounded-xl focus"
        />

        {/* results container */}
        {showResults && searchQuery.trim().length >= 2 && (
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-2 space-y-1 absolute left-0 top-[66px] w-full z-50">
            {isSearching ? (
              <div className="py-2.5 px-2 flex items-center gap-2.5">
                <img
                  src={loadingIcon}
                  alt="searching"
                  className="animate-spin"
                />
                <p className="text-preset-7 text-neutral-0">
                  Search in progress
                </p>
              </div>
            ) : locations.length > 0 ? (
              // results found
              locations.map((location, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleLocationSelect(location)}
                  className={`rounded-lg py-2.5 px-2 cursor-pointer ${
                    selectedIndex === index
                      ? "bg-neutral-600 border border-neutral-600"
                      : "hover:bg-neutral-700 hover:border hover:border-neutral-700"
                  }`}
                >
                  <p className="text-preset-7 text-white">{location.name}</p>
                  <p className="text-preset-8 text-neutral-200">
                    {location.admin1 && `${location.admin1}, `}
                    {location.country}
                  </p>
                </div>
              ))
            ) : (
              // no results found
              <div className="py-2.5">
                <p className="text-preset-7 text-center text-neutral-0">
                  No search result found
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        disabled={isSearching}
        className="rounded-xl px-6 py-4 w-full bg-blue-500 text-neutral-0 text-preset-5 md:w-auto hover:bg-blue-700 cursor-pointer searchbtn outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </div>
  );
}
