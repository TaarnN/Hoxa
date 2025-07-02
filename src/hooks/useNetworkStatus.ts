import { useState, useEffect, useRef } from "react";

type NetworkInfo = {
  effectiveType: string;
  rtt: number;
  downlink: number;
  saveData: boolean;
  addEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
  removeEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
};

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInfo;
  mozConnection?: NetworkInfo;
  webkitConnection?: NetworkInfo;
}

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkInfo>({
    effectiveType: "",
    rtt: 0,
    downlink: 0,
    saveData: false,
  });
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const navigatorWithConnection = navigator as NavigatorWithConnection;
    const connection =
      navigatorWithConnection.connection ||
      navigatorWithConnection.mozConnection ||
      navigatorWithConnection.webkitConnection;

    if (!connection) {
      console.warn("Network Information API not supported");
      return;
    }

    const updateStatus = () => {
      if (!isMountedRef.current) return;
      
      setStatus({
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
        downlink: connection.downlink,
        saveData: connection.saveData,
      });
    };

    updateStatus();
    if (connection.addEventListener) {
      connection.addEventListener("change", updateStatus);
    }

    return () => {
      if (connection.removeEventListener) {
        connection.removeEventListener("change", updateStatus);
      }
    };
  }, []);

  return status;
}
