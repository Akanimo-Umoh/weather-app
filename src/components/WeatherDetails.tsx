import {
  getPrecipitationUnit,
  getTemperatureUnit,
  getWindSpeedUnit,
} from "@/services/weatherService";
import type { WeatherResponse } from "@/types/weather";
import type { UnitsState } from "./Nav";

export type WeatherProps = {
  units: UnitsState;
  weather: WeatherResponse | null;
  isLoading: boolean;
};

export default function WeatherDetails({
  weather,
  units,
  isLoading = false,
}: WeatherProps) {
  const weatherDetails = [
    {
      title: "Feels Like",
      value: weather
        ? `${Math.round(
            weather.current.apparent_temperature
          )}${getTemperatureUnit(units.temperature)}`
        : "18°",
    },
    {
      title: "Humidity",
      value: weather ? `${weather.current.relative_humidity_2m}%` : "46%",
    },
    {
      title: "Wind",
      value: weather
        ? `${Math.round(weather.current.windspeed_10m)} ${getWindSpeedUnit(
            units.wind
          )}`
        : "14 km/h",
    },
    {
      title: "Precipitation",
      value: weather
        ? `${weather.current.precipitation} ${getPrecipitationUnit(
            units.precipitation
          )}`
        : "0 mm",
    },
  ];
  return (
    <div className="flex flex-wrap gap-4 justify-center md:gap-5 lg:gap-6 xl:justify-start">
      {weatherDetails.map((item) => (
        <div
          key={item.title}
          className="w-[150px] max-w-[163.5px] md:w-[165px] md:max-w-[165px] lg:w-[182px] lg:max-w-[182px]"
        >
          <div className="flex flex-col gap-6 p-5 rounded-xl bg-neutral-800 border border-neutral-600 h-full">
            <p className="text-preset-6 text-neutral-200">{item.title}</p>
            {isLoading ? (
              <p className="text-preset-3">–</p>
            ) : (
              <p className="text-preset-3 text-white">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
