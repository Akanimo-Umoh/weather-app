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
export const DEFAULT_LOCATION = {
  name: "Berlin",
  country: "Germany",
  latitude: 52.52437,
  longitude: 13.41053,
};
