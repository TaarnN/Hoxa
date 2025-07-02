import { useState, useRef, useEffect } from "react";

export function useDrop<T>(
  onDrop: (data: T) => void
): [React.RefObject<HTMLElement | null>, boolean, boolean] {
  const [isOver, setIsOver] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const dropRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = dropRef.current;
    if (!node) return;

    const handleEnter = (e: DragEvent | TouchEvent) => {
      e.preventDefault();
      setIsOver(true);
    };

    const handleLeave = () => setIsOver(false);

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsOver(false);
      setIsDropped(true);

      try {
        const data = JSON.parse(
          e.dataTransfer?.getData("application/json") || "null"
        );
        if (data) onDrop(data);
      } catch (error) {
        console.error("Drop data parsing error:", error);
      }

      setTimeout(() => setIsDropped(false), 300);
    };

    const handleTouchDrop = (e: TouchEvent) => {
      e.preventDefault();
      setIsOver(false);
      setIsDropped(true);
      setTimeout(() => setIsDropped(false), 300);
    };

    node.addEventListener("dragover", handleEnter);
    node.addEventListener("dragleave", handleLeave);
    node.addEventListener("drop", handleDrop);
    node.addEventListener("touchmove", handleEnter);
    node.addEventListener("touchend", handleTouchDrop);
    node.addEventListener("touchcancel", handleLeave);

    return () => {
      node.removeEventListener("dragover", handleEnter);
      node.removeEventListener("dragleave", handleLeave);
      node.removeEventListener("drop", handleDrop);
      node.removeEventListener("touchmove", handleEnter);
      node.removeEventListener("touchend", handleTouchDrop);
      node.removeEventListener("touchcancel", handleLeave);
    };
  }, [onDrop]);

  return [dropRef, isOver, isDropped];
}
