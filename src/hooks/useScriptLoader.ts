import { useState, useEffect } from "react";

// Global cache for script loading states
const scriptStateCache: Record<string, "loading" | "ready" | "error"> = {};
const scriptPromiseCache: Record<string, Promise<void>> = {};

// Function to load script immediately
function loadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    attributes?: Record<string, string>;
  } = {}
): Promise<void> {
  if (scriptStateCache[src] === "ready") {
    return Promise.resolve();
  }
  if (scriptStateCache[src] === "error") {
    return Promise.reject();
  }
  if (scriptPromiseCache[src]) {
    return scriptPromiseCache[src];
  }

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? true;

    Object.entries(options.attributes || {}).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    const handleLoad = () => {
      scriptStateCache[src] = "ready";
      resolve();
    };

    const handleError = () => {
      scriptStateCache[src] = "error";
      reject();
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.head.appendChild(script);
  });

  scriptPromiseCache[src] = promise;
  return promise;
}

// Hook implementation
export function useScriptLoader(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    attributes?: Record<string, string>;
  } = {}
): "loading" | "ready" | "error" {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(() => {
    if (!src) return "ready";
    return scriptStateCache[src] || "loading";
  });

  useEffect(() => {
    if (!src) return;

    // If already loaded/errored, sync state
    if (scriptStateCache[src] === "ready" || scriptStateCache[src] === "error") {
      setStatus(scriptStateCache[src]);
      return;
    }

    let isMounted = true;
    
    loadScript(src, options)
      .then(() => isMounted && setStatus("ready"))
      .catch(() => isMounted && setStatus("error"));

    return () => {
      isMounted = false;
    };
  }, [src, options]);

  return status;
}

// Immediately start loading if called at module level
export function preloadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    attributes?: Record<string, string>;
  } = {}
): void {
  if (typeof window !== "undefined" && src) {
    loadScript(src, options);
  }
}