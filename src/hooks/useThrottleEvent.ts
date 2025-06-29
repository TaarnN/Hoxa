import { useEffect } from "react";
import { useThrottle } from "./useThrottle";

export function useThrottleEvent<T extends (event: Event) => any>(
  eventName: string,
  callback: T,
  throttleTime: number,
  element: HTMLElement | Window | Document = window
) {
  const throttledCallback = useThrottle(callback, throttleTime);

  useEffect(() => {
    element.addEventListener(
      eventName,
      throttledCallback as unknown as EventListener
    );
    return () => {
      element.removeEventListener(
        eventName,
        throttledCallback as unknown as EventListener
      );
    };
  }, [eventName, element, throttledCallback]);
}
