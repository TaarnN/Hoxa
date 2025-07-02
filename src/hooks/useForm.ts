import { useState, useCallback, useEffect } from "react";

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], values: T) => string | null;
};

type FormOptions<T> = {
  initialValues: T;
  validate?: ValidationRules<T>;
  onSubmit: (values: T) => void | Promise<void>;
};

export function useForm<T extends Record<string, any>>(
  options: FormOptions<T>
) {
  const { initialValues, validate, onSubmit } = options;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    {} as any
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!validate) {
      setIsValid(true);
      return;
    }

    let formIsValid = true;
    const newErrors: Record<keyof T, string | null> = { ...errors };

    for (const field in validate) {
      const error = validate[field]!(values[field], values);
      newErrors[field] = error;
      if (error) formIsValid = false;
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
  }, [values, validate]);

  const validateField = useCallback(
    (field: keyof T) => {
      if (!validate || !validate[field]) return;

      const error = validate[field]!(values[field], values);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [values, validate]
  );

  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (touched[field]) {
        validateField(field);
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      if (!touched[field]) {
        setTouched((prev) => ({
          ...prev,
          [field]: true,
        }));
      }
      validateField(field);
    },
    [touched, validateField]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const newTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      
      setTouched(newTouched);

      if (validate) {
        let formIsValid = true;
        const newErrors: Record<keyof T, string | null> = { ...errors };

        for (const field in validate) {
          const error = validate[field]!(values[field], values);
          newErrors[field] = error;
          if (error) formIsValid = false;
        }

        setErrors(newErrors);
        if (!formIsValid) return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, errors, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string | null>);
    setTouched({} as Record<keyof T, boolean>);
    setIsValid(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue: handleChange,
    setFieldTouched: handleBlur,
  };
}
