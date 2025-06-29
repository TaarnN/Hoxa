import { useState, useEffect, useCallback, useRef } from "react";

export function useWebSocket<T = any>(
  url: string,
  options: {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    reconnect?: boolean;
    reconnectInterval?: number;
  } = {}
): {
  data: T | null;
  send: (data: any) => void;
  readyState: number;
  lastMessage: MessageEvent | null;
  connect: () => void;
  disconnect: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = (event) => {
      setReadyState(WebSocket.OPEN as 0);
      options.onOpen?.(event);
    };

    ws.onmessage = (event) => {
      try {
        const jsonData = JSON.parse(event.data);
        setData(jsonData);
      } catch {
        // Not JSON, use raw data
        setData(event.data as unknown as T);
      }
      setLastMessage(event);
    };

    ws.onerror = (event) => {
      options.onError?.(event);
    };

    ws.onclose = (event) => {
      setReadyState(WebSocket.CLOSED as 0);
      options.onClose?.(event);

      if (options.reconnect) {
        reconnectTimerRef.current = setTimeout(
          connect,
          options.reconnectInterval || 3000
        );
      }
    };
  }, [url, options]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    setReadyState(WebSocket.CLOSED as 0);
  }, []);

  const send = useCallback(
    (data: any) => {
      if (wsRef.current && readyState === WebSocket.OPEN as 0) {
        const message = typeof data === "string" ? data : JSON.stringify(data);
        wsRef.current.send(message);
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
