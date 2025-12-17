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

// Fallback data for Demo
const MOCK_MONTERREY_DATA: AirQualityData = {
  aqi: 55,
  idx: 1234,
  attributions: [{ url: "https://waqi.info/", name: "World Air Quality Index Project" }],
  city: {
    geo: [25.6866, -100.3161],
    name: "Monterrey, Nuevo León (Simulated)",
    url: "https://aqicn.org/city/mexico/nuevo-leon/monterrey/"
  },
  dominentpol: "pm25",
  iaqi: {
    co: { v: 4.5 },
    h: { v: 24 },
    no2: { v: 11.2 },
    o3: { v: 22.1 },
    p: { v: 1012 },
    pm10: { v: 42 },
    pm25: { v: 55 },
    so2: { v: 3.5 },
    t: { v: 26 },
    w: { v: 3.2 }
  },
  time: {
    s: new Date().toISOString(),
    tz: "-06:00",
    v: Date.now() / 1000,
    iso: new Date().toISOString()
  }
};

export async function fetchAirQualityData(city: string = 'monterrey'): Promise<AirQualityData | null> {
  try {
    // Add timeout to fetch to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(`${BASE_URL}/${city}/?token=${WAQI_TOKEN}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (data.status === 'ok') {
      return data.data;
    } else {
      console.warn('API returned error status, using fallback:', data.data);
      return MOCK_MONTERREY_DATA;
    }
  } catch (error) {
    console.warn('Network error or timeout fetching air quality data, using fallback.', error);
    return MOCK_MONTERREY_DATA;
  }
}
