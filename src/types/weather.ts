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
