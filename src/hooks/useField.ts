import { useState, useCallback } from "react";

export function useField<T>(
  initialValue: T,
  options: {
    validate?: (value: T) => string | null;
  } = {}
): {
  value: T;
  error: string | null;
  touched: boolean;
  onChange: (value: T) => void;
  onBlur: () => void;
  setValue: (value: T) => void;
  setTouched: (touched: boolean) => void;
} {
  const { validate } = options;
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const onChange = useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (touched && validate) {
        setError(validate(newValue));
      }
    },
    [touched, validate]
  );

  const onBlur = useCallback(() => {
    setTouched(true);
    if (validate) {
      setError(validate(value));
    }
  }, [value, validate]);

  return {
    value,
    error,
    touched,
    onChange,
    onBlur,
    setValue,
    setTouched,
  };
}
