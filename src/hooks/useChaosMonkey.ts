// useChaosMonkey.ts
import { useEffect, useRef } from "react";

export function useChaosMonkey(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  level = 0.1
) {
  const logs = useRef<string[]>([]);

  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const interval = setInterval(() => {
      elements.forEach((ref) => {
        if (ref.current && Math.random() < level) {
          const action = Math.random() < 0.5 ? "remove" : "error";
          logs.current.push(`${action} on ${ref.current.tagName}`);
          if (action === "remove") ref.current.remove();
          else console.error("ChaosMonkey error:", ref.current);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [refs, level]);

  return logs.current;
}
