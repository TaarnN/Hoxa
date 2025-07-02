import { useState, useEffect, useRef } from "react";

export function useWakeLock() {
  const [isActive, setIsActive] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const request = async () => {
    if (!("wakeLock" in navigator)) {
      console.warn("Screen Wake Lock API not supported");
      return false;
    }

    try {
      wakeLockRef.current = await (navigator as any).wakeLock.request("screen");
      if (wakeLockRef.current) {
        wakeLockRef.current.addEventListener("release", () => setIsActive(false));
        setIsActive(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to acquire wake lock:", err);
      return false;
    }
  };

  const release = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch((e) => {
        console.error("Failed to release wake lock:", e);
      });
      wakeLockRef.current = null;
      setIsActive(false);
    }
  };

  useEffect(() => {
    return () => {
      release();
    };
  }, []);

  return {
    isSupported: "wakeLock" in navigator,
    isActive,
    request,
    release,
  };
}
