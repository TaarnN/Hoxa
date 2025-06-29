// useGalaxyBackground.ts
import { useEffect } from "react";

export function useGalaxyBackground(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;
    function draw() {
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
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [canvasRef]);
}
