// useWeatherTheme.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface WeatherTheme {
  type: "sunny" | "rainy" | "cloudy" | "snowy" | string;
  colors: { background: string; text: string; accent: string };
}

export function useWeatherTheme(apiKey: string, location: string) {
  const [theme, setTheme] = useState<WeatherTheme | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchWeather() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          { params: { q: location, appid: apiKey } }
        );
        if (!mounted) return;
        const weather = res.data.weather[0].main.toLowerCase();
        const map: Record<string, WeatherTheme> = {
          sunny: {
            type: "sunny",
            colors: { background: "#FFEB3B", text: "#333", accent: "#FFC107" },
          },
          rainy: {
            type: "rainy",
            colors: { background: "#90A4AE", text: "#fff", accent: "#607D8B" },
          },
          cloudy: {
            type: "cloudy",
            colors: { background: "#CFD8DC", text: "#333", accent: "#B0BEC5" },
          },
          snowy: {
            type: "snowy",
            colors: { background: "#ECEFF1", text: "#333", accent: "#B3E5FC" },
          },
        };
        setTheme(
          map[weather] || {
            type: weather,
            colors: { background: "#FFF", text: "#000", accent: "#888" },
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [apiKey, location]);

  return theme;
}
