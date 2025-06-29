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

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsOver(true);
    };

    const handleDragLeave = () => {
      setIsOver(false);
    };

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

    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("dragleave", handleDragLeave);
    node.addEventListener("drop", handleDrop);

    return () => {
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("dragleave", handleDragLeave);
      node.removeEventListener("drop", handleDrop);
    };
  }, [onDrop]);

  return [dropRef, isOver, isDropped];
}
