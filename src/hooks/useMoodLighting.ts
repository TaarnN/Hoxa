import { useState, useEffect, useMemo } from "react";

export interface MoodTheme {
  background: string;
  color: string;
  brightness: number;
}

export function useMoodLighting(mood: string, timeBased = true) {
  const [theme, setTheme] = useState<MoodTheme>({
    background: "#fff",
    color: "#000",
    brightness: 1,
  });

  const moodMap = useMemo(() => ({
    happy: { background: "#FFECB3", color: "#333", brightness: 1.2 },
    sad: { background: "#9E9E9E", color: "#E0E0E0", brightness: 0.7 },
    angry: { background: "#FFCDD2", color: "#B71C1C", brightness: 1.3 },
    calm: { background: "#B3E5FC", color: "#000", brightness: 0.9 },
    excited: { background: "#FFCC80", color: "#E65100", brightness: 1.4 },
    neutral: { background: "#E0E0E0", color: "#212121", brightness: 1.0 },
    surprised: { background: "#FFF59D", color: "#F57F17", brightness: 1.5 },
    fearful: { background: "#D1C4E9", color: "#4A148C", brightness: 0.6 },
    disgusted: { background: "#C8E6C9", color: "#1B5E20", brightness: 0.8 },
    contempt: { background: "#F5F5F5", color: "#616161", brightness: 0.9 },
    bored: { background: "#CFD8DC", color: "#263238", brightness: 0.7 },
    confused: { background: "#B39DDB", color: "#311B92", brightness: 0.8 },
    embarrassed: { background: "#F8BBD0", color: "#880E4F", brightness: 0.9 },
    proud: { background: "#BBDEFB", color: "#0D47A1", brightness: 1.1 },
    ashamed: { background: "#BCAAA4", color: "#3E2723", brightness: 0.6 },
    jealous: { background: "#A5D6A7", color: "#1B5E20", brightness: 0.9 },
    guilty: { background: "#EF9A9A", color: "#B71C1C", brightness: 0.7 },
    grateful: { background: "#C5E1A5", color: "#33691E", brightness: 1.1 },
    hopeful: { background: "#81D4FA", color: "#01579B", brightness: 1.2 },
    lonely: { background: "#B0BEC5", color: "#37474F", brightness: 0.7 },
    loved: { background: "#F48FB1", color: "#880E4F", brightness: 1.3 },
    optimistic: { background: "#FFE082", color: "#FF6F00", brightness: 1.4 },
    pessimistic: { background: "#90A4AE", color: "#263238", brightness: 0.6 },
    relaxed: { background: "#A5D6A7", color: "#1B5E20", brightness: 0.8 },
    stressed: { background: "#CE93D8", color: "#4A148C", brightness: 1.1 },
    focused: { background: "#80DEEA", color: "#006064", brightness: 1.0 },
    tired: { background: "#B0BEC5", color: "#37474F", brightness: 0.6 },
    energetic: { background: "#FFE57F", color: "#FF6D00", brightness: 1.5 },
    creative: { background: "#B39DDB", color: "#4527A0", brightness: 1.2 },
    nostalgic: { background: "#FFAB91", color: "#BF360C", brightness: 0.9 },
    romantic: { background: "#F8BBD0", color: "#AD1457", brightness: 1.0 },
    adventurous: { background: "#80D8FF", color: "#00838F", brightness: 1.3 },
    confident: { background: "#FFD54F", color: "#E65100", brightness: 1.4 },
    anxious: { background: "#D7CCC8", color: "#3E2723", brightness: 0.8 },
    playful: { background: "#FF9E80", color: "#DD2C00", brightness: 1.3 },
    serious: { background: "#90CAF9", color: "#0D47A1", brightness: 0.9 },
    curious: { background: "#B2EBF2", color: "#00838F", brightness: 1.1 },
    determined: { background: "#FFCCBC", color: "#BF360C", brightness: 1.2 },
    peaceful: { background: "#B2DFDB", color: "#004D40", brightness: 0.8 },
    melancholic: { background: "#B0BEC5", color: "#37474F", brightness: 0.7 },
    euphoric: { background: "#FFE0B2", color: "#E65100", brightness: 1.5 },
    indifferent: { background: "#EEEEEE", color: "#424242", brightness: 0.9 },
    inspired: { background: "#B2EBF2", color: "#006064", brightness: 1.2 },
    overwhelmed: { background: "#D1C4E9", color: "#4527A0", brightness: 0.7 },
    satisfied: { background: "#C8E6C9", color: "#1B5E20", brightness: 1.0 },
    disappointed: { background: "#BCAAA4", color: "#3E2723", brightness: 0.6 },
  }), []);

  useEffect(() => {
    const baseTheme = (moodMap as Record<string, { background: string; color: string; brightness: number }>)[mood] || {
      background: "#fff",
      color: "#000",
      brightness: 1,
    };

    if (timeBased) {
      const hour = new Date().getHours();
      const brightness = hour < 6 || hour > 18 ? 0.8 : 1;
      setTheme({ ...baseTheme, brightness });
    } else {
      setTheme(baseTheme);
    }
  }, [mood, timeBased, moodMap]);

  return theme;
}
