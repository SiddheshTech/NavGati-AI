export const config = {
  backendPort: Number(process.env.BACKEND_PORT ?? 8080),
  databaseUrl: process.env.DATABASE_URL ?? "",
  redisUrl: process.env.REDIS_URL ?? "",
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY ?? "",
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
  newsApiKey: process.env.NEWS_API_KEY ?? "",
};

export function isExternalConnectorsConfigured(): boolean {
  return Boolean(config.openWeatherApiKey && config.googleMapsApiKey && config.newsApiKey);
}
