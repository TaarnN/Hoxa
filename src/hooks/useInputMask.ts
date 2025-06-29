import { useState, useCallback, useEffect, useRef } from "react";

export function useInputMask(
  mask: string,
  options: {
    placeholderChar?: string;
    autofix?: boolean;
  } = {}
): {
  maskedValue: string;
  rawValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  setValue: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
} {
  const { placeholderChar = "_", autofix = true } = options;
  const [rawValue, setRawValue] = useState("");
  const [maskedValue, setMaskedValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const applyMask = useCallback(
    (value: string) => {
      let newValue = "";
      let raw = "";
      let maskIndex = 0;
      let valueIndex = 0;

      while (maskIndex < mask.length && valueIndex < value.length) {
        const maskChar = mask[maskIndex];
        const valueChar = value[valueIndex];

        if (maskChar === "#") {
          if (valueChar && /[0-9]/.test(valueChar)) {
            newValue += valueChar;
            raw += valueChar;
            maskIndex++;
            valueIndex++;
          } else if (autofix) {
            valueIndex++;
          } else {
            break;
          }
        } else if (maskChar === "A") {
          if (valueChar && /[a-zA-Z]/.test(valueChar)) {
            newValue += valueChar;
            raw += valueChar;
            maskIndex++;
            valueIndex++;
          } else if (autofix) {
            valueIndex++;
          } else {
            break;
          }
        } else if (maskChar === "a") {
          if (valueChar && /[a-z]/.test(valueChar)) {
            newValue += valueChar;
            raw += valueChar;
            maskIndex++;
            valueIndex++;
          } else if (autofix) {
            valueIndex++;
          } else {
            break;
          }
        } else if (maskChar === "*") {
          if (valueChar) {
            newValue += valueChar;
            raw += valueChar;
            maskIndex++;
            valueIndex++;
          }
        } else {
          newValue += maskChar;
          maskIndex++;
          if (valueChar === maskChar) {
            valueIndex++;
          }
        }
      }

      // Add remaining mask characters
      for (let i = maskIndex; i < mask.length; i++) {
        if (mask[i] === "#") {
          newValue += placeholderChar;
        } else {
          newValue += mask[i];
        }
      }

      return { masked: newValue, raw };
    },
    [mask, placeholderChar, autofix]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const { masked, raw } = applyMask(value);
      setMaskedValue(masked);
      setRawValue(raw);
    },
    [applyMask]
  );

  const setValue = useCallback(
    (value: string) => {
      const { masked, raw } = applyMask(value);
      setMaskedValue(masked);
      setRawValue(raw);

      if (inputRef.current) {
        inputRef.current.value = masked;
      }
    },
    [applyMask]
  );

  const handleBlur = useCallback(() => {
    // Trim placeholder characters
    const trimmed = maskedValue.replace(new RegExp(`${placeholderChar}+$`), "");
    setMaskedValue(trimmed);

    if (inputRef.current) {
      inputRef.current.value = trimmed;
    }
  }, [maskedValue, placeholderChar]);

  return {
    maskedValue,
    rawValue,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue,
    inputRef,
  };
}
