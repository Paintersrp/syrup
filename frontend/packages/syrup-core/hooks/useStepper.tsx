import React, { useState } from 'react';

type UseStepperResult = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  handleStepChange: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
};

export const useStepper = (): UseStepperResult => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return {
    activeStep,
    setActiveStep, // unnecessary
    handleStepChange,
    handleNext,
    handleBack,
  };
};
