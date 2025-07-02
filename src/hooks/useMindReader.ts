import { useState, useEffect, useRef } from "react";

interface Prediction {
  action: string;
  confidence: number;
}

type Action = string;

export function useMindReader(windowEventTarget: Window = window) {
  const history = useRef<Action[]>([]);
  const transitionCounts = useRef<Record<string, Record<string, number>>>({});
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [version, setVersion] = useState(0);
  const listenersRef = useRef<{
    keydown: ((e: KeyboardEvent) => void) | null;
    click: (() => void) | null;
  }>({ keydown: null, click: null });

  useEffect(() => {
    function recordAction(act: Action) {
      const hist = history.current;
      const prev = hist.length > 0 ? hist[hist.length - 1] : null;

      hist.push(act);
      if (hist.length > 50) hist.shift();

      if (prev) {
        const trans = transitionCounts.current;
        if (!trans[prev]) trans[prev] = {};
        trans[prev][act] = (trans[prev][act] || 0) + 1;
      }
      setVersion((v) => v + 1);
    }

    const handleKeydown = (e: KeyboardEvent) => recordAction(`key:${e.key}`);
    const handleClick = () => recordAction("click");

    listenersRef.current = {
      keydown: handleKeydown,
      click: handleClick,
    };

    windowEventTarget.addEventListener("keydown", handleKeydown);
    windowEventTarget.addEventListener("click", handleClick);

    return () => {
      windowEventTarget.removeEventListener("keydown", handleKeydown);
      windowEventTarget.removeEventListener("click", handleClick);
    };
  }, [windowEventTarget]);

  useEffect(() => {
    const hist = history.current;
    if (hist.length === 0) return setPredictions([]);

    const lastAction = hist[hist.length - 1];
    if (!lastAction) return setPredictions([]);

    const transitions = transitionCounts.current[lastAction] || {};
    const total = Object.values(transitions).reduce(
      (sum, count) => sum + count,
      0
    );

    if (total > 0) {
      const preds = Object.entries(transitions)
        .map(([action, count]) => ({
          action,
          confidence: count / total,
        }))
        .sort((a, b) => b.confidence - a.confidence);

      setPredictions(preds);
    } else {
      setPredictions([]);
    }
  }, [version]);

  return predictions;
}
