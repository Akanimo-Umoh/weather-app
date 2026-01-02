import Nav, { type UnitsState } from "./Nav";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import { useEffect, useState } from "react";
import {
  type DailyForecast,
  type HourlyForecast as HourlyForecastType,
  type WeatherResponse,
} from "@/types/weather";
import {
  defaultLocation,
  fetchDailyForecast,
  fetchHourlyForecast,
  fetchWeather,
} from "@/services/weatherService";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [hourlyForecast, setHourlyForecast] =
    useState<HourlyForecastType | null>(null);

  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
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
        const [weatherData, forecastData, hourlyData] = await Promise.all([
          fetchWeather(
            defaultLocation.latitude,
            defaultLocation.longitude,
            units
          ),
          fetchDailyForecast(
            defaultLocation.latitude,
            defaultLocation.longitude,
            units
          ),
          fetchHourlyForecast(
            defaultLocation.latitude,
            defaultLocation.longitude,
            units
          ),
        ]);

        setWeather(weatherData);
        setDailyForecast(forecastData);
        setHourlyForecast(hourlyData);
        setSelectedLocation({
          name: defaultLocation.name,
          country: defaultLocation.country,
          latitude: defaultLocation.latitude,
          longitude: defaultLocation.longitude,
        });
      } catch (error) {
        console.error("Error fetching default weather:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  // Refetch weather when units change
  useEffect(() => {
    const refetchWeatherWithNewUnits = async () => {
      if (selectedLocation) {
        setIsLoading(true);
        try {
          const [weatherData, forecastData, hourlyData] = await Promise.all([
            fetchWeather(
              selectedLocation.latitude,
              selectedLocation.longitude,
              units
            ),
            fetchDailyForecast(
              selectedLocation.latitude,
              selectedLocation.longitude,
              units
            ),
            fetchHourlyForecast(
              selectedLocation.latitude,
              selectedLocation.longitude,
              units
            ),
          ]);

          setWeather(weatherData);
          setDailyForecast(forecastData);
          setHourlyForecast(hourlyData);
        } catch (error) {
          console.error("Error fetching weather with new units:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    refetchWeatherWithNewUnits();
  }, [units]);

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
              units={units}
              onLoadingChange={setIsLoading}
              onWeatherFetch={(
                weatherData,
                forecastData,
                hourlyData,
                location
              ) => {
                setWeather(weatherData);
                setDailyForecast(forecastData);
                setHourlyForecast(hourlyData);
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
                  />
                </div>

                {/* weather details */}
                <div className="mt-5 lg:mt-8">
                  <WeatherDetails
                    weather={weather}
                    units={units}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* weather forecast */}
              <div className="mt-8 lg:mt-12">
                <Forecast isLoading={isLoading} forecast={dailyForecast} />
              </div>
            </div>

            {/* side forecast */}
            <div className="xl:w-[384px]">
              <HourlyForecast isLoading={isLoading} forecast={hourlyForecast} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
