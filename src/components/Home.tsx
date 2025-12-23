import Nav from "./Nav";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import { useEffect, useState } from "react";

import type {
  GeocodingResult,
  WeatherResponse,
  WeatherData,
} from "@/types/Weather";
import {
  getDefaultLocation,
  getWeatherByCoordinates,
} from "@/services/weatherService";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const weatherDetails = [
    {
      title: "Feels Like",
      value: "18°",
    },
    {
      title: "Humidity",
      value: "46%",
    },
    {
      title: "Wind",
      value: "14 km/h",
    },
    {
      title: "Precipitation",
      value: "0 mm",
    },
  ];

  // Load default location on mount
  useEffect(() => {
    loadDefaultWeather();
  }, []);

  const loadDefaultWeather = async () => {
    try {
      setIsLoading(true);

      // Default to Berlin
      const berlinLocation: GeocodingResult = {
        id: 2950159,
        name: "Berlin",
        latitude: 52.52437,
        longitude: 13.41053,
        country: "Germany",
        country_code: "DE",
        admin1: "Berlin",
        timezone: "Europe/Berlin",
      };

      const weather = await getWeatherByCoordinates(
        berlinLocation.latitude,
        berlinLocation.longitude
      );

      setWeatherData({ location: berlinLocation, weather });
    } catch (error) {
      console.error("Error loading default weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeatherData = (
    weather: WeatherResponse,
    location: GeocodingResult
  ) => {
    console.log("Weather for", location.name, ":", weather);
    setWeatherData({ location, weather });
  };

  return (
    <div className="flex justify-center w-full min-h-svh">
      <div className="w-full max-w-[1216px] mb-12 md:mb-20">
        {/* navbar */}
        <section className="">
          <Nav />
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
            <Search onWeatherData={handleWeatherData} />
          </div>

          {/* weather main ctn */}
          <div className="space-y-8 xl:flex xl:gap-8">
            <div className="xl:flex-1 xl:max-w-[800px]">
              <div>
                {/* country details */}
                <div className="">
                  <WeatherCard
                    isLoading={isLoading}
                    weatherData={weatherData}
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
