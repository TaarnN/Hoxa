import { useState } from "react";

export function useCopyToClipboard(
  timeout: number = 2000
): [boolean, (text: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API not available");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopied(false);
      return false;
    }
  };

  return [copied, copyToClipboard];
}
