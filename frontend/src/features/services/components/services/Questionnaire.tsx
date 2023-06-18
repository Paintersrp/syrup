import { Dispatch, FC, SetStateAction, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Button } from '@/components/Buttons';
import { Flexer, Surface } from '@/components/Containers';
import { Text, Stepper } from '@/components/Elements';
import { useBreakpoint, useFormValidation, useStepper } from '@/hooks';
import { validateForm } from '@/lib/api';

import { handleAnswerChange, handleSkipQuiz, handleSubmitQuiz } from '../../api/useQuestionnaire';
import { QuestionnaireForm } from './QuestionnaireForm';
import { QuestionnaireStep } from './QuestionnaireStep';
import { QuizType, ServiceType } from '../../types';

type QuestionnaireProps = {
  services: ServiceType[];
  setRecommended: Dispatch<SetStateAction<ServiceType | undefined>>;
  quizData: [QuizType];
  editMode: boolean;
};

export const Questionnaire: FC<QuestionnaireProps> = ({
  services,
  setRecommended,
  quizData,
  editMode,
}) => {
  const isSmallScreen = useBreakpoint('sm');
  const { activeStep, setActiveStep, handleStepChange, handleNext, handleBack } = useStepper();

  const questions = quizData[0].question_sets[0].questions;
  const [selectedValues, setSelectedValues] = useState<any>({
    type: '',
    size: '',
    budget: '',
    features: [],
  });

  const handleSkip = () => {
    handleSkipQuiz(services, setRecommended, setActiveStep, questions);
  };

  const handleValueChange = (value: string, slug: string) => {
    handleAnswerChange(setSelectedValues, selectedValues, value, slug);
  };

  const handleSubmitResult = () => {
    handleSubmitQuiz(services, selectedValues, setRecommended, questions, values);
  };

  const initialFormData = { fullName: '', email: '', phone: '', state: '' };

  const { values, errors, setErrors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useFormValidation(initialFormData, validateForm, handleSubmitResult);

  return (
    <Surface
      maxWidth={isSmallScreen ? 375 : 500}
      className="fade-in"
      j="c"
      boxShadow={1}
      br={12}
      mt={12}
    >
      {editMode && (
        <Flexer j="fe">
          <ButtonBar adminLink="questionnaire" text="Questionnaire" />
        </Flexer>
      )}
      <Text t="h2" a="c" fw="bold">
        Service Finder
      </Text>
      <Flexer fd="column">
        <Stepper steps={questions} activeStep={activeStep} onStepChange={handleStepChange} />
        {activeStep < questions.length ? (
          <QuestionnaireStep
            questions={questions}
            activeStep={activeStep}
            selectedValues={selectedValues}
            handleValueChange={handleValueChange}
          />
        ) : (
          <QuestionnaireForm
            values={values}
            handleChange={handleChange}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        <Flexer fd="column" a="c" gap={6} mt={24}>
          <Flexer j="c" gap={8}>
            <Button
              startIcon="arrow_back_ios"
              w={80}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              w={80}
              onClick={activeStep === questions.length ? handleSubmit : handleNext}
              endIcon={activeStep === questions.length ? 'done' : 'arrow_forward_ios'}
              color={activeStep === questions.length ? 'success' : 'primary'}
            >
              {activeStep === questions.length ? 'Submit' : 'Next'}
            </Button>
          </Flexer>
          <Button w={80} onClick={handleSkip} endIcon="skip_next">
            Skip
          </Button>
        </Flexer>
      </Flexer>
    </Surface>
  );
};
