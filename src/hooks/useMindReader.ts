import { useState, useEffect, useRef } from "react";

interface Prediction {
  action: string;
  confidence: number;
}

type Action = string;

export function useMindReader(windowEventTarget: Window = window) {
  const history = useRef<Action[]>([]);

  const transitionCounts = useRef<Record<Action, Record<Action, number>>>({});

  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    function recordAction(act: Action) {
      const hist = history.current;
      const prev = hist[hist.length - 1];

      hist.push(act);
      if (hist.length > 50) hist.shift();

      if (prev) {
        const trans = transitionCounts.current;
        if (!trans[prev]) trans[prev] = {};
        trans[prev][act] = (trans[prev][act] || 0) + 1;
      }

      const last = act;
      const nextMap = transitionCounts.current[last] || {};
      const total = Object.values(nextMap).reduce((a, b) => a + b, 0);
      if (total > 0) {
        const preds: Prediction[] = Object.entries(nextMap)
          .map(([action, count]) => ({
            action,
            confidence: count / total,
          }))
          .sort((a, b) => b.confidence - a.confidence);
        setPredictions(preds);
      } else {
        setPredictions([]);
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      recordAction(`key:${e.key}`);
    }

    function handleClick() {
      recordAction("click");
    }

    windowEventTarget.addEventListener("keydown", handleKeydown);
    windowEventTarget.addEventListener("click", handleClick);

    return () => {
      windowEventTarget.removeEventListener("keydown", handleKeydown);
      windowEventTarget.removeEventListener("click", handleClick);
    };
  }, [windowEventTarget]);

  return predictions;
}
