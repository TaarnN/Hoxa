import { useEffect } from "react";

export function useClipboardListener(
  onCopy?: (text: string) => void,
  onPaste?: (text: string) => void
) {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const text = window.getSelection()?.toString();
      if (text && onCopy) onCopy(text);
    };

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (text && onPaste) onPaste(text);
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
    };
  }, [onCopy, onPaste]);
}
