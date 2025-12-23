import sunny from "../assets/images/icon-sunny.webp";
import storm from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import cloudy from "../assets/images/icon-partly-cloudy.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import overcast from "../assets/images/icon-overcast.webp";

// WMO Weather interpretation codes
export const getWeatherIcon = (weatherCode: number): string => {
  if (weatherCode === 0 || weatherCode === 1) return sunny; // Clear sky, mainly clear
  if (weatherCode === 2) return cloudy; // Partly cloudy
  if (weatherCode === 3) return overcast; // Overcast
  if (weatherCode === 45 || weatherCode === 48) return fog; // Fog
  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) return drizzle; // Drizzle
  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) return rain; // Rain
  if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77) return snow; // Snow
  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) return rain; // Rain showers
  if (weatherCode === 85 || weatherCode === 86) return snow; // Snow showers
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) return storm; // Thunderstorm
  
  return sunny; // Default
};

export const getWeatherDescription = (weatherCode: number): string => {
  const descriptions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  
  return descriptions[weatherCode] || "Unknown";
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};