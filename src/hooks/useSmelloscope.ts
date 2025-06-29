// useSmelloscope.ts
import { useState, useEffect } from "react";

const defaultScentMap: Record<string, string> = {
  rose: "A floral breeze of fresh roses.",
  coffee: "Rich aroma of roasted coffee beans.",
  ocean: "Salty spray of ocean waves.",
  forest: "Earthy scent of pine and moss.",
};

export function useSmelloscope(
  scent: string,
  customScentMap?: Record<string, string>
) {
  const [description, setDescription] = useState<string>("No scent selected.");

  useEffect(() => {
    const combinedMap = { ...defaultScentMap, ...(customScentMap || {}) };
    setDescription(combinedMap[scent] || `A hint of ${scent}.`);
  }, [scent, customScentMap]);

  return description;
}
