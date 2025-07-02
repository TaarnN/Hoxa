// useGalaxyBackground.ts
import { useEffect, useRef } from "react";

export function useGalaxyBackground(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const animationIdRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d")!;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    function draw() {
      if (!canvas) return;
      
      const { width, height } = canvas;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
      
      animationIdRef.current = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef]);
}
