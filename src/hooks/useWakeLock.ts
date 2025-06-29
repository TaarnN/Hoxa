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

  const release = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsActive(false);
      } catch (err) {
        console.error("Failed to release wake lock:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (wakeLockRef.current) {
        release();
      }
    };
  }, []);

  return {
    isSupported: "wakeLock" in navigator,
    isActive,
    request,
    release,
  };
}
