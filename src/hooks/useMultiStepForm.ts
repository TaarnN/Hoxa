import { useState, useCallback, useRef } from "react";

type StepComponent = React.FC<{
  next: (data?: any) => void;
  prev: () => void;
  data: any;
  isFirst: boolean;
  isLast: boolean;
}>;

export function useMultiStepForm(
  steps: StepComponent[],
  initialData: any = {}
) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const historyRef = useRef<any[]>([initialData]);

  const next = useCallback(
    (stepData?: any) => {
      const newData = { ...formData, ...stepData };
      setFormData(newData);
      historyRef.current = [...historyRef.current, newData];
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    },
    [formData, steps.length]
  );

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setFormData(historyRef.current[currentStep - 1]);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < historyRef.current.length) {
        setFormData(historyRef.current[index]);
      }
      setCurrentStep(Math.max(0, Math.min(index, steps.length - 1)));
    },
    [steps.length]
  );

  const reset = useCallback(() => {
    setFormData(initialData);
    historyRef.current = [initialData];
    setCurrentStep(0);
  }, [initialData]);

  const CurrentStep = steps[currentStep];

  return {
    CurrentStep,
    currentStep,
    next,
    prev,
    goToStep,
    reset,
    formData,
    isFirst: currentStep === 0,
    isLast: currentStep === steps.length - 1,
    totalSteps: steps.length,
  };
}
