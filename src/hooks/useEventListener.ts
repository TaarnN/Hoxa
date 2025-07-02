import { useEffect, useRef } from "react";

type EventTargetElement = Window | Document | HTMLElement | null;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: EventTargetElement,
  options?: AddEventListenerOptions
) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element || window;
    if (!target) return;

    const eventListener = (event: HTMLElementEventMap[K]) =>
      handlerRef.current(event);

    target.addEventListener(
      eventType,
      eventListener as EventListener,
      options
    );

    return () => {
      target.removeEventListener(
        eventType,
        eventListener as EventListener,
        options
      );
    };
  }, [eventType, element, options]);
}
