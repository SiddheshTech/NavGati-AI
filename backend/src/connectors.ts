import { config } from "./config.js";

interface Coordinate {
  lat: number;
  lon: number;
}

const cityCoords: Record<string, Coordinate> = {
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Jaipur: { lat: 26.9124, lon: 75.7873 },
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
};

function getCoord(city: string): Coordinate {
  return cityCoords[city] ?? { lat: 20.5937, lon: 78.9629 };
}

export async function fetchOpenWeatherRisk(city: string) {
  if (!config.openWeatherApiKey) {
    return { source: "WEATHER", available: false, message: "OPENWEATHER_API_KEY missing" };
  }

  const coord = getCoord(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${config.openWeatherApiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    return { source: "WEATHER", available: false, message: `OpenWeather failed: ${response.status}` };
  }
  const data = (await response.json()) as {
    weather: Array<{ main: string; description: string }>;
    wind?: { speed?: number };
    rain?: { "1h"?: number };
  };

  const rainRisk = Number(data.rain?.["1h"] ?? 0) > 3 ? 0.75 : 0.2;
  const windRisk = Number(data.wind?.speed ?? 0) > 13 ? 0.6 : 0.15;
  const severity = Math.min(1, Math.max(rainRisk, windRisk));

  return {
    source: "WEATHER",
    available: true,
    severity,
    confidence: 0.8,
    message: data.weather?.[0]?.description ?? "Weather update captured",
  };
}

export async function fetchMapsTrafficRisk(origin: string, destination: string) {
  if (!config.googleMapsApiKey) {
    return { source: "TRAFFIC", available: false, message: "GOOGLE_MAPS_API_KEY missing" };
  }

  const endpoint = "https://maps.googleapis.com/maps/api/distancematrix/json";
  const url = `${endpoint}?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&departure_time=now&traffic_model=best_guess&key=${config.googleMapsApiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { source: "TRAFFIC", available: false, message: `Google Maps failed: ${response.status}` };
  }

  const data = (await response.json()) as {
    rows?: Array<{
      elements?: Array<{
        duration?: { value: number };
        duration_in_traffic?: { value: number };
      }>;
    }>;
  };
  const element = data.rows?.[0]?.elements?.[0];
  const normal = element?.duration?.value ?? 0;
  const traffic = element?.duration_in_traffic?.value ?? normal;
  const congestionRatio = normal > 0 ? traffic / normal : 1;
  const severity = Math.min(1, Math.max(0, (congestionRatio - 1) * 0.9));

  return {
    source: "TRAFFIC",
    available: true,
    severity,
    confidence: 0.78,
    message: `Traffic ratio ${congestionRatio.toFixed(2)}x vs baseline`,
  };
}

export async function fetchNewsDisruptionRisk(query: string) {
  if (!config.newsApiKey) {
    return { source: "NEWS_NLP", available: false, message: "NEWS_API_KEY missing" };
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query,
  )}&sortBy=publishedAt&pageSize=5&apiKey=${config.newsApiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { source: "NEWS_NLP", available: false, message: `News API failed: ${response.status}` };
  }
  const data = (await response.json()) as {
    articles?: Array<{ title?: string; description?: string }>;
  };
  const text = (data.articles ?? [])
    .map((a) => `${a.title ?? ""} ${a.description ?? ""}`.toLowerCase())
    .join(" ");
  const riskTerms = ["strike", "flood", "block", "customs delay", "port congestion", "cyclone"];
  const matches = riskTerms.filter((term) => text.includes(term)).length;
  const severity = Math.min(1, matches * 0.18);

  return {
    source: "NEWS_NLP",
    available: true,
    severity,
    confidence: 0.7,
    message: `Detected ${matches} disruption keywords in latest logistics news`,
  };
}
