import { useState, useCallback } from "react";

export function useUndoRedo<T>(
  initialValue: T,
  maxHistory: number = 100
): {
  current: T;
  set: (value: T) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  canUndo: boolean;
  canRedo: boolean;
} {
  const [state, setState] = useState<{
    current: T;
    history: T[];
    future: T[];
  }>({
    current: initialValue,
    history: [],
    future: [],
  });

  const set = useCallback(
    (value: T) => {
      setState((prev) => {
        const newHistory = [...prev.history, prev.current].slice(-maxHistory);
        return {
          current: value,
          history: newHistory,
          future: [], // Clear redo future when new action is performed
        };
      });
    },
    [maxHistory]
  );

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;

      const previous = prev.history[prev.history.length - 1] as T;
      const newHistory = prev.history.slice(0, -1);
      const newFuture = [prev.current, ...prev.future];

      return {
        current: previous,
        history: newHistory,
        future: newFuture,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0] as T;
      const newFuture = prev.future.slice(1);
      const newHistory = [...prev.history, prev.current];

      return {
        current: next,
        history: newHistory,
        future: newFuture,
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: [],
      future: [],
    }));
  }, []);

  return {
    current: state.current,
    set,
    undo,
    redo,
    clearHistory,
    canUndo: state.history.length > 0,
    canRedo: state.future.length > 0,
  };
}
