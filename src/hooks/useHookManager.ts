// useHookManager.ts
import { useEffect } from "react";

export function useHookManager(effects: Array<() => (void | (() => void))>) {
  useEffect(() => {
    const cleanups: Array<void | (() => void)> = effects.map(effect => effect());
    
    return () => {
      cleanups.forEach(cleanup => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, []);
}
