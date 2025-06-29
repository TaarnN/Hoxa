import { useState, useEffect } from "react";

export function useScriptLoader(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    attributes?: Record<string, string>;
  } = {}
): "loading" | "ready" | "error" {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    src ? "loading" : "ready"
  );

  useEffect(() => {
    if (!src) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? true;

    Object.entries(options.attributes || {}).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    const handleLoad = () => setStatus("ready");
    const handleError = () => setStatus("error");

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
      document.head.removeChild(script);
    };
  }, [src, options]);

  return status;
}
