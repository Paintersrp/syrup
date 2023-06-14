import { FC } from 'react';

import { Flexer, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { Checkbox, Radio, RadioGroup } from '@/components/Form';
import { breakPoints, useBreakpoint } from '@/utils';

import { Question } from '../../types';

type QuestionnaireStepProps = {
  questions: Question[];
  activeStep: number;
  selectedValues: { [key: string]: string };
  handleValueChange: (value: string, slug: string) => void;
};

export const QuestionnaireStep: FC<QuestionnaireStepProps> = ({
  questions,
  activeStep,
  selectedValues,
  handleValueChange,
}) => {
  const isSmallScreen = useBreakpoint(breakPoints.sm);

  return (
    <Flexer fd="column" mt={8}>
      <Surface minHeight={300} maxWidth={isSmallScreen ? 500 : 800} py={0}>
        <Text t="h3" fw="bold" a="c" mt={8}>
          {questions.map((set: any, index: number) => activeStep === index && set.text)}
        </Text>
        <Divider mt={4} mb={8} />
        {!questions[activeStep].slug.includes('features') ? (
          <RadioGroup
            aria-label={questions[activeStep].text}
            value={selectedValues[questions[activeStep].slug]}
            onChange={(value: string) => handleValueChange(value, questions[activeStep].slug)}
            mb={16}
          >
            {questions[activeStep].answer_choices.map((data: any, index: number) => (
              <Radio key={`radio-${activeStep}-${index}`} label={data.text} value={data.value} />
            ))}
          </RadioGroup>
        ) : (
          <Flexer fd="column" a="c" j="c">
            {questions[activeStep].answer_choices.map((data: any, index: number) => (
              <Checkbox
                key={`radio-${activeStep}-${index}`}
                label={data.text}
                checked={selectedValues.features.includes(data.text)}
                onChange={() => handleValueChange(data.text, questions[activeStep].slug)}
                mb={8}
              />
            ))}
          </Flexer>
        )}
      </Surface>
    </Flexer>
  );
};
