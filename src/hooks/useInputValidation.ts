import { useState, useCallback, useRef, useEffect } from "react";

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean;
};

export function useInputValidation(
  initialValue: string = "",
  rules: ValidationRules = {}
) {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const valueRef = useRef(value);
  
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const validate = useCallback(() => {
    const currentValue = valueRef.current;
    const newErrors: string[] = [];

    if (rules.required && !currentValue.trim()) {
      newErrors.push("Field is required");
    }

    if (rules.minLength && currentValue.length < rules.minLength) {
      newErrors.push(`Minimum length is ${rules.minLength}`);
    }

    if (rules.maxLength && currentValue.length > rules.maxLength) {
      newErrors.push(`Maximum length is ${rules.maxLength}`);
    }

    if (rules.pattern && !rules.pattern.test(currentValue)) {
      newErrors.push("Invalid format");
    }

    if (rules.validate && !rules.validate(currentValue)) {
      newErrors.push("Custom validation failed");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [rules]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (dirty) validate();
    },
    [dirty, validate]
  );

  const onBlur = useCallback(() => {
    setDirty(true);
    validate();
  }, [validate]);

  return {
    value,
    setValue,
    onChange,
    onBlur,
    errors,
    isValid: errors.length === 0,
    dirty,
    validate,
    reset: () => {
      setValue(initialValue);
      setErrors([]);
      setDirty(false);
    },
  };
}
