import WeatherCardSkeleton from "./skeletons/WeatherCardSkeleton";
import sunny from "../assets/images/icon-sunny.webp";
import type { WeatherResponse } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/services/weatherIcon";
import type { UnitsState } from "./Nav";
import { convertTemperature } from "@/services/weatherService";

export type WeatherCardProps = {
  isLoading?: boolean;
  weather: WeatherResponse | null;
  location?: {
    name: string;
    country: string;
  } | null;
  units: UnitsState;
};

export default function WeatherCard({
  isLoading = false,
  weather,
  location,
  units,
}: WeatherCardProps) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const weatherIcon = weather
    ? getWeatherIcon(weather.current.weathercode)
    : sunny;
  const weatherDescription = weather
    ? getWeatherDescription(weather.current.weathercode)
    : "";

  const temperature = weather
    ? convertTemperature(weather.current.temperature_2m, units.temperature)
    : 0;

  return (
    <div
      className={`w-full h-[286px] rounded-[20px] px-6 flex flex-col items-center justify-center gap-4 md:max-w-[800px] md:flex-row md:justify-between mx-auto xl:mx-0 bg-neutral-800 ${
        isLoading ? "" : "today"
      }`}
    >
      {isLoading || !weather || !location ? (
        <WeatherCardSkeleton />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-3 md:items-start">
            <p className="text-preset-4 text-neutral-0">
              {location.name}, {location.country}
            </p>
            <p className="text-preset-6 text-neutral-0 text-center opacity-[0.8]">
              {formattedDate}
            </p>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="">
              <img
                src={weatherIcon}
                alt={weatherDescription}
                className="w-[120px] h-[120px]"
              />
            </div>
            <p className="text-preset-1 text-white">
              {Math.round(temperature)}°
            </p>
          </div>
        </>
      )}
    </div>
  );
}
