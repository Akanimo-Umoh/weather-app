import type { WeatherData } from "@/types/Weather";
import WeatherCardSkeleton from "./skeletons/WeatherCardSkeleton";
import { formatDate, getWeatherIcon } from "@/utils/weatherUtils";

interface WeatherCardProps {
  isLoading?: boolean;
  weatherData?: WeatherData;
}

export default function WeatherCard({
  isLoading = false,
  weatherData,
}: WeatherCardProps) {
  // Get current temperature and weather code
  const currentTemp =
    weatherData?.weather.current?.temperature_2m ??
    weatherData?.weather.hourly?.temperature_2m?.[0] ??
    20;
  const weatherCode =
    weatherData?.weather.current?.weather_code ??
    weatherData?.weather.hourly?.weather_code?.[0] ??
    0;
  const weatherIcon = getWeatherIcon(weatherCode);

  // Format location name
  const locationName = weatherData?.location.admin1
    ? `${weatherData.location.name}, ${weatherData.location.admin1}`
    : weatherData?.location.name || "Berlin";
  const country = weatherData?.location.country || "Germany";

  // Format date
  const currentDate =
    weatherData?.weather.current?.time ??
    weatherData?.weather.hourly?.time?.[0] ??
    new Date().toISOString();
  const formattedDate = formatDate(currentDate);

  return (
    <div
      className={`max-w-[343px] h-[286px] rounded-[20px] px-6 flex flex-col items-center justify-center gap-4 md:max-w-[800px] md:flex-row md:justify-between lg:max-w-[800px] mx-auto xl:mx-0 bg-neutral-800 ${
        isLoading ? "" : "today"
      }`}
    >
      {isLoading ? (
        <WeatherCardSkeleton />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-3 md:items-start">
            <p className="text-preset-4 text-neutral-0">
              {locationName}, {country}
            </p>
            <p className="text-preset-6 text-neutral-0 text-center opacity-[0.8]">
              {formattedDate}
            </p>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="">
              <img
                src={weatherIcon}
                alt="weather mood"
                className="w-[120px] h-[120px]"
              />
            </div>
            <p className="text-preset-1 text-white">
              {Math.round(currentTemp)}°
            </p>
          </div>
        </>
      )}
    </div>
  );
}
