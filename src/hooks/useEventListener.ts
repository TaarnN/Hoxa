import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | Document = window,
  options?: AddEventListenerOptions
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const eventListener = (event: WindowEventMap[K]) =>
      handlerRef.current(event);

    element.addEventListener(
      eventType,
      eventListener as EventListener,
      options
    );

    return () => {
      element.removeEventListener(
        eventType,
        eventListener as EventListener,
        options
      );
    };
  }, [eventType, element, options]);
}
