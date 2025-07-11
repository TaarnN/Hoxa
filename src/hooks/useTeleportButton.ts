// useTeleportButton.ts
import { useEffect } from "react";

interface TeleOptions {
  distance: number;
}

export function useTeleportButton(
  ref: React.RefObject<HTMLElement>,
  options: TeleOptions = { distance: 100 }
) {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) < options.distance) {
        ref.current.style.position = "absolute";
        ref.current.style.left = `${Math.random() * window.innerWidth}px`;
        ref.current.style.top = `${Math.random() * window.innerHeight}px`;
      }
    }

    function resetPosition() {
      if (ref.current) {
        ref.current.style.position = "";
        ref.current.style.left = "";
        ref.current.style.top = "";
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", resetPosition);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", resetPosition);
    };
  }, [ref, options]);
}
