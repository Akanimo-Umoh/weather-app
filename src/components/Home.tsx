import Nav, { type UnitsState } from "./Nav";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import { useEffect, useState } from "react";
import type { WeatherResponse } from "@/types/weather";
import {
  convertPrecipitation,
  convertTemperature,
  convertWindSpeed,
  defaultLocation,
  fetchWeather,
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
} from "@/services/weatherService";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    country: string;
  } | null>(null);
  const [units, setUnits] = useState<UnitsState>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  // Fetch weather for default location on mount
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setIsLoading(true);
      try {
        const weatherData = await fetchWeather(
          defaultLocation.latitude,
          defaultLocation.longitude
        );

        setWeather(weatherData);
        setSelectedLocation({
          name: defaultLocation.name,
          country: defaultLocation.country,
        });
      } catch (error) {
        console.error("Error fetching default weather:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []); // Run only once on mount

  // Simulate loading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  const weatherDetails = [
    {
      title: "Feels Like",
      value: weather
        ? formatTemperature(
            convertTemperature(
              weather.current.apparent_temperature,
              units.temperature
            ),
            units.temperature
          )
        : "--",
    },
    {
      title: "Humidity",
      value: weather ? `${weather.current.relative_humidity_2m}%` : "46%",
    },
    {
      title: "Wind",
      value: weather
        ? formatWindSpeed(
            convertWindSpeed(weather.current.windspeed_10m, units.wind),
            units.wind
          )
        : "14 km/h",
    },
    {
      title: "Precipitation",
      value: weather
        ? formatPrecipitation(
            convertPrecipitation(
              weather.current.precipitation,
              units.precipitation
            ),
            units.precipitation
          )
        : "0 mm",
    },
  ];

  return (
    <div className="flex justify-center w-full min-h-svh">
      <div className="w-full max-w-[1216px] mb-12 md:mb-20">
        {/* navbar */}
        <section className="">
          <Nav onUnitsChange={setUnits} />
        </section>

        {/* hero */}
        <section className="mt-12 px-4 flex items-center justify-center lg:mt-16">
          <p className="text-preset-2 max-w-[330px] md:max-w-[482px] lg:max-w-full text-white">
            How’s the sky looking today?
          </p>
        </section>

        {/* main container */}
        <section className="mt-12 px-4 md:px-6 lg:mt-16 xl:px-0 space-y-8">
          {/* search container */}
          <div className="lg:w-[656px] mx-auto md:max-w-[800px]">
            <Search
              onWeatherFetch={(weatherData, location) => {
                setWeather(weatherData);
                setSelectedLocation(location);
                setIsLoading(false);
              }}
            />
          </div>

          {/* weather main ctn */}
          <div className="space-y-8 xl:flex xl:gap-8">
            <div className="xl:flex-1 xl:max-w-[800px]">
              <div>
                {/* country details */}
                <div className="">
                  <WeatherCard
                    isLoading={isLoading}
                    weather={weather}
                    location={selectedLocation}
                    units={units}
                  />
                </div>

                {/* weather details */}
                <div className="mt-5 flex flex-wrap gap-4 justify-center md:gap-5 lg:gap-6 lg:mt-8 xl:justify-start">
                  {weatherDetails.map((item) => (
                    <div
                      key={item.title}
                      className="w-[163.5px] md:w-[165px] lg:w-[182px]"
                    >
                      <WeatherDetails
                        title={item.title}
                        value={item.value}
                        isLoading={isLoading}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* weather forecast */}
              <div className="mt-8 lg:mt-12">
                <Forecast isLoading={isLoading} />
              </div>
            </div>

            {/* side forecast */}
            <div className="xl:w-[384px]">
              <HourlyForecast isLoading={isLoading} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
