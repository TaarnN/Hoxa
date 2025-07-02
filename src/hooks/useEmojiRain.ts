// useEmojiRain.ts
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useEmojiRain(
  containerRef: React.RefObject<HTMLElement>,
  emojis: string[] = ["🎉", "✨", "💖"],
  count = 20
) {
  const dropsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous animations
    dropsRef.current.forEach(drop => drop.kill());
    dropsRef.current = [];
    
    // Create new animations
    const drops = Array.from({ length: count }).map(() => {
      const el = document.createElement("div");
      el.innerText = emojis[Math.floor(Math.random() * emojis.length)] ?? "";
      el.style.position = "absolute";
      el.style.top = "-50px";
      el.style.left = `${Math.random() * 100}%`;
      containerRef.current?.appendChild(el);
      
      const tween = gsap.to(el, {
        y: "100vh",
        rotation: 360,
        ease: "none",
        duration: 3 + Math.random() * 2,
        onComplete: () => el.remove(),
      });
      
      return tween;
    });
    
    dropsRef.current = drops;

    return () => {
      dropsRef.current.forEach(drop => drop.kill());
    };
  }, [containerRef, emojis, count]);
}
