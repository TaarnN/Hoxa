// useConfettiSurprise.ts
import React from "react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export function useConfettiSurprise(trigger: boolean) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return showConfetti ? (
    React.createElement(Confetti, {
      recycle: false,
      numberOfPieces: 500,
      width: window.innerWidth,
      height: window.innerHeight
    })
  ) : null;
}
