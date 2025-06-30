import { useState, useEffect } from "react";

export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
