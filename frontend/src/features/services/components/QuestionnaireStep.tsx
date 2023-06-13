import { FC } from 'react';

import { breakPoints, useBreakpoint } from '@/utils';
import { Checkbox, Radio, RadioGroup } from '@/components/Form';
import { Flexer, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';

type QuestionnaireStepProps = {
  questions: any;
  activeStep: any;
  selectedValues: any;
  handleValueChange: any;
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
        <Text t="h3" fw="bold" a="c">
          {questions.map((set: any, index: number) => activeStep === index && set.text)}
        </Text>
        <Divider />
        {!questions[activeStep].slug.includes('features') ? (
          <RadioGroup
            aria-label={questions[activeStep].name}
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
