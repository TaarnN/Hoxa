import { useState, useEffect } from "react";

export function useScriptState(
  src: string
): "loading" | "ready" | "error" | "idle" {
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "idle">(
    src ? "loading" : "idle"
  );

  useEffect(() => {
    if (!src) return;

    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`
    );

    // If script already exists, get its status
    if (script) {
      const dataStatus = script.getAttribute("data-status");
      if (dataStatus === "ready" || dataStatus === "error") {
        setStatus(dataStatus);
        return;
      }
    }

    // Create new script
    script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.setAttribute("data-status", "loading");
    document.head.appendChild(script);

    const setAttribute = (status: "ready" | "error") => {
      script?.setAttribute("data-status", status);
    };

    const handleLoad = () => {
      setAttribute("ready");
      setStatus("ready");
    };

    const handleError = () => {
      setAttribute("error");
      setStatus("error");
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    };
  }, [src]);

  return status;
}
