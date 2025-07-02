// useSoundReactive.ts
import { useEffect, useRef, useState } from "react";

export function useSoundReactive() {
  const [level, setLevel] = useState(0);
  const audioCtx = useRef<AudioContext>(null);
  const analyser = useRef<AnalyserNode>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    let animationFrameId: number;
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioCtx.current = new AudioContext();
        const src = audioCtx.current.createMediaStreamSource(stream);
        analyser.current = audioCtx.current.createAnalyser();
        src.connect(analyser.current);
        const data = new Uint8Array(analyser.current.frequencyBinCount);

        function update() {
          if (!isMounted.current) return;
          analyser.current!.getByteFrequencyData(data);
          setLevel(data.reduce((a, b) => a + b, 0) / data.length);
          animationFrameId = requestAnimationFrame(update);
        }
        update();
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    }

    init();

    return () => {
      isMounted.current = false;
      cancelAnimationFrame(animationFrameId);
      audioCtx.current?.close();
    };
  }, []);

  return level;
}
