export type Location = {
  name: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
};

// Define types for API params
export type WeatherApiParams = {
  latitude: number;
  longitude: number;
  current: string;
  timezone: string;
  temperature_unit?: string;
  wind_speed_unit?: string;
  precipitation_unit?: string;
};

export type DailyForecastApiParams = {
  latitude: number;
  longitude: number;
  daily: string;
  timezone: string;
  temperature_unit?: string;
};

export type HourlyForecastApiParams = {
  latitude: number;
  longitude: number;
  hourly: string;
  timezone: string;
  temperature_unit?: string;
  forecast_days?: number;
};

export type GeocodingResponse = {
  results: {
    name: string;
    admin1?: string;
    country: string;
    latitude: number;
    longitude: number;
  }[];
};

export type WeatherResponse = {
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed_10m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
  };
};

export type DailyForecast = {
  latitude: number;
  longitude: number;
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    weather_code: number[];
  };
};

export type HourlyForecast = {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};
