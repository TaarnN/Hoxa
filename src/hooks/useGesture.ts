import { useState, useRef, useEffect } from "react";

type GestureState = {
  isDragging: boolean;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
};

export function useGesture() {
  const [state, setState] = useState<GestureState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
  });

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      setState({
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        deltaX: 0,
        deltaY: 0,
      });

      const handleMouseMove = (e: MouseEvent) => {
        setState((prev) => ({
          ...prev,
          deltaX: e.clientX - prev.startX,
          deltaY: e.clientY - prev.startY,
        }));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setState((prev) => ({ ...prev, isDragging: false }));
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    element.addEventListener("mousedown", handleMouseDown);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return [ref, state] as const;
}
