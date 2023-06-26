import { FC } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Base } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { CapitalizeFirst } from '@/utils';

const styles = (theme: ExtendedTheme) => ({
  step: (index: number, activeStep: number) => {
    const active = index <= activeStep;
    const current = index === activeStep;

    const color = active ? theme.light : theme.dark;
    const background = current ? theme.secondaryLight : active ? theme.primary : theme.smokeDark;
    const hoverColor = current ? theme.light : active ? theme.smoke : theme.primaryLight;
    const hoverBackground = current
      ? theme.secondaryLight
      : active
      ? theme.primaryLight
      : theme.smoke;

    return css({
      color: color,
      backgroundColor: background,
      borderRadius: '50%',
      fontWeight: 'bold',
      cursor: 'pointer',
      maxWidth: 36,
      height: 36,
      flex: 1,
      ...theme.flex.cc,
      '&:hover': {
        backgroundColor: hoverBackground,
        color: hoverColor,
      },
    });
  },
  progress: (index: number, activeStep: number) => {
    const active = index <= activeStep;
    const current = index === activeStep;

    const background = current ? theme.secondaryLight : active ? theme.primary : theme.smokeDark;

    return css({
      flex: 1,
      height: 6,
      background: background,
      boxShadow: theme.shadows[1],
    });
  },
});

interface StepperProps {
  steps: any;
  activeStep: number;
  onStepChange: (step: number) => void;
}

export const Stepper: FC<StepperProps> = ({ steps, activeStep, onStepChange }) => {
  const css = inject(styles);

  const handleStepClick = (step: number) => {
    onStepChange(step);
  };

  return (
    <Base d="flex" fd="column" a="c" p={20}>
      <Flexer j="sb" w="75%">
        {steps.map((_: any, index: number) => (
          <Flexer key={index} j="c">
            <div css={css.step(index, activeStep)} onClick={() => handleStepClick(index)}>
              {index + 1}
            </div>
          </Flexer>
        ))}
      </Flexer>
      <Flexer w="75%" mt={4} j="sb">
        {steps.map((_: any, index: number) => (
          <div key={index} css={css.progress(index, activeStep)}>
            <Text t="body1" s="1rem" mt={12} a="c">
              {CapitalizeFirst(_.slug)}
            </Text>
          </div>
        ))}
      </Flexer>
    </Base>
  );
};
