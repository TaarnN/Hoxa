// useRandomFortune.ts
import { useState, useEffect } from "react";
import axios from "axios";

const defaultFortunes = [
  "You will find luck today.",
  "A pleasant surprise is waiting for you.",
  "Adventure is on the horizon.",
];

export function useRandomFortune(apiUrl?: string) {
  const [fortune, setFortune] = useState<string>("");

  useEffect(() => {
    async function fetchFortune() {
      if (apiUrl) {
        try {
          const res = await axios.get(apiUrl);
          setFortune(res.data.fortune);
          return;
        } catch {
          /* fallback */
        }
      }
      const randomFortune =
        defaultFortunes[Math.floor(Math.random() * defaultFortunes.length)];
      if (randomFortune) {
        setFortune(randomFortune);
      } else {
        setFortune(defaultFortunes[0] || "");
      }
    }
    fetchFortune();
  }, [apiUrl]);

  return fortune;
}
