import { useState, useRef, useEffect } from "react";

export function useCopyToClipboard(
  timeout: number = 2000
): [boolean, (text: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API not available");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopied(false);
      return false;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return [copied, copyToClipboard];
}
