// useChaosMonkey.ts
import { useEffect, useState } from "react";

export function useChaosMonkey(
  refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  level = 0.1
) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const elements = Array.isArray(refs) ? refs : [refs];
    const interval = setInterval(() => {
      elements.forEach((ref) => {
        if (ref.current && Math.random() < level) {
          const action = Math.random() < 0.5 ? "remove" : "error";
          const log = `${action} on ${ref.current.tagName}`;
          
          setLogs(prev => [...prev, log]);
          
          if (action === "remove") ref.current.remove();
          else console.error("ChaosMonkey error:", ref.current);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [refs, level]);

  return logs;
}
