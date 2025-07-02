import { useState, useEffect } from "react";

export function useScrollbarWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode?.removeChild(outer);
    setWidth(scrollbarWidth);
  }, []);

  return width;
}
