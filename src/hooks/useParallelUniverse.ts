// useParallelUniverse.ts
import { useState, useCallback } from "react";

export function useParallelUniverse<T>(initial: T) {
  const [branches, setBranches] = useState<T[][]>([[initial]]);

  const fork = useCallback((branchIndex: number, newState: T) => {
    setBranches((b) => {
      const copy = [...b];
      const branch = copy[branchIndex];
      if (branch) {
        copy.push([...branch, newState]);
      }
      return copy;
    });
  }, []);

  return { branches, fork };
}
