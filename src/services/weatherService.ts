import { geocodingApi, weatherApi } from "./api";
import type { GeocodingResponse, WeatherResponse } from "@/types/weather";

export type Location = {
  name: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
};

/**
 * Search for locations by name
 */
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

/**
 * Fetch current weather for a location
 */
export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherResponse> => {
  const res = await weatherApi.get<WeatherResponse>("/forecast", {
    params: {
      latitude,
      longitude,
      current:
        "temperature_2m,weathercode,windspeed_10m,apparent_temperature,relative_humidity_2m,precipitation",
      timezone: "auto",
    },
  });

  return res.data;
};

/**
 * Default location - Berlin
 */
export const defaultLocation = {
  name: "Berlin",
  country: "Germany",
  latitude: 52.52437,
  longitude: 13.41053,
};

// Convert temperature based on units
export const convertTemperature = (
  celsius: number,
  unit: "celsius" | "fahrenheit"
): number => {
  if (unit === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }
  return celsius;
};

/**
 * Convert wind speed based on units
 */
export const convertWindSpeed = (kmh: number, unit: "kmh" | "mph"): number => {
  if (unit === "mph") {
    return kmh * 0.621371;
  }
  return kmh;
};

/**
 * Convert precipitation based on units
 */
export const convertPrecipitation = (mm: number, unit: "mm" | "in"): number => {
  if (unit === "in") {
    return mm * 0.0393701;
  }
  return mm;
};

/**
 * Format temperature with unit symbol
 */
export const formatTemperature = (
  value: number,
  unit: "celsius" | "fahrenheit"
): string => {
  const symbol = unit === "celsius" ? "°C" : "°F";
  return `${Math.round(value)}${symbol}`;
};

/**
 * Format wind speed with unit
 */
export const formatWindSpeed = (value: number, unit: "kmh" | "mph"): string => {
  return `${Math.round(value)} ${unit === "kmh" ? "km/h" : "mph"}`;
};

/**
 * Format precipitation with unit
 */
export const formatPrecipitation = (
  value: number,
  unit: "mm" | "in"
): string => {
  return `${value.toFixed(1)} ${unit}`;
};
