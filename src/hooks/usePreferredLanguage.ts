import { useState, useEffect } from "react";

export function usePreferredLanguage(): string {
  const [language, setLanguage] = useState(
    navigator.language || (navigator as any).userLanguage || ""
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(navigator.language || (navigator as any).userLanguage || "");
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  return language;
}
