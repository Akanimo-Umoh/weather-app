import sunny from "../assets/images/icon-sunny.webp";
import storm from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import cloudy from "../assets/images/icon-partly-cloudy.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import overcast from "../assets/images/icon-overcast.webp";

// Map weather codes to icons
export const getWeatherIcon = (weatherCode: number): string => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (weatherCode === 0) return sunny; // Clear sky
  if (weatherCode === 1 || weatherCode === 2) return cloudy; // Mainly clear, partly cloudy
  if (weatherCode === 3) return overcast; // Overcast
  if (weatherCode === 45 || weatherCode === 48) return fog; // Fog
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55)
    return drizzle; // Drizzle
  if (weatherCode === 56 || weatherCode === 57) return drizzle; // Freezing drizzle
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65)
    return rain; // Rain
  if (weatherCode === 66 || weatherCode === 67) return rain; // Freezing rain
  if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75)
    return snow; // Snow fall
  if (weatherCode === 77) return snow; // Snow grains
  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82)
    return rain; // Rain showers
  if (weatherCode === 85 || weatherCode === 86) return snow; // Snow showers
  if (weatherCode === 95) return storm; // Thunderstorm
  if (weatherCode === 96 || weatherCode === 99) return storm; // Thunderstorm with hail

  return sunny; // Default fallback
};

// Get weather description
export const getWeatherDescription = (weatherCode: number): string => {
  if (weatherCode === 0) return "Clear sky";
  if (weatherCode === 1) return "Mainly clear";
  if (weatherCode === 2) return "Partly cloudy";
  if (weatherCode === 3) return "Overcast";
  if (weatherCode === 45 || weatherCode === 48) return "Foggy";
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55)
    return "Drizzle";
  if (weatherCode === 56 || weatherCode === 57) return "Freezing drizzle";
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65)
    return "Rain";
  if (weatherCode === 66 || weatherCode === 67) return "Freezing rain";
  if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75)
    return "Snow";
  if (weatherCode === 77) return "Snow grains";
  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82)
    return "Rain showers";
  if (weatherCode === 85 || weatherCode === 86) return "Snow showers";
  if (weatherCode === 95) return "Thunderstorm";
  if (weatherCode === 96 || weatherCode === 99) return "Thunderstorm with hail";

  return "Clear";
};
