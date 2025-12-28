import WeatherCardSkeleton from "./skeletons/WeatherCardSkeleton";
import sunny from "../assets/images/icon-sunny.webp";
import type { WeatherResponse } from "@/types/weather";

export type WeatherCardProps = {
  isLoading?: boolean;
  weather: WeatherResponse | null;
  location?: {
    name: string;
    country: string;
  } | null;
};

export default function WeatherCard({
  isLoading = false,
  weather,
  location,
}: WeatherCardProps) {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`max-w-[343px] h-[286px] rounded-[20px] px-6 flex flex-col items-center justify-center gap-4 md:max-w-[800px] md:flex-row md:justify-between lg:max-w-[800px] mx-auto xl:mx-0 bg-neutral-800 ${
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
                src={sunny}
                alt="weather mood"
                className="w-[120px] h-[120px]"
              />
            </div>
            <p className="text-preset-1 text-white">
              {Math.round(weather?.current.temperature_2m)}°
            </p>
          </div>
        </>
      )}
    </div>
  );
}
