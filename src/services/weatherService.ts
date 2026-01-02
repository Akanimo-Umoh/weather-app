import type { UnitsState } from "@/components/Nav";
import { geocodingApi, weatherApi } from "./api";
import type {
  DailyForecast,
  DailyForecastApiParams,
  GeocodingResponse,
  HourlyForecast,
  HourlyForecastApiParams,
  Location,
  WeatherApiParams,
  WeatherResponse,
} from "@/types/weather";

// search for locations by name
export const searchLocations = async (query: string): Promise<Location[]> => {
  if (query.trim().length < 2) {
    return [];
  }

  try {
    const res = await geocodingApi.get<GeocodingResponse>("/search", {
      params: { name: query },
    });

    const mappedLocations =
      res.data.results?.map((location) => ({
        name: location.name,
        region: location.admin1,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
      })) ?? [];

    return mappedLocations;
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
};

// fetch current weather for a location
export const fetchWeather = async (
  latitude: number,
  longitude: number,
  units?: UnitsState
): Promise<WeatherResponse> => {
  const params: WeatherApiParams = {
    latitude,
    longitude,
    current:
      "temperature_2m,weathercode,windspeed_10m,apparent_temperature,relative_humidity_2m,precipitation",
    timezone: "auto",
  };

  // add unit parameters based on selected units
  if (units) {
    if (units.temperature === "fahrenheit") {
      params.temperature_unit = "fahrenheit";
    }
    if (units.wind === "mph") {
      params.wind_speed_unit = "mph";
    }
    if (units.precipitation === "in") {
      params.precipitation_unit = "inch";
    }
  }

  const res = await weatherApi.get<WeatherResponse>("/forecast", { params });

  console.log(res.data);
  return res.data;
};

// default location - Berlin
export const defaultLocation = {
  name: "Berlin",
  country: "Germany",
  latitude: 52.52437,
  longitude: 13.41053,
};

// get unit symbol for temperature
export const getTemperatureUnit = (unit: "celsius" | "fahrenheit"): string => {
  return unit === "celsius" ? "°C" : "°F";
};

// get unit symbol for wind speed
export const getWindSpeedUnit = (unit: "kmh" | "mph"): string => {
  return unit === "kmh" ? "km/h" : "mph";
};

// get unit symbol for precipitation
export const getPrecipitationUnit = (unit: "mm" | "in"): string => {
  return unit === "mm" ? "mm" : "in";
};

// fetch daily forecast
export const fetchDailyForecast = async (
  latitude: number,
  longitude: number,
  units?: UnitsState
): Promise<DailyForecast> => {
  const params: DailyForecastApiParams = {
    latitude,
    longitude,
    daily: "temperature_2m_min,temperature_2m_max,weather_code",
    timezone: "auto",
  };

  // add unit parameters based on selected units
  if (units) {
    if (units.temperature === "fahrenheit") {
      params.temperature_unit = "fahrenheit";
    }
  }

  const res = await weatherApi.get<DailyForecast>("/forecast", { params });
  return res.data;
};

// fetch hourly forecast
export const fetchHourlyForecast = async (
  latitude: number,
  longitude: number,
  units?: UnitsState
): Promise<HourlyForecast> => {
  const params: HourlyForecastApiParams = {
    latitude,
    longitude,
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
    forecast_days: 7,
  };

  // add units parameters
  if (units) {
    if (units.temperature === "fahrenheit") {
      params.temperature_unit = "fahrenheit";
    }
  }

  const res = await weatherApi.get<HourlyForecast>("/forecast", { params });
  return res.data;
};
