// useMirrorWorld.ts
import { useState, useCallback } from "react";

export function useMirrorWorld() {
  const [flipped, setFlipped] = useState<{ x: boolean; y: boolean }>({
    x: false,
    y: false,
  });

  const flipX = useCallback(() => setFlipped((f) => ({ ...f, x: !f.x })), []);
  const flipY = useCallback(() => setFlipped((f) => ({ ...f, y: !f.y })), []);

  const style = {
    transform: `scaleX(${flipped.x ? -1 : 1}) scaleY(${flipped.y ? -1 : 1})`,
  };

  return { flipped, flipX, flipY, style };
}
