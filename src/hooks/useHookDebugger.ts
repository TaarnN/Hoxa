// useHookDebugger.ts
import { useEffect } from "react";

export function useHookDebugger(name: string, ...deps: any[]) {
  useEffect(() => {
    console.log(`[HookDebugger] ${name} mounted with`, deps);
    return () => console.log(`[HookDebugger] ${name} unmounted`);
  }, deps);
}
