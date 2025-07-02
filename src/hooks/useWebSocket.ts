import { useState, useEffect, useRef, useCallback } from "react";

export function useWebSocket<T = any>(
  url: string,
  options: {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    reconnect?: boolean;
    reconnectInterval?: number;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) return;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = (e) => {
      setReadyState(WebSocket.OPEN);
      options.onOpen?.(e);
    };
    ws.onmessage = (e) => {
      try {
        setData(JSON.parse(e.data));
      } catch {
        setData(e.data as unknown as T);
      }
      setLastMessage(e);
    };
    ws.onerror = options.onError || null;
    ws.onclose = (e) => {
      setReadyState(WebSocket.CLOSED);
      options.onClose?.(e);
      if (options.reconnect) {
        reconnectTimerRef.current = window.setTimeout(
          connect,
          options.reconnectInterval || 3000
        );
      }
    };
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (wsRef.current) wsRef.current.close();
    wsRef.current = null;
    if (reconnectTimerRef.current !== null) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    setReadyState(WebSocket.CLOSED);
  }, []);

  const send = useCallback(
    (payload: any) => {
      if (wsRef.current && readyState === WebSocket.OPEN) {
        const msg =
          typeof payload === "string" ? payload : JSON.stringify(payload);
        wsRef.current.send(msg);
      }
    },
    [readyState]
  );

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    data,
    send,
    readyState,
    lastMessage,
    connect,
    disconnect,
  };
}
