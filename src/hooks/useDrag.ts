import { useState, useRef, useEffect } from "react";

export function useDrag() {
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<HTMLElement | null>(null);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches?.[0]?.clientX ?? 0 : e.clientX ?? 0;
    const clientY = "touches" in e ? e.touches?.[0]?.clientY ?? 0 : e.clientY ?? 0;

    positionRef.current = { x: clientX, y: clientY };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;

      const clientX = "touches" in e ? e.touches?.[0]?.clientX ?? 0 : e.clientX ?? 0;
      const clientY = "touches" in e ? e.touches?.[0]?.clientY ?? 0 : e.clientY ?? 0;

      const dx = clientX - positionRef.current.x;
      const dy = clientY - positionRef.current.y;

      const originalTransform = dragRef.current.style.transform || "";
      dragRef.current.style.transform = `${originalTransform} translate(${dx}px, ${dy}px)`;
    };

    const handleEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return {
    dragRef,
    isDragging,
    handleMouseDown: handleStart,
    handleTouchStart: handleStart,
  };
}
