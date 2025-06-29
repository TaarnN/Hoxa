// useHookManager.ts
import { useEffect } from "react";

export function useHookManager(hooks: Array<() => any>) {
  const results = hooks.map((hook) => hook());
  useEffect(() => {
    return () => {
      // optional cleanup if hooks return cleanup
      results.forEach((r) => typeof r === "function" && r());
    };
  }, []);
  return results;
}
