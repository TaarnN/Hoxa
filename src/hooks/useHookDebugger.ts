// useHookDebugger.ts
import { useEffect, useRef } from "react";

export function useHookDebugger(name: string, ...deps: any[]) {
  const prevDepsRef = useRef<any[]>([]);
  
  useEffect(() => {
    const changes = deps.map((dep, i) => ({
      prev: prevDepsRef.current[i],
      current: dep,
      changed: prevDepsRef.current[i] !== dep
    }));
    
    console.log(`[HookDebugger] ${name} updated:`, changes);
    prevDepsRef.current = deps;
  }, [name, ...deps]);
}
