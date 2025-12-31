import ForecastSkeleton from "./skeletons/ForecastSkeleton";
import type { DailyForecast } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/services/weatherIcon";

export type ForecastProps = {
  isLoading?: boolean;
  forecast: DailyForecast | null;
};

export default function Forecast({
  isLoading = false,
  forecast,
}: ForecastProps) {
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: "short" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-preset-5">Daily forecast</p>
      </div>

      {isLoading || !forecast ? (
        <ForecastSkeleton />
      ) : (
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          {forecast.daily.time.map((date, index) => (
            <div key={index} className="w-[103.66px] md:max-w-[103.66px]">
              <div className="flex flex-col items-center justify-center gap-4 px-2.5 py-4 rounded-xl bg-neutral-800 border border-neutral-600">
                <p className="text-preset-6 text-neutral-0">
                  {formatDay(date)}
                </p>

                <div>
                  <img
                    src={getWeatherIcon(forecast.daily.weather_code[index])}
                    alt={getWeatherDescription(
                      forecast.daily.weather_code[index]
                    )}
                    className="w-[60px] h-[60px]"
                  />
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="text-preset-7 text-neutral-0 text-center">
                    {Math.round(forecast.daily.temperature_2m_min[index])}°
                  </p>
                  <p className="text-preset-7 text-neutral-0 text-center">
                    {Math.round(forecast.daily.temperature_2m_max[index])}°
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
