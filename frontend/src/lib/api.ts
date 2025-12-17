export interface AirQualityData {
  aqi: number;
  idx: number;
  attributions: {
    url: string;
    name: string;
  }[];
  city: {
    geo: number[];
    name: string;
    url: string;
  };
  dominentpol: string;
  iaqi: {
    co?: { v: number };
    h?: { v: number };
    no2?: { v: number };
    o3?: { v: number };
    p?: { v: number };
    pm10?: { v: number };
    pm25?: { v: number };
    so2?: { v: number };
    t?: { v: number };
    w?: { v: number };
  };
  time: {
    s: string;
    tz: string;
    v: number;
    iso: string;
  };
}

const WAQI_TOKEN = '10e36f0bc2b836a435f07ea8f3c7168b7d7d81d9';
const BASE_URL = 'https://api.waqi.info/feed';

export async function fetchAirQualityData(city: string = 'monterrey'): Promise<AirQualityData | null> {
  try {
    const response = await fetch(`${BASE_URL}/${city}/?token=${WAQI_TOKEN}`);
    const data = await response.json();

    if (data.status === 'ok') {
      return data.data;
    } else {
      console.error('Error fetching air quality data:', data.data);
      return null;
    }
  } catch (error) {
    console.error('Network error fetching air quality data:', error);
    return null;
  }
}
