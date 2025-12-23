import { weatherApi, geocodingApi } from './api';
import type { GeocodingResponse, WeatherResponse, GeocodingResult } from '../types/Weather';

export const searchLocations = async (query: string): Promise<GeocodingResult[]> => {
  try {
    const response = await geocodingApi.get<GeocodingResponse>('', {
      params: {
        name: query,
        count: 7,
        language: 'en',
        format: 'json'
      }
    });
    
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (
  latitude: number,
  longitude: number
): Promise<WeatherResponse> => {
  try {
    const response = await weatherApi.get<WeatherResponse>('', {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m,weather_code',
        current: 'temperature_2m,weather_code',
        timezone: 'auto'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

// Get default location (user's location or fallback)
export const getDefaultLocation = async (): Promise<GeocodingResult> => {
  // Try to get user's location
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Reverse geocode to get location name
          try {
            const response = await geocodingApi.get<GeocodingResponse>('', {
              params: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                count: 1,
                language: 'en',
                format: 'json'
              }
            });
            
            if (response.data.results && response.data.results.length > 0) {
              resolve(response.data.results[0]);
            } else {
              // Fallback to Berlin
              resolve(getDefaultBerlinLocation());
            }
          } catch (error) {
            resolve(getDefaultBerlinLocation());
          }
        },
        () => {
          // If geolocation fails, use Berlin as default
          resolve(getDefaultBerlinLocation());
        }
      );
    } else {
      resolve(getDefaultBerlinLocation());
    }
  });
};

const getDefaultBerlinLocation = (): GeocodingResult => {
  return {
    id: 2950159,
    name: "Berlin",
    latitude: 52.52437,
    longitude: 13.41053,
    country: "Germany",
    country_code: "DE",
    admin1: "Berlin",
    timezone: "Europe/Berlin"
  };
};