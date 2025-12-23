import sunny from "../assets/images/icon-sunny.webp";
import storm from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import cloudy from "../assets/images/icon-partly-cloudy.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import ForecastSkeleton from "./skeletons/ForecastSkeleton";

export default function Forecast({ isLoading = false }) {
  const forecast = [
    {
      day: "Tue",
      icon: rain,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: drizzle,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: sunny,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: cloudy,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: storm,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: snow,
      minTemp: "20°",
      maxTemp: "14°",
    },
    {
      day: "Tue",
      icon: fog,
      minTemp: "20°",
      maxTemp: "14°",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-preset-5">Daily forecast</p>
      </div>

      {isLoading ? (
        <ForecastSkeleton />
      ) : (
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          {forecast.map((cast, index) => (
            <div key={index} className="w-[103.66px] md:max-w-[103.66px]">
              <div className="flex flex-col items-center justify-center gap-4 px-2.5 py-4 rounded-xl bg-neutral-800 border border-neutral-600">
                <p className="text-preset-6 text-neutral-0">{cast.day}</p>

                <div>
                  <img src={cast.icon} alt="" className="w-[60px] h-[60px]" />
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="text-preset-7 text-neutral-0 text-center">
                    {cast.minTemp}
                  </p>
                  <p className="text-preset-7 text-neutral-0 text-center">
                    {cast.maxTemp}
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
