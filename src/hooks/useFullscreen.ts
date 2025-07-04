import { useState, useRef, useCallback, useEffect } from "react";

export function useFullscreen<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean,
  () => void,
  () => void
] {
  const ref = useRef<T>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(() => {
    const element = ref.current || document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      const fullscreenElement = 
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      
      setIsFullscreen(fullscreenElement === ref.current);
    };

    const events = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange"
    ];

    events.forEach(event => {
      document.addEventListener(event, handleChange);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleChange);
      });
    };
  }, []);

  return [ref, isFullscreen, enterFullscreen, exitFullscreen];
}
