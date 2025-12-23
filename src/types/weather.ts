export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone?: string;
  population?: number;
  country?: string;
  country_id?: number;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current?: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code?: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code?: number[];
  };
}

export interface WeatherData {
  location: GeocodingResult;
  weather: WeatherResponse;
}