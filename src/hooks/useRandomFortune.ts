// useRandomFortune.ts
import { useState, useEffect } from "react";
import axios from "axios";

const defaultFortunes = [
  "You will find luck today.",
  "A pleasant surprise is waiting for you.",
  "Adventure is on the horizon.",
  "Good fortune will smile upon you soon.",
  "Your creativity will lead to great success.",
  "A long-awaited opportunity is coming your way.",
  "Your kindness will be returned to you tenfold.",
  "A financial windfall is in your future.",
  "Love is just around the corner.",
  "Your hard work is about to pay off.",
  "A journey will bring you happiness.",
  "Trust your instincts - they won't steer you wrong.",
  "New friendships will enrich your life.",
  "Your persistence will overcome all obstacles.",
  "Good news is on its way to you.",
  "Your talents will be recognized and rewarded.",
  "A dream you've held will soon become reality.",
  "Unexpected joy will come from an old connection.",
  "Your positive attitude will open new doors.",
  "The solution to a problem will reveal itself clearly.",
  "Someone important is thinking of you right now.",
  "Your next big idea will change everything.",
  "Patience will bring you exactly what you need.",
  "A chance encounter will lead to something wonderful.",
];

export function useRandomFortune(apiUrl?: string) {
  const [fortune, setFortune] = useState<string>("");

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchFortune() {
      try {
        if (apiUrl) {
          const res = await axios.get(apiUrl, { cancelToken: source.token });
          setFortune(res.data.fortune);
          return;
        }
        const randomFortune =
          defaultFortunes[Math.floor(Math.random() * defaultFortunes.length)];
        if (randomFortune) {
          setFortune(randomFortune);
        } else {
          setFortune(defaultFortunes[0] || "");
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          const randomFortune =
            defaultFortunes[Math.floor(Math.random() * defaultFortunes.length)];
          setFortune(randomFortune || defaultFortunes[0] || "");
        }
      }
    }

    fetchFortune();
    return () => source.cancel();
  }, [apiUrl]);

  return fortune;
}
