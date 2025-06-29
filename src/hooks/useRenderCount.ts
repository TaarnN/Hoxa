import { useEffect, useRef } from "react";

export function useRenderCount(): number {
  const count = useRef(1);

  useEffect(() => {
    count.current += 1;
  });

  return count.current;
}
