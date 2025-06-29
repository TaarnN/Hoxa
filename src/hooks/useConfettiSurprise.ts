// useConfettiSurprise.ts
import { useCallback } from "react";
import Confetti from "react-confetti";

export function useConfettiSurprise(trigger: boolean) {
  const confetti = useCallback(() => {
    if (trigger) {
      const confetti = new (Confetti as any)({ recycle: false });
      return confetti;
    }
    return null;
  }, [trigger]);

  return confetti;
}
