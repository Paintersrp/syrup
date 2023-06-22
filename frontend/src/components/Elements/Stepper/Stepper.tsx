import { Flexer } from '@/components/Containers';
import { Base } from '@/theme/base';
import { CapitalizeFirst } from '@/utils';
import { css, useTheme } from '@emotion/react';
import React from 'react';
import Text from '../Text/Text';

const styles = {
  step: (theme: any, index: number, activeStep: number) => {
    const active = index <= activeStep;
    const current = index === activeStep;

    const color = active ? theme.light : theme.dark;
    const background = current ? theme.secondaryLight : active ? theme.primary : theme.smokeDark;

    return css({
      color: color,
      backgroundColor: background,
      borderRadius: '50%',
      fontWeight: 'bold',
      cursor: 'pointer',
      maxWidth: 36,
      height: 36,
      flex: 1,
      ...theme.flex.CC,
      '&:hover': {
        backgroundColor: active ? theme.primaryLight : theme.smoke,
        color: active ? theme.smoke : theme.primaryLight,
      },
    });
  },
  progress: (theme: any, index: number, activeStep: number) => {
    const active = index <= activeStep;
    const current = index === activeStep;

    const background = current ? theme.secondaryLight : active ? theme.primary : theme.smokeDark;

    return css({
      flex: 1,
      height: 6,
      background: background,
      transition: 'background-color 0.3s ease',
      boxShadow: theme.shadows[1],
    });
  },
};

interface StepperProps {
  steps: any;
  activeStep: number;
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepChange }) => {
  const theme = useTheme();

  const handleStepClick = (step: number) => {
    onStepChange(step);
  };

  return (
    <Base d="flex" fd="column" a="c" p={20}>
      <Flexer j="sb" w="75%">
        {steps.map((_: any, index: number) => (
          <Flexer key={index} j="c">
            <div css={styles.step(theme, index, activeStep)} onClick={() => handleStepClick(index)}>
              {index + 1}
            </div>
          </Flexer>
        ))}
      </Flexer>
      <Flexer w="75%" mt={4} j="sb">
        {steps.map((_: any, index: number) => (
          <div key={index} css={styles.progress(theme, index, activeStep)}>
            <Text t="body1" s="1rem" mt={12} a="c">
              {CapitalizeFirst(_.slug)}
            </Text>
          </div>
        ))}
      </Flexer>
    </Base>
  );
};

export default Stepper;
