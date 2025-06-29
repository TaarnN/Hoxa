// useEmojiRain.ts
import { useEffect } from "react";
import { gsap } from "gsap";

export function useEmojiRain(
  containerRef: React.RefObject<HTMLElement>,
  emojis: string[] = ["🎉", "✨", "💖"],
  count = 20
) {
  useEffect(() => {
    if (!containerRef.current) return;
    const drops = Array.from({ length: count }).map(() => {
      const el = document.createElement("div");
      el.innerText = emojis[Math.floor(Math.random() * emojis.length)] ?? "";
      el.style.position = "absolute";
      el.style.top = "-50px";
      el.style.left = `${Math.random() * 100}%`;
      containerRef.current!.appendChild(el);
      return gsap.to(el, {
        y: "100vh",
        rotation: 360,
        ease: "none",
        duration: 3 + Math.random() * 2,
        onComplete: () => el.remove(),
      });
    });
    return () => drops.forEach((d) => d.kill());
  }, [containerRef, emojis, count]);
}
