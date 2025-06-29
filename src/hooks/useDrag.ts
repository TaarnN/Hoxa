import { useState, useRef, useEffect } from "react";

export function useDrag() {
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<HTMLElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    positionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;

      const dx = e.clientX - positionRef.current.x;
      const dy = e.clientY - positionRef.current.y;

      dragRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return {
    dragRef,
    isDragging,
    handleMouseDown,
  };
}
