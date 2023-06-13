import { Flexer } from '@/components/Containers';
import { CapitalizeFirst } from '@/utils';
import React from 'react';
import Text from '../Text/Text';
import './Stepper.css';

interface StepperProps {
  steps: any;
  activeStep: number;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepChange }) => {
  const handleStepClick = (step: number) => {
    onStepChange(step);
  };

  return (
    <div className="stepper-container">
      <div className="stepper-steps">
        {steps.map((_: any, index: number) => (
          <Flexer j="c">
            <div
              key={index}
              className={`stepper-step ${index <= activeStep ? 'active' : ''}  ${
                index === activeStep ? 'current' : ''
              }`}
              onClick={() => handleStepClick(index)}
            >
              {index + 1}
            </div>
          </Flexer>
        ))}
      </div>
      <div className="stepper-progress">
        {steps.map((_: any, index: number) => (
          <div
            key={index}
            className={`stepper-progress-step ${index <= activeStep ? 'active' : ''} ${
              index === activeStep ? 'current' : ''
            }`}
          >
            <Text t="body1" s="1rem" mt={12} a="c">
              {CapitalizeFirst(_.slug)}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
