import { FC, useState } from 'react';

import { breakPoints, useBreakpoint } from '@/utils';
import { axios } from '@/lib';
import { useFormValidation, validateForm } from '@/components/Form';
import { calculateQuizScore } from '../api/calculateQuizScore';
import { Flexer, Surface } from '@/components/Containers';
import { ButtonBar } from '@/components/Built';
import { Text, useStepper } from '@/components/Elements';
import Stepper from '@/components/Elements/Stepper/Stepper';
import { Button } from '@/components/Buttons';
import { QuestionnaireForm } from './QuestionnaireForm';
import { QuestionnaireStep } from './QuestionnaireStep';

type QuestionnaireProps = {
  services: any;
  setRecommendedServices: any;
  setUnrecommendedServices: any;
  quizData: any;
  editMode: boolean;
};

export const Questionnaire: FC<QuestionnaireProps> = ({
  services,
  setRecommendedServices,
  setUnrecommendedServices,
  quizData,
  editMode,
}) => {
  const isSmallScreen = useBreakpoint(breakPoints.sm);
  const { activeStep, setActiveStep, handleStepChange, handleNext, handleBack } = useStepper();

  const questions = quizData[0].question_sets[0].questions;
  const [selectedValues, setSelectedValues] = useState<any>({
    type: '',
    size: '',
    budget: '',
    features: [],
  });

  const handleSkip = () => {
    const recommendedService = services.find(
      (service: any) => service.service_title === 'Placeholder'
    );
    const unrecommendedServices = services.filter(
      (service: any) => service.service_title !== 'Placeholder'
    );
    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);
    setActiveStep(questions.length);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleValueChange = (value: string, slug: string) => {
    setSelectedValues((prevState: any) => {
      let updatedValues;

      if (slug.includes('features')) {
        const isValueIncluded = prevState[slug].includes(value);
        updatedValues = isValueIncluded
          ? prevState[slug].filter((item: any) => item !== value)
          : [...prevState[slug], value];
      } else {
        updatedValues = value;
      }

      return {
        ...selectedValues,
        [slug]: updatedValues,
      };
    });
  };

  const handleQuizResult = () => {
    const { newScores, recommendedService, unrecommendedServices } = calculateQuizScore(
      services,
      selectedValues.budget,
      selectedValues.features
    );

    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);

    const formData: any = new FormData();
    formData.append('questionnaire', 1);
    formData.append(
      'results',
      JSON.stringify({
        [questions[0].id]: selectedValues.type,
        [questions[1].id]: selectedValues.size,
        [questions[2].id]: selectedValues.budget,
        [questions[3].id]: selectedValues.features,
      })
    );
    formData.append('contact_name', values.fullName);
    formData.append('contact_email', values.email);
    formData.append('contact_phone', values.phone);
    formData.append('contact_state', values.state);

    // axios
    //   .post(`/questionnaireresults/`, formData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const { values, errors, setErrors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useFormValidation(
      { fullName: '', email: '', phone: '', state: '' },
      validateForm,
      handleQuizResult
    );

  return (
    <Surface maxWidth={isSmallScreen ? 375 : 800} className="fade-in" j="c" boxShadow={1} br={12}>
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
