import { useState, useEffect } from "react";

export function usePreferredLanguage(): string {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const getLanguage = () => 
      navigator.language || (navigator as any).userLanguage || "";

    setLanguage(getLanguage());

    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  return language;
}
