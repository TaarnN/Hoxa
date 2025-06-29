import { useState, useCallback } from "react";

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

  const next = useCallback(
    (stepData?: any) => {
      setFormData((prev: typeof initialData) => ({ ...prev, ...stepData }));
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    },
    [steps.length]
  );

  const prev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      setCurrentStep(Math.max(0, Math.min(index, steps.length - 1)));
    },
    [steps.length]
  );

  const CurrentStep = steps[currentStep];

  return {
    CurrentStep,
    currentStep,
    next,
    prev,
    goToStep,
    formData,
    isFirst: currentStep === 0,
    isLast: currentStep === steps.length - 1,
    totalSteps: steps.length,
  };
}
